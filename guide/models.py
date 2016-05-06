from django.db import models


class Guide(models.Model):
    title = models.CharField(max_length=150, blank=False, default='')
    description = models.TextField()
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class GuideItem(models.Model):
    icon = models.CharField(max_length=50,
                            default='',
                            blank=False,
                            verbose_name="favicon")
    description = models.TextField()
    guide = models.ForeignKey(Guide)

    def __str__(self):
        return self.description