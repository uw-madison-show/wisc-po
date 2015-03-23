#!/bin/sh
rm -rf ../dist
grunt build
cp -R dist ../
scp -r ../dist/* test-show@wwwtest.show.wisc.edu:/httpdocs/data/
scp -r ../doc/* test-show@wwwtest.show.wisc.edu:/httpdocs/data/doc/
