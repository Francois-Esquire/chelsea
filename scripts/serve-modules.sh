#!/bin/bash

source scripts/module-scripts.sh

function serve_modules {
	# TODO: symlink instead of move
	TIMEFORMAT='moved static into one-app in %R seconds'
	time {
		link_to_one_app_static
	}
}

serve_modules