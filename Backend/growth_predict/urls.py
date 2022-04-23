from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('<str:id>/<str:comment>',view = views.home)
]