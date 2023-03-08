#!/bin/bash

zip -r deploy.zip client/build server ./package.json
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings WEBSITE_RUN_FROM_PACKAGE='1'
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings STORAGE_ACCOUNT_NAME=$STORAGE_ACCOUNT_NAME
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings ATLAS_URI=$ATLAS_URI
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings CONTAINER_NAME=$CONTAINER_NAME
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings AZURE_SAS=$AZURE_SAS
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings SECRET=$SECRET
az webapp config appsettings set --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --settings CLIENT_SECRET=$CLIENT_SECRET
az webapp deployment source config-zip --resource-group $RESOURCE_GROUP_NAME --name $APP_NAME --src deploy.zip
