#!/bin/bash
# For building and installing dependencies
# Script by: Kelsey Pereira Costa

# Installs dependencies
npm install
cd server && npm install
cd ..
cd client && npm install
cd ..

# doesnt treate warnings as errors
CI=false

# Builds react project
export REACT_APP_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
npm run build --prefix client