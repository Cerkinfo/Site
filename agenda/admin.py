from agenda.models import Event
from django.contrib import admin


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_filter = ['displayed',]