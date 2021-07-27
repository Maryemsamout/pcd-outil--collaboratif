from django.db import models
from datetime import datetime 

# Create your models here.
class Etudiant(models.Model):
    idEtudiant = models.AutoField(primary_key=True)
    cin = models.CharField(max_length=100, default="")
    fullname = models.CharField(max_length=100) 
    level = models.CharField(max_length=100)
    birthDate = models.DateField()
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Enseignant(models.Model):
    idEnseignant = models.AutoField(primary_key=True)
    cin = models.CharField(max_length=100, default="")
    fullname = models.CharField(max_length=100) 
    level = models.CharField(max_length=100)
    birthDate = models.DateField()
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    
class Question(models.Model):
    idQuestion = models.AutoField(primary_key=True)
    idEtudiant = models.ForeignKey(Etudiant,on_delete=models.SET_DEFAULT,default=3,db_constraint=False)
    question = models.TextField(max_length=255)
    questionKey= models.CharField(max_length=100)
    dateQuestion = models.CharField(max_length=50)
    image=models.CharField(max_length=100,default="")

class Comment(models.Model):
    idComment = models.AutoField(primary_key=True)
    comment = models.TextField(max_length=255,default="")
    idQuestion = models.ForeignKey(Question,on_delete=models.SET_DEFAULT,default=0)
    idEtudiant = models.ForeignKey(Etudiant,on_delete=models.SET_DEFAULT,default=0)
    dateComment =models.CharField(max_length=50)

class Message(models.Model):
    idMessage = models.AutoField(primary_key=True)
    idEtudiantS = models.ForeignKey(Etudiant,on_delete=models.SET_DEFAULT,default=0)
    fullnameS = models.CharField(max_length=100)  
    idEtudiantR = models.IntegerField(default=0)
    fullnameR = models.CharField(max_length=100)
    message = models.TextField(max_length=255 , default="")
    seen = models.BooleanField(default=False)

class Courses (models.Model):
    CoursId =models.AutoField(primary_key= True)
    CoursName=models.CharField(max_length=100)
    idEtudiant = models.ForeignKey(Etudiant,on_delete=models.SET_DEFAULT,default=0)
    CoursDescri=models.CharField(max_length=100,default="")
    CoursLevel=models.CharField(max_length=100)
    CoursDate=models.CharField(max_length=100 , default="")
    PhotoFileName=models.CharField(max_length=100)
  
class Exercices (models.Model):
    ExerciceId =models.AutoField(primary_key= True)
    ExerciceName=models.CharField(max_length=100)
    idEtudiant = models.IntegerField()
    ExerciceLevel=models.CharField(max_length=100)
    ExerciceDate=models.CharField(max_length=100 , default="")
    PhotoFileName=models.CharField(max_length=100)    





