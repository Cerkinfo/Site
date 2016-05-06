from django.contrib import admin
from guide.models import Guide, GuideItem


class ItemInline(admin.TabularInline):
    model = GuideItem



@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    inlines = [ItemInline,]