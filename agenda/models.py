from django.db import models

class Event(models.Model):
    displayed = models.BooleanField(default=False)
    pict = models.ImageField(upload_to="event", blank=True)
    title = models.CharField(default="", max_length=300)
    desc = models.TextField()

    def __str__(self):
        return self.title