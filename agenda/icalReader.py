# -*- coding: utf-8 -*-
import datetime
import urllib.request as urllib

import icalendar
import os

FILENAME = "tmp.ics"


class Event(object):
    def __init__(self, title, date, link, orderer):
        self.title = title
        self.date = date
        self.link = link
        self.orderer = orderer

    def __repr__(self):
        return "[ title='{0}' date='{1}' link='{2}' orderer='{3}' ]".format(
            self.title, self.date, self.link,
            self.orderer)


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
                    now = datetime.datetime.now().replace()
                    now = [now.year, now.month, now.day]
                    endDate = event.get("DTEND").dt
                    orderer = [endDate.year, endDate.month, endDate.day]
                    if orderer < now:
                        continue

                    startDate = event.get("DTSTART").dt
                    link = event.get("DESCRIPTION")
                    name = event.get("SUMMARY")
                    date = IcalReader._format(startDate, endDate)
                    events.append(Event(name, date, link, orderer))
            f.close()
            os.remove(FILENAME)
            return sorted(events, key=lambda event: event.orderer)
        except IOError:
            return []
