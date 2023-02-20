#!/bin/bash
# For building and installing dependencies
# Script by: Kelsey Pereira Costa

# Installs dependencies
npm install
npm install server
npm install client && CI=false npm run build

# Builds react project
npm run build --prefix client