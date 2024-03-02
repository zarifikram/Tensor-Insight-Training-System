#!/bin/bash

#kubectl create secret generic tits-secrets --from-env-file=.env

# Build Docker Image
docker build -t tensorits.azurecr.io/tensorits-backend-image:latest .

# Log in to Azure Container Registry
docker login tensorits.azurecr.io 

# Push Docker Image
docker push tensorits.azurecr.io/tensorits-backend-image:latest

# Delete Service
kubectl delete service tensorits-backend-service

# Delete Deployment
kubectl delete deployment tensorits-backend-deployment


kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl create secret docker-registry acr-secret --docker-server=tensorits.azurecr.io --docker-username=tensorits --docker-password=password --docker-email=anamulhoqueemtiaj@gmail.com

kubectl exec -it pod-name -- python manage.py makemigrations




