from django.urls import path
from POPLAVSKY.views import *

urlpatterns = [
    path('', MainView.as_view(), name='main'),
    path('portfolio', Portfolio.as_view(), name='portfolio'),
    path('portfolio/<int:pk>/', Case.as_view(), name='case'),
    path('services/', Prices.as_view(), name='services'),
    path('about-us/', AboutUs.as_view(), name='about'),
    path('contacts/', Contacts.as_view(), name='contacts'),
]
