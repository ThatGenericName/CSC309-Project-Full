# Generated by Django 4.1.2 on 2022-12-08 23:40

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subscriptions', '0001_initial'),
        ('gymclasses', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPaymentData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_type', models.CharField(max_length=6)),
                ('card_num', models.CharField(max_length=16)),
                ('card_name', models.CharField(max_length=255)),
                ('exp_month', models.IntegerField()),
                ('exp_year', models.IntegerField()),
                ('active', models.BooleanField(default=True)),
                ('tgen', models.BooleanField(default=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserSubscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_time', models.DateTimeField(blank=True, null=True)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('recurring', models.BooleanField(default=True)),
                ('tgen', models.BooleanField(default=False)),
                ('payment_detail', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.userpaymentdata')),
                ('subscription', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='subscriptions.subscription')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserExtension',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('phone_num', models.CharField(max_length=12)),
                ('profile_pic', models.ImageField(blank=True, upload_to=accounts.models.RandomNameGen)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('active_subscription', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.usersubscription')),
            ],
        ),
        migrations.CreateModel(
            name='UserClassInterface',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('financial_hold', models.BooleanField(default=False)),
                ('dropped', models.BooleanField(default=False)),
                ('class_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gymclasses.gymclassschedule')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]