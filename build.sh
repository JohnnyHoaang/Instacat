#!/bin/bash
# For building and installing dependencies
# Script by: Kelsey Pereira Costa

# Installs dependencies
npm install
cd server && npm install
cd ..
cd client && npm install
cd ..

# Builds react project
npm run build --prefix client