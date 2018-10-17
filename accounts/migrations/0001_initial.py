# Generated by Django 2.0.2 on 2018-09-10 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('parentname', models.CharField(max_length=100)),
                ('childname', models.CharField(max_length=100)),
                ('userid', models.IntegerField()),
                ('email', models.CharField(max_length=100)),
                ('image', models.ImageField(default='{%  static "kid.jpg" %}', upload_to='images/')),
            ],
        ),
    ]
