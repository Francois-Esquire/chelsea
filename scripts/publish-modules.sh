#!/bin/bash

source scripts/module-scripts.sh

function deploy_modules {
	set_public_path $MODULES_ENDPOINT

	TIMEFORMAT='completed static modules build in %R seconds'
	time {
		build_static_modules
	}

	TIMEFORMAT='published static modules to cdn in %R seconds'
	time {
		node scripts/upload-spaces.js
	}
}

deploy_modules