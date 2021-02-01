from django.db import models
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from accounts.models import User
from datetime import datetime
from django.core.validators import MinValueValidator
import os

# Tenhle balíček tu mám, abych byl schopný validovat nejen koncovky vložených souborů, ale i jejich kontent.
from constrainedfilefield.fields import ConstrainedFileField, ConstrainedImageField


# Tady mám definované, jak mi Django ukládá profilové obrázky a soubory.
def profile_pic_path(instance, filename):
    return "profile_pic/" + str(instance.id) + "/" + filename


def attachment_path(instance, filename):
    return "attachment/" + str(instance.id) + "/" + filename


# Model profilu, který je navázán vazbou 1:1 na účty. Podle dokumentace je prý nejlepší dávat do User modelu jen pole
# potřebná pro přihlášení a zbytek takhle navázat.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, blank=False, null=False, verbose_name="First name", default="Unnamed")
    last_name = models.CharField(max_length=50, blank=False, null=False, verbose_name="Last name", default="User")
    profile_pic = ConstrainedImageField(upload_to=profile_pic_path,
                                        verbose_name="Profile picture",
                                        blank=True,
                                        null=True,
                                        max_upload_size=10485760)
    bio = models.CharField(max_length=150, null=True, blank=True, verbose_name="Bio")

    class Meta:
        ordering = ["user__email", "last_name"]
        verbose_name_plural = "Profile"

    def __str__(self):
        return f" {self.user.email},{self.first_name} {self.last_name}"

# Přepsal jsem save metodu. Při úpravě a nebo odstranění profilového obrázku zůstavaly staré soubory ve složkách
    # Djanga. Teď už ne
    def save(self, *args, **kwargs):
        try:
            this = Profile.objects.get(id=self.id)
            if this.profile_pic != self.profile_pic:
                this.profile_pic.delete()
        except:
            pass
        super(Profile, self).save(*args, **kwargs)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Taskboard(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, default="Tabule", verbose_name="Name")
    icon = models.CharField(max_length=20, blank=False, null=False, default="grav", verbose_name="Icon", 
                            choices=(('grav', 'grav'),
                                      ('wheelchair-alt', 'wheelchair-alt'),
                                      ('camera-retro', 'camera-retro'),
                                      ('code', 'code'),
                                      ('floppy-o', 'floppy-o')),)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Taskboard"

    def __str__(self):
        return self.name


# Jedná se o členskou roli v jednotlivých tabulích. každý člen může být člen více tabulí a v každé mít jinou členskou
# roli.
class Membership(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    taskboard = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    role = models.CharField(choices=(('member', 'Member'),
                                     ('moderator', 'Moderator'),
                                     ('owner', 'Owner'),
                                     ),
                            blank=False, max_length=10, default='member')

    class Meta:
        ordering = ["profile__last_name"]
        verbose_name_plural = "Membership"

    def __str__(self):
        return f" {self.profile.last_name}, {self.role}, {self.taskboard.name}"


# Model úkolu.
class Task(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null=False, blank=False, verbose_name="Title")
    description = models.TextField(null=False, blank=False, verbose_name="Description")
    deadline = models.DateField(blank=False, null=False, verbose_name="Deadline",
                                validators=[MinValueValidator(datetime.now().date())])
    stage = models.CharField(choices=(('not_started', 'Not started'),
                                      ('in_progress', 'In progress'),
                                      ('on_hold', 'On hold'),
                                      ('almost_finished', 'Almost finished'),
                                      ('done', 'Done')),
                             max_length=16, null=False, blank=False, verbose_name="Stage")
    time_of_creation = models.DateTimeField(auto_now=True, verbose_name="Time of creation")
    taskboard = models.ForeignKey(Taskboard, on_delete=models.CASCADE)

    class Meta:
        ordering = ["title", "deadline"]
        verbose_name_plural = "Task"

    def __str__(self):
        return f"{self.title}, {self.taskboard.name}, {self.author.first_name} {self.author.last_name}"


# Model přílohy.
class Attachment(models.Model):
    title = models.CharField(max_length=200,
                             verbose_name="Title")
    last_update = models.DateTimeField(auto_now=True)
    file = ConstrainedFileField(upload_to=attachment_path,
                                content_types=['image/png',
                                               'image/jpeg',
                                               'image/bmp',
                                               'image/gif',
                                               'audio/aac',
                                               'audio/mpeg',
                                               'audio/ogg',
                                               'audio/x-flac',
                                               'audio/x-wav',
                                               'video/mp4',
                                               'video/x-ms-wmv',
                                               'video/webm',
                                               'application/pdf',
                                               'text/plain',
                                               'application/zip'
                                               ],
                                null=True,
                                verbose_name="File",
                                max_upload_size=52428800)
    TYPE_OF_ATTACHMENT = (
        ('audio', 'Audio'), ('image', 'Image'), ('text', 'Text'), ('video', 'Video'), ('other', 'Other'),)
    type = models.CharField(max_length=5, choices=TYPE_OF_ATTACHMENT, blank=True, default='image',
                            help_text='Select allowed attachment type', verbose_name="Attachment type")
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Attachment"

    def __str__(self):
        return self.title

# Funkce pro mazání souborů. Při vymazání přílohy se mi smazal odkaz na soubor, ale soubor zůstal ve složce Djanga dál. Teď se maže. Je to elegantnější řešení,
# než to mazat manuálně.
@receiver(post_delete, sender=Attachment)
def attachment_delete(sender, instance, **kwargs):
    instance.file.delete(False)


# Model komentáře.
class Comment(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000, verbose_name="Text", blank=False, null=False)
    time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Comment"

    def __str__(self):
        return f"{self.author.first_name} {self.author.last_name}, {self.task.title}, {self.text}"


# Log pro všechny uživatele 1 tabule, že někdo něco přidal.
class Log(models.Model):
    text = models.CharField(max_length=100, verbose_name="Text", blank=False, null=False)
    time = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name_plural = "Log"

    def __str__(self):
        return f"{self.board}, {self.task.title}, {self.profile}, {self.comment}, {self.text}"
