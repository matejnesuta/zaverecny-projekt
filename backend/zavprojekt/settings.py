from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'w-7xjd#yhq1)#*y6=-sjb7%&mdlsmu+c(5)r7&v)-f)6*+)-i*'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Povolil jsem si všechny hosty, abych mohl používat program Postman. Jinak to je samozřejmě blbost.
ALLOWED_HOSTS = ["*"]

# Tohle umožňuje zapisovat log z Djanga do souboru a občas se to hodí, protože jsou tam kompletní informace.
# Zapoznámkoval jsem ho, protože ho nepotřebuju.
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#        'file': {
#             'level': 'DEBUG',
#             'class': 'logging.FileHandler',
#             'filename': 'debug.log',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['file'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#     },
# }

# Věci týkající se Djanga Rest
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DATETIME_FORMAT': "%Y-%m-%d %H:%M:%S",
    'DATETIME_INPUT_FORMATS': ["%Y-%m-%d %H:%M:%S"],
}

# Nastavení CORS
# Whitelist by taky možná chtěl upravit.
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    "http://172.20.0.3:3000"
]
# Používané aplikace.

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'accounts',
    'templates',
    'taskboard',
    'corsheaders',
    'dj_rest_auth',
    'rest_framework',
    'rest_framework.authtoken',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.twitter',
    "django_elasticsearch_dsl",
    "django_elasticsearch_dsl_drf"
]

SITE_ID = 1

# Tohle mění vestavěný uživatelský model na můj vlastní a díky tomu bude možné přihlašování pomocí emailu a ne
# uživatelského jména. Je podivuhodné, že to funguje s balíčkem dj_rest_auth. Myslel jsem si, že vznikne nějaký
# konflikt.
AUTH_USER_MODEL = 'accounts.User'

# Tohle můžu nastavit i na skutečný mailový servis a posílat tak skutečné maily, ale zatím si maily kvůli jednoduchosti
# vypisuji do konzole.
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Tohle možná ani není potřeba.
REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'accounts.serializers.CustomRegisterSerializer'
}

REST_AUTH_SERIALIZERS = {
    'PASSWORD_RESET_SERIALIZER': 'accounts.serializers.CustomPasswordResetSerializer'
}

# Nastavení balíčku dj_rest_auth. Velmi důležité.
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False
OLD_PASSWORD_FIELD_ENABLED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'zavprojekt.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [str(BASE_DIR.joinpath('templates'))]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'zavprojekt.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# Nastavení databáze. Používám PostgreSQL.
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "rest_api",
        "USER": "docker",
        "PASSWORD": "docker",
        "HOST": "db",
        "PORT": "5432",
    }
}

ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'elasticsearch:9200'
    },
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Prague'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Tohle je přežitek z normálního Djanga.
STATIC_URL = '/static/'

# Tady ukládám profilové obrázky a přílohy k úkolům. Django si do databáze pak jen ukládá cestu k nim.
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
