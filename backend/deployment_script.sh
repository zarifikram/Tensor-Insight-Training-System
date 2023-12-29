#!/bin/bash

# Build Docker Image
docker build -t titsacr.azurecr.io/tensorits-backend-image:latest .

# Log in to Azure Container Registry
docker login titsacr.azurecr.io 

# Push Docker Image
docker push titsacr.azurecr.io/tensorits-backend-image:latest

# Delete Service
kubectl delete service tensorits-backend-service

# Delete Deployment
kubectl delete deployment tensorits-backend-deployment


kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml

