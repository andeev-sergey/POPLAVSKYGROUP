from django.urls import path
from POPLAVSKY.views import *
from django.conf.urls import (
    handler400, handler403, handler404, handler500
)

urlpatterns = [
    path('', MainView.as_view(), name='main'),
    path('portfolio', Portfolio.as_view(), name='portfolio'),
    path('portfolio/<int:pk>/', Case.as_view(), name='case'),
    path('services/', Prices.as_view(), name='services'),
    path('about-us/', AboutUs.as_view(), name='about'),
    path('contacts/', Contacts.as_view(), name='contacts'),

    path('eng/', MainViewEng.as_view(), name='eng-main'),
    path('eng/portfolio', PortfolioEng.as_view(), name='eng-portfolio'),
    path('eng/portfolio/<int:pk>/', CaseEng.as_view(), name='eng-case'),
    path('eng/services/', PricesEng.as_view(), name='eng-services'),
    path('eng/about-us/', AboutUsEng.as_view(), name='eng-about'),
    path('eng/contacts/', EngContacts.as_view(), name='eng-contacts'),

    path('request', request_call, name='request'),
    path('404', page_not_found_web, name='404' ),
]
