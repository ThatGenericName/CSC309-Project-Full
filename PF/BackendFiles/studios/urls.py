
from django.contrib import admin
from django.urls import include, path
from .Views.createstudio import *
from .Views.addamenity import *
from .Views.deleteamentity import DeleteAmenity
from .Views.deletestudio import DeleteStudio
from .Views.editamenity import EditAmenity
from .Views.editstudio import EditStudio
from .Views.listamenity import *
from .Views.studiogenerator import AdminGenerateStudios
from .Views.viewstudios import ViewStudios
from .Views.getimages import ImageView
from .Views.viewsinglestudio import ViewStudio

app_name = 'studios'

urlpatterns = [
    path('create/', CreateStudio.as_view(), name='CreateStudio'),
    path('<int:pk>/edit/', EditStudio.as_view(), name='editStudio'),
    path('<int:studio_id>/', ViewStudio.as_view(), name='ViewStudio'),
    path('<int:pk>/delete/', DeleteStudio.as_view(), name='DeleteStudio'),
    path('studioimages/<str:image>/', ImageView.as_view(), name='ImageView'),
    path('<int:pk>/amenities/add/', AddAmenity.as_view(), name='AddAmenity'),
    path('<int:pk>/amenities/delete/', DeleteAmenity.as_view(), name='DeleteAmenity'),
    path('<int:pk>/amenities/', ListAmenity.as_view(), name='ListAmenity'),
    path('<int:pk>/amenities/edit/', EditAmenity.as_view(), name='EditAmenity'),
    path('', ViewStudios.as_view(), name='viewStudios'),
    path('admingenerate/', AdminGenerateStudios.as_view(), name='generateStudios')
]
