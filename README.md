# Cerkinfo New Site

Reworking of Site2.0 without django_cms and better handling of db migrations, ...

## Dependencies
- python3
- python3-dev
- python3-venv
- libjpeg-dev

## Set up
```
	$ git clone https://github.com/Cerkinfo/Site.git cerkinfo_site
	$ cd cerkinfo_site
	$ virtualenv --python=/usr/bin/python3 .ve
	$ source .ve/bin/activate
	$ pip install -r requirements.txt
```
## Run
```
        $ python manage.py migrate
        $ python manage.py loaddata fixtures/group.json
        $ python manage.py loaddata fixtures/events.json
        $ python manage.py loaddata fixtures/wiki.json
        $ python manage.py runserver
```
