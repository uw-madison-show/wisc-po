#!/bin/sh
rm -rf ../dist
grunt build
cp -R dist ../
cp -R app/scripts/highcharts-modules/ ../dist/scripts/
