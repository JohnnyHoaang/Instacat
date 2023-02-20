#!/bin/bash

zip -r deploy.zip client/build api ./package.json
"az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings WEBSITE_RUN_FROM_PACKAGE='1'"
"az webapp deployment source config-zip --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --src deploy.zip"