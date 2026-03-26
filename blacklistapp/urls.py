from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('check-text/', views.check_text),
]

