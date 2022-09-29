from django.urls import path
from . import views

urlpatterns = [
    path("profiles/login/", views.login_user, name="login"),
    path("profiles/register/", views.register_user, name="register")

]