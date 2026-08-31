#!/bin/sh
# usage: mk.sh <out.html> <title> <description> <body-file>
set -eu
out=$1; title=$2; desc=$3; body=$4
{
  sed -e "s|{{TITLE}}|$title|g" -e "s|{{DESC}}|$desc|g" _partials/head.html
  cat "$body"
  cat _partials/foot.html
} > "$out"
echo "built $out ($(wc -c < "$out" | tr -d ' ') bytes)"
