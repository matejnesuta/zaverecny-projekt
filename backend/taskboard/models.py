from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from datetime import datetime
from django.core.validators import MinValueValidator


def profile_pic_path(instance, filename):
    return "profile_pic/" + str(instance.id) + "/" + filename


def attachment_path(instance, filename):
    return "attachment/" + str(instance.id) + "/" + filename


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, blank=False, null=False, verbose_name="First name")
    last_name = models.CharField(max_length=50, blank=False, null=False, verbose_name="Last name")
    profile_pic = models.ImageField(upload_to=profile_pic_path, verbose_name="Profile picture", blank=True, null=True)

    class Meta:
        ordering = ["user__email", "last_name"]
        verbose_name_plural = "Profile"

    def __str__(self):
        return f" {self.user.email}, {self.last_name}"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Taskboard(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, default="Tabule", verbose_name="Name")

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Taskboard"

    def __str__(self):
        return self.name


# jedná se o členskou roli v jednotlivých tabulích. každý člen může být člen více tabulí a v každé mít jinou členskou
# roli
class Membership(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    taskboard = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    role = models.CharField(choices=(('member', 'Member'),
                                     ('moderator', 'Moderator'),
                                     ('owner', 'Owner'),
                                     ),
                            blank=False, max_length=10)

    class Meta:
        ordering = ["profile__last_name"]
        verbose_name_plural = "Membership"

    def __str__(self):
        return f" {self.profile.last_name}, {self.role}, {self.taskboard.name}"


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


class Attachment(models.Model):
    title = models.CharField(max_length=200,
                             verbose_name="Title")
    last_update = models.DateTimeField(auto_now=True)
    file = models.FileField(upload_to=attachment_path, null=True, verbose_name="File")
    TYPE_OF_ATTACHMENT = (
        ('audio', 'Audio'), ('image', 'Image'), ('text', 'Text'), ('video', 'Video'), ('other', 'Other'),)
    type = models.CharField(max_length=5, choices=TYPE_OF_ATTACHMENT, blank=True, default='image',
                            help_text='Select allowed attachment type', verbose_name="Attachment type")
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Attachment"

    def __str__(self):
        return self.title


class Log(models.Model):
    text = models.CharField(max_length=100, verbose_name="Text", blank=False, null=False)
    time = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
