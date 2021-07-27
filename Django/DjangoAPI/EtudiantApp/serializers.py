from rest_framework import serializers
from EtudiantApp.models import Etudiant
from EtudiantApp.models import Question
from EtudiantApp.models import Comment
from EtudiantApp.models import Message
from EtudiantApp.models import Courses
from EtudiantApp.models import Enseignant
from EtudiantApp.models import Exercices

class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model=Etudiant
        fields=('idEtudiant','cin','fullname','birthDate','email','password','level')

class EnseignantSerializer(serializers.ModelSerializer):
    class Meta:
        model=Enseignant
        fields=('idEnseignant','cin','fullname','birthDate','email','password','level')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields=('idQuestion','idEtudiant','question','questionKey','dateQuestion','image')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=('idComment','idQuestion','idEtudiant','dateComment','comment')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Message
        fields=('idMessage','idEtudiantS','fullnameS','idEtudiantR','fullnameR','message')
        
class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model=Courses
        fields=('CoursId',
                'CoursDate',
                 'idEtudiant',
                 'CoursName',
                 'CoursDescri',
                 'CoursLevel',
                 'PhotoFileName' )

class ExerciceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Exercices
        fields=('ExerciceId',
                'ExerciceDate',
                 'idEtudiant',
                 'ExerciceName',
                 'ExerciceLevel',
                 'PhotoFileName' )
