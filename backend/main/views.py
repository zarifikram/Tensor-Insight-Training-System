from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
# Create your views here.
class HomePageView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        return Response({"test":"Hello!"})