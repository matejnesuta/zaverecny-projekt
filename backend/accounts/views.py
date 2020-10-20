from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import RegistrationForm, AccountAuthenticationForm

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
