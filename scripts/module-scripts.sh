# project paths
static_dir_path=static
modules_dir_path=$static_dir_path/modules
module_map_path=$static_dir_path/module-map.json
one_app_static_path=packages/one-app/static/
# module project paths
module_bundle_integrity_path=bundle.integrity.manifest.json
module_build_base_path=build
# module configuration
public_path="[one-app-dev-cdn-url]/static/modules"
module_map_key="70alks1+fgh1a32gh43iashga35325jhsg9678jhg9m"

# constants
declare -a bundle_types=( "node" "browser" "legacyBrowser" )

function set_public_path {
	public_path=$1
}

function set_module_map_key {
	module_map_key=$1
}

function move_to_one_app_static {
	rm -rf $one_app_static_path
	mv $static_dir_path $one_app_static_path
}

function link_to_one_app_static {
	ln -s $static_dir_path $one_app_static_path
}

function extract_module_bundle_sha {
	bundle_pattern="\"${2}\".*\""
	local sha=$(grep -E -o ${bundle_pattern} ${1}/${module_bundle_integrity_path} | grep -E -o '"(sha.*[^\\])"$')
	echo "$sha"
}

function extract_module_version {
	local version=$(grep "version" ${1}/package.json | sed "s~version~~" | sed "s~[ \",:]~~g")
	echo "$version"
}

function format_module_map {
	module_map=$(node -pe 'JSON.stringify(JSON.parse(process.argv[1]), null, "\t")' "$(cat $module_map_path)")
	echo $module_map > $module_map_path
}

function build_static_modules {
	# clean the build target
	rm -rf $static_dir_path
	mkdir $static_dir_path
	mkdir $modules_dir_path

	modules=""
	for dir in modules/*/
	do
		# remove last slash
		dir=${dir%*/}
		# extract module name
		module_name=${dir##*/}
		# pull the version from package.json
		version="$(extract_module_version $dir)"

		if [ ! -d $dir/$module_build_base_path/$version/ ]
		then
			if [ ! -d $dir/node_modules/ ]
			then
				npm install --prefix $dir
			else
				npm run build --prefix $dir
			fi
		fi

		module_build_path=$dir/$module_build_base_path/$version/
		module_target_path=$modules_dir_path/$module_name/
		module_public_path=$public_path/$module_name

		# copy over the build output to statics
		cp -R $module_build_path $module_target_path

		modules+="\"$module_name\": {"
		for bundle_type in "${bundle_types[@]}"
		do
			url="$module_public_path/$module_name.$bundle_type.js"
			integrity="$(extract_module_bundle_sha $dir $bundle_type)"
			terminator="},"

			if [ $bundle_type = "legacyBrowser" ]
			then
				url="$module_public_path/$module_name.legacy.browser.js"
				# for valid JSON, we set legacy terminator as the final object to be written per module
				terminator="}"
			fi

			modules+="\"$bundle_type\": {"
			modules+="\"url\": \"$url\","
			modules+="\"integrity\": $integrity"
			modules+=$terminator
		done
		modules+="},"
	done
	# remove last comma
	modules=${modules%?}

	echo "{ \"clientCacheRevision\": \"$module_map_key\", \"modules\": { $modules } }" > $module_map_path
}