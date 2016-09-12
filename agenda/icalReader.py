# -*- coding: utf-8 -*-
import datetime
from django.utils import timezone
import urllib.request as urllib

import icalendar
import os

FILENAME = "tmp.ics"

class IcalReader(object):
    def __init__(self, feed):
        super(IcalReader, self).__init__()
        self.feed = feed
        try:
            urllib.urlretrieve(self.feed, FILENAME)
        except:
            pass

    @staticmethod
    def _format(startDate, endDate):
        res = startDate.strftime("%d %B %Y")
        if startDate.year == endDate.year and \
                        startDate.month == endDate.month and \
                        startDate.day == endDate.day:
            if type(startDate) != datetime.date:
                res += " de "
                res += startDate.strftime("%H:%M")
                res += " à "
                res += endDate.strftime("%H:%M")
        else:
            if type(startDate) != datetime.date:
                res += ' ' + startDate.strftime("%H:%M")
            res += " au "
            res += endDate.strftime("%d %B %Y %H:%M") if type(
                endDate) != datetime.date else endDate.strftime(
                "%d %B %Y")
        return res

    def read(self):
        try:
            f = open(FILENAME, "r")
            gcal = icalendar.Calendar.from_ical(f.read())
            events = []
            for event in gcal.walk():
                if event.name == "VEVENT":
                    summary = str(event.get("SUMMARY"))
                    location = str(event.get("LOCATION"))
                    start = event.decoded("DTSTART")
                    end = event.decoded("DTEND")
                    description = str(event.get("DESCRIPTION"))

                    if type(end) == datetime.date:
                        now = datetime.date.today()
                    else:
                        now = timezone.now()
                    if end < now:
                        continue

                    events.append(dict({
                        'summary': summary,
                        'location': location,
                        'start': start.isoformat(),
                        'pStart': start,
                        'end': end.isoformat(),
                        'pEnd': end,
                        'description': description
                    }))
            f.close()
            os.remove(FILENAME)
            return sorted(
                    events,
                    key=lambda e: e['start']
            )
        except IOError:
            return []
