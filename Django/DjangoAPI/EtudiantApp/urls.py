from django.conf.urls import url
from EtudiantApp import views

from django.conf.urls.static import static
from django.conf import settings
urlpatterns=[
 
   url(r'^etudiants/$',views.etudiantApi),
    url(r'^etudiants/([0-9]+)$',views.etudiant_detail),

    url(r'^enseignants/$',views.enseignantApi),
    url(r'^enseignants/([0-9]+)$',views.enseignant_detail),
  

    url(r'^questions/$',views.questionApi),
    # url(r'^questions/([0-9]+)$',views.questionApi),
    url(r'^questions/(?P<pk>[0-9]+)$', views.question_detail),


    url(r'^comments/$',views.commentApi),
   # url(r'^comments/([0-9]+)$',views.commentApi),
    url(r'^comments/(?P<pk>[0-9]+)$', views.comment_detail),
    # url(r'^Save$',views.Save),

    url(r'^messages/$',views.messageApi),
    url(r'^messages/([0-9]+)$',views.message_detail),

    url(r'^cours/$',views.coursApi),
    url(r'^cours/([0-9]+)$',views.course_detail),

    url(r'^SaveFile$', views.SaveFile),
    
    url(r'^exportcsv', views.exportcsv),

    url(r'^exercice/$',views.exerciceApi),
    url(r'^exercice/([0-9]+)$',views.exercicee_detail),



] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)



