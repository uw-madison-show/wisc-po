#!/bin/sh
rm -rf ../dist
grunt build
cp -R dist ../
