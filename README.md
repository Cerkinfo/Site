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
 $ npm install
```
## Run

N.B. If for dev don't forget to create a superuser `$ python manage.py createsuperuser`

```
 $ python manage.py migrate
 $ python manage.py loaddata fixtures/init.json
 $ python manage.py runserver
```

Also don't forget to bundle the javascript.

```
 $ npm run watch # To dev
 $ npm run build # For prod
```
