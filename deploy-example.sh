#!/bin/bash

cd dist
shopt -s extglob
cp -r !(manifest.webapp) /home/beapen/Documents/Temp
shopt -u extglob