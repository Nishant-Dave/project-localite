# Generated by Django 5.0.1 on 2024-03-13 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_friendstatus_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendstatus',
            name='status',
            field=models.TextField(choices=[('F', 'Friends'), ('P', 'Pending'), ('N', 'None')]),
        ),
    ]