# Generated by Django 4.1.1 on 2022-12-12 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_bookingslot'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='typeof',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
