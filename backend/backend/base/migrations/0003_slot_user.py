# Generated by Django 4.1.1 on 2022-12-07 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_remove_slot_application'),
    ]

    operations = [
        migrations.AddField(
            model_name='slot',
            name='user',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
