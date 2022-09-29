from django.shortcuts import render

# Create your views here.

def register_user(request):
    return render(request, 'profiles/register.html')

def login_user(request):
    return render(request, 'profiles/login.html')