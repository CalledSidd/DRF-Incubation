# Generated by Django 4.1.1 on 2022-12-08 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_slot_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='slot',
            name='company_name',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
