from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView, ListView
from django.views.generic.detail import DetailView
from POPLAVSKY.models import Case, Worker


class MainView(TemplateView):
    template_name = 'ru/main.html'

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context["events"] = Event.objects.all()[:3]
    #     context["products"] = Product.objects.all()[:4]
    #     context["categories"] = Category.objects.all()
    #     context["projects"] = Project.objects.all()[:5]
    #     context["brands"] = Brand.objects.all()[:4]
    #     context['random_case'] = Project.objects.order_by('?').first()
    #     return context


class Portfolio(ListView):
    template_name = 'ru/portfolio.html'
    model = Case
    context_object_name = 'cases'


class Case(DetailView):
    model = Case
    context_object_name = 'case'
    template_name = 'ru/case.html'


class Prices(ListView):
    model = Worker
    context_object_name = 'case'
    template_name = 'ru/prices.html'


class AboutUs(ListView):
    model = Worker
    context_object_name = 'case'
    template_name = 'ru/about.html'


class Contacts(ListView):
    model = Worker
    context_object_name = 'case'
    template_name = 'ru/contacts.html'
