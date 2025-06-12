#!/bin/bash
cd frontend
npm install
npm run build
cd ..
mkdir -p static templates
cp -r frontend/build/static/* static/
cp frontend/build/index.html templates/
