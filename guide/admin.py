from django.contrib import admin
from guide.models import Guide, GuideItem


class ItemInline(admin.StackedInline):
    model = GuideItem
    extra = 1



@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    inlines = [ItemInline,]