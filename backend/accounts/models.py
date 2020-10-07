from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)


# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_active=True, is_verified=False, is_staff=False, is_admin=False):
        if not email:
            raise ValueError("Uživatelé musí mít email adresu!")
        if not password:
            raise ValueError("Uživatelé musí mít heslo!")
        user_obj = self.model(
            email=self.normalize_email(email)
        )
        user_obj.set_password(password)
        user_obj.active = is_active
        user_obj.verified = is_verified
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
            is_staff=True
        )
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)  # může se přihlásit do svého účtu
    verified = models.BooleanField(default=False)  # email tohoto účtu existuje
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'  # toto tu je, aby se uživatel přihlašoval pomocí emailu
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_active(self):
        return self.active

    @property
    def is_verified(self):
        return self.verified

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin
