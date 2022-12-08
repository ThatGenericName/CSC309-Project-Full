
from django.contrib import admin
from django.urls import include, path

from gymclasses.views.useraddgymclass import AddGymClassSessionToUser, \
    AddGymClassToUser, DropAllClasses, RemoveGymClassFromUser, \
    RemoveGymClassSessionFromUser
from .views.addgymclass import CreateGymClass
from .views.deletegymschedule import DeleteGymSchedule
from .views.deletegymclass import DeleteGymClass
from .views.classesofstudio import ClassesofStudio
from .views.editgymclass import EditGymClass
from .views.editgymschedule import EditGymClassSchedule
from .views.gymclasslistadmin import GymClassListAdmin
from .views.searchgymclassschedules import ViewGymClassSchedule
from .views.gymclasslist import GymClassList
from .views.classesofstudio_admin import ClassesofStudioAdmin
from .views.uncancelgymclass import UncancelGymClass
from .views.uncancelgymschedule import UncancelSchedule

app_name = 'gymclasses'

urlpatterns = [
    path('session/<int:session_id>/signup/', AddGymClassSessionToUser.as_view(),
         name='enrollGymClassSession'),
    path('session/<int:session_id>/drop/', RemoveGymClassSessionFromUser.as_view(),
         name='dropGymClassSession'),
    path('<int:class_id>/signup/', AddGymClassToUser.as_view(), name='enrollGymClass'),
    path('<int:class_id>/drop/', RemoveGymClassFromUser.as_view(), name='dropGymClass'),
    path('dropclasses/', DropAllClasses.as_view(), name='dropAllClasses'),
    path('<int:studio_id>/create/', CreateGymClass.as_view(), name='CreateGymClass'),
    path('<int:gymclass_id>/edit/', EditGymClass.as_view(), name='EditGymClass'),
    path('schedule/<int:gymclass_schedule_id>/edit/', EditGymClassSchedule.as_view(),
         name='EditGymClassSchedule'),
    path('schedule/<int:gym_schedule>/delete/', DeleteGymSchedule.as_view(),
         name='DeleteGymSchedule'),
    path('<int:gym_class>/delete/', DeleteGymClass.as_view(), name='DeleteGymClass'),
    path('studio/<int:studio_id>/list/', ClassesofStudio.as_view(), name='ClassesofStudio'),
    path('schedule/<int:gym_schedule>/uncancel/', UncancelSchedule.as_view(),
         name='UncancelSchedule'),
    path('gymclass/<int:gym_schedule>/uncancel/', UncancelGymClass.as_view(),
         name='UncancelGymClass'),
    path('studio/<int:studio_id>/list/admin', ClassesofStudioAdmin.as_view(),
         name='ClassesofStudioAdmin'),
    path('<int:studio_id>/list/', GymClassList.as_view(), name='GymClassList'),
    path('<int:studio_id>/list/admin', GymClassListAdmin.as_view(), name='GymClassListAdmin'),
    path('', ViewGymClassSchedule.as_view(), name='ViewGymClassSchedule'),
]
