from django.urls import path
from POPLAVSKY.views import *
from django.conf.urls import (
    handler400, handler403, handler404, handler500
)

urlpatterns = [
    path('', MainView.as_view(), name='main'),
    path('portfolio', Portfolio.as_view(), name='portfolio'),
    path('portfolio/<int:pk>/', CaseDetail.as_view(), name='case'),
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
    path('manager/', managerPanel.as_view(), name='manager-main' ),
    path('manager/add-project', AddProject.as_view(), name='add-project' ),
    path('manager/<int:pk>/', CaseManagerDetail.as_view(), name='case-edit'),
    path('manager/requests/', Requests.as_view(), name='requests'),
    path('manager/settings/', Settings.as_view(), name='settings'),
    path('manager/add-project/add', add_project),
    path('manager/edit-project', edit_project),
    path('manager/edit-request', edit_request),
    path('manager/edit-settings', edit_settings),
    path('manager/logout', logout_view, name='exit'),
]
