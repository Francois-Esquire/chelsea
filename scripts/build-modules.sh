#!/bin/bash

source scripts/module-scripts.sh

function build_modules {
	TIMEFORMAT='completed static modules build in %R seconds'
	time {
		build_static_modules
		# TODO: costs double the time (+50-60ms) to format at two modules (without install or build)...
		# consider other approach without using node, maybe inline formatting
		format_module_map
	}
}

build_modules