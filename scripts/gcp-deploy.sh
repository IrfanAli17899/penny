#!/bin/bash

# Set up variables
APP_NAME=$1
ENVIRONMENT=$2
PROJECT_NAME=$3
PROJECT_ID=$4
PROJECT_ROOT=$5
REGION=$6
ENV_VARS=$7

appName="$APP_NAME-$ENVIRONMENT-$PROJECT_NAME"
imageName="gcr.io/$PROJECT_ID/$appName:latest"

# Build Docker image
echo "Building Docker image for $appName..."
docker build -t $imageName --build-arg APP="$PROJECT_NAME" -f "$PROJECT_ROOT/Dockerfile" .

# Push Docker image
docker push $imageName

# Deploy to Cloud Run
echo "Deploying $appName to Cloud Run..."
gcloud run deploy "$appName-service" --image "$imageName" --region="$REGION" --quiet --set-env-vars="${ENV_VARS[$PROJECT_NAME]}"
