#!/bin/bash

source scripts/module-scripts.sh

function serve_modules {
	TIMEFORMAT='moved static into one-app in %R seconds'
	time {
		move_to_one_app_static
	}
}

serve_modules