#!/bin/bash

git submodule update --init --recursive

cd q
git checkout b55e199a34e58eceb9fcbddb7edd6f1e58768301
git submodule update --init --recursive

cd ../

emcmake cmake .
emmake make