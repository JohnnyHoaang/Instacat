#!/bin/bash
# For building and installing dependencies
# Script by: Kelsey Pereira Costa

# Installs dependencies
npm install server
npm install client

# Builds react project
cd client
npm run build