from django.contrib import admin
from pv.models import PV


@admin.register(PV)
class PVAdmin(admin.ModelAdmin):
    fields = ['resource', 'meeting_date', 'reunion_type', 'year']