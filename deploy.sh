#!/bin/bash

zip -r deploy.zip client/build server ./package.json
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings WEBSITE_RUN_FROM_PACKAGE='1'
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings STORAGE_ACCOUNT_NAME="azuretest2036759"
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings CONTAINER_NAME="cattusblobstorage"
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings AZURE_SAS="sp=racwdli&st=2023-02-20T17:17:22Z&se=2023-11-10T01:17:22Z&spr=https&sv=2021-06-08&sr=c&sig=z0J8mgIgJ1mATHazC8k6wfR%2FRHWpOcTeWtPvFHbcP2M%3D"
az webapp deployment source config-zip --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --src deploy.zip
