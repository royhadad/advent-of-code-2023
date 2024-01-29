#!/bin/bash

mkdir days/day"$1" 
echo "$2" > days/day"$1"/input.txt
cat scripts/template.ts > days/day"$1"/part1.ts
cat scripts/template.ts > days/day"$1"/part2.ts

# replace the start script in package.json so it runs the first part of the new day
package_json_content=$(cat package.json)
cat "$package_json_content" | jq --arg new_start_script "ts-node days/day$1/part1.ts" '.scripts.start = $new_start_script' > package.json.temp && mv package.json.temp package.json
