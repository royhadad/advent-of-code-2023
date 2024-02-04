#!/bin/bash

mkdir days/day"$1" 
echo "$2" > days/day"$1"/input.txt
cat scripts/template.ts > days/day"$1"/part1.ts
cat scripts/template.ts > days/day"$1"/part2.ts

# npm run create-folder-for-day 1 "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25"
