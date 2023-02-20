#!/bin/bash

zip -r deploy.zip client/build api ./package.json
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings WEBSITE_RUN_FROM_PACKAGE='1'
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings STORAGE_ACCOUNT_NAME="azuretest2036759"
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings CONTAINER_NAME="cattusblobstorage"
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings AZURE_SAS=""
az webapp deployment source config-zip --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --src deploy.zip
