# Generated by Django 4.1.2 on 2022-12-08 23:40

from django.db import migrations, models
import django.db.models.deletion
import studios.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Studio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('post_code', models.CharField(max_length=255)),
                ('geo_loc', models.CharField(blank=True, max_length=255)),
                ('phone_num', models.CharField(max_length=20)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('tgen', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='StudioSearchHash',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hash', models.CharField(max_length=17)),
                ('search_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='StudioSearchTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dist', models.FloatField(default=0)),
                ('searchkey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studiosearchhash')),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
        ),
        migrations.CreateModel(
            name='ImageRep',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=studios.models.RandomNameGen)),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
        ),
        migrations.CreateModel(
            name='Amenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=255)),
                ('quantity', models.IntegerField()),
                ('tgen', models.BooleanField(default=False)),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
        ),
    ]
