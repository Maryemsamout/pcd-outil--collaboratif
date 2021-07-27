from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from EtudiantApp.serializers import EtudiantSerializer
from EtudiantApp.serializers import EnseignantSerializer
from EtudiantApp.serializers import QuestionSerializer
from EtudiantApp.serializers import CommentSerializer
from EtudiantApp.serializers import MessageSerializer
from EtudiantApp.serializers import ExerciceSerializer
from EtudiantApp.models import Courses
from EtudiantApp.serializers import CoursSerializer
from django.core.files.storage import default_storage 
from EtudiantApp.models import Etudiant
from EtudiantApp.models import Enseignant
from EtudiantApp.models import Question
from EtudiantApp.models import Comment
from EtudiantApp.models import Message
from EtudiantApp.models import Exercices
from django.http.response import JsonResponse
from rest_framework import status
from django.http import HttpResponse
from django.shortcuts import redirect
import csv
#from django.contrib.messages.storage import default_storage


@csrf_exempt
def etudiantApi(request,id=0):
    if request.method =='GET':
        etudiants=Etudiant.objects.all()
        etudiants_serializer = EtudiantSerializer(etudiants,many=True)
        return JsonResponse(etudiants_serializer.data,safe=False)
    elif request.method=='POST':
        etudiant_data=JSONParser().parse(request)
        etudiants_serializer = EtudiantSerializer(data=etudiant_data)
        if etudiants_serializer.is_valid():
            etudiants_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    elif request.method=='PUT':
        etudiant_data = JSONParser().parse(request)
        etudiant=Etudiant.objects.get(idEtudiant=etudiant_data['idEtudiant'])
        etudiants_serializer=EtudiantSerializer(etudiant,data=etudiant_data)
        if etudiants_serializer.is_valid():
            etudiants_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method=='DELETE':
        etudiant=Etudiant.objects.get(idEtudiant=id)
        etudiant.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def etudiant_detail(request, pk):
    try: 
        etudiant = Etudiant.objects.get(pk=pk) 
    except etudiant.DoesNotExist: 
        return JsonResponse({'message': 'The etudiant does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        etudiant_serializer = EtudiantSerializer(etudiant) 
        return JsonResponse(etudiant_serializer.data) 
    elif request.method == 'PUT': 
        etudiant_data = JSONParser().parse(request) 
        etudiant_serializer = EtudiantSerializer(etudiant, data=etudiant_data) 
        if etudiant_serializer.is_valid(): 
            etudiant_serializer.save() 
            return JsonResponse(etudiant_serializer.data) 
        return JsonResponse(etudiant_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        etudiant.delete() 
        return JsonResponse({'message': 'etudiant was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
@csrf_exempt
def enseignantApi(request,id=0):
    if request.method =='GET':
        enseignants=Enseignant.objects.all()
        enseignants_serializer = EnseignantSerializer(enseignants,many=True)
        return JsonResponse(enseignants_serializer.data,safe=False)
    elif request.method=='POST':
        enseignant_data=JSONParser().parse(request)
        enseignants_serializer = EnseignantSerializer(data=enseignant_data)
        if enseignants_serializer.is_valid():
            enseignants_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    elif request.method=='PUT':
        enseignant_data = JSONParser().parse(request)
        enseignant=Enseignant.objects.get(idEnseignant=enseignant_data['idEnseignant'])
        enseignants_serializer=EnseignantSerializer(enseignant,data=enseignant_data)
        if enseignants_serializer.is_valid():
            enseignants_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method=='DELETE':
        enseignant=Enseignant.objects.get(idEnseignant=id)
        enseignant.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def enseignant_detail(request, pk):
    try: 
        enseignant = Enseignant.objects.get(pk=pk) 
    except enseignant.DoesNotExist: 
        return JsonResponse({'message': 'The enseignant does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        enseignant_serializer = EnseignantSerializer(enseignant) 
        return JsonResponse(enseignant_serializer.data) 
    elif request.method == 'PUT': 
        enseignant_data = JSONParser().parse(request) 
        enseignant_serializer = EnseignantSerializer(enseignant, data=enseignant_data) 
        if enseignant_serializer.is_valid(): 
            enseignant_serializer.save() 
            return JsonResponse(enseignant_serializer.data) 
        return JsonResponse(enseignant_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        enseignant.delete() 
        return JsonResponse({'message': 'enseignant was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
  
@csrf_exempt
def questionApi(request,id=0):
    if request.method =='GET':
        questions=Question.objects.all()
        questions_serializer = QuestionSerializer(questions,many=True)
        return JsonResponse(questions_serializer.data,safe=False)
    elif request.method=='POST':
        question_data=JSONParser().parse(request)
        questions_serializer = QuestionSerializer(data=question_data)
        if questions_serializer.is_valid():
            questions_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    elif request.method=='PUT':
        question_data = JSONParser().parse(request)
        question=Question.objects.get(idQuestion=question_data['idQuestion'])
        questions_serializer=QuestionSerializer(question,data=question_data)
        if questions_serializer.is_valid():
            questions_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method=='DELETE':
        question=Question.objects.get(idQuestion=id)
        question.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def commentApi(request,id=0):
    if request.method =='GET':
        comments=Comment.objects.all()
        comments_serializer = CommentSerializer(comments,many=True)
        return JsonResponse(comments_serializer.data,safe=False)
    elif request.method=='POST':
        comment_data=JSONParser().parse(request)
        comments_serializer = CommentSerializer(data=comment_data)
        if comments_serializer.is_valid():
            comments_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    elif request.method=='PUT':
        comment_data = JSONParser().parse(request)
        comment=Comment.objects.get(idComment=comment_data['idComment'])
        comments_serializer=CommentSerializer(comment,data=comment_data)
        if comments_serializer.is_valid():
            comments_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method=='DELETE':
        comment=Comment.objects.get(idComment=id)
        comment.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def question_detail(request, pk):
    try: 
        question = Question.objects.get(pk=pk) 
    except question.DoesNotExist: 
        return JsonResponse({'message': 'The question does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        question_serializer = QuestionSerializer(question) 
        return JsonResponse(question_serializer.data) 
 
    elif request.method == 'PUT': 
        question_data = JSONParser().parse(request) 
        question_serializer = QuestionSerializer(question, data=question_data) 
        if question_serializer.is_valid(): 
            question_serializer.save() 
            return JsonResponse(question_serializer.data) 
        return JsonResponse(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        question.delete() 
        return JsonResponse({'message': 'question was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
@csrf_exempt
def comment_detail(request, pk):
    try: 
        comment = Comment.objects.get(pk=pk) 
    except comment.DoesNotExist: 
        return JsonResponse({'message': 'The comment does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        comment_serializer = QuestionSerializer(comment) 
        return JsonResponse(comment_serializer.data) 
 
    elif request.method == 'PUT': 
        comment_data = JSONParser().parse(request) 
        comment_serializer = QuestionSerializer(comment, data=comment_data) 
        if comment_serializer.is_valid(): 
            comment_serializer.save() 
            return JsonResponse(comment_serializer.data) 
        return JsonResponse(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        comment.delete() 
        return JsonResponse({'message': 'comment was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
@csrf_exempt
def messageApi(request,id=0):
    if request.method =='GET':
        messages=Message.objects.all()
        messages_serializer = MessageSerializer(messages,many=True)
        return JsonResponse(messages_serializer.data,safe=False)
    elif request.method=='POST':
        message_data=JSONParser().parse(request)
        messages_serializer = MessageSerializer(data=message_data)
        if messages_serializer.is_valid():
            messages_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    elif request.method=='PUT':
        message_data = JSONParser().parse(request)
        message=Message.objects.get(idMessage=message_data['idMessage'])
        messages_serializer=MessageSerializer(message,data=message_data)
        if messages_serializer.is_valid():
            messages_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method=='DELETE':
        message=Message.objects.get(idMessage=id)
        message.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def message_detail(request, pk):
    try: 
        message = Message.objects.get(pk=pk) 
    except message.DoesNotExist: 
        return JsonResponse({'message': 'The message does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        message_serializer = MessageSerializer(message) 
        return JsonResponse(message_serializer.data) 
    elif request.method == 'PUT': 
        message_data = JSONParser().parse(request) 
        message_serializer = MessageSerializer(message, data=message_data) 
        if message_serializer.is_valid(): 
            message_serializer.save() 
            return JsonResponse(message_serializer.data) 
        return JsonResponse(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        message.delete() 
        return JsonResponse({'message': 'message was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)   

@csrf_exempt
def coursApi(request,id=0):
    if request.method=='GET':
        courses = Courses.objects.all()
        courses_serializer = CoursSerializer(courses, many=True)
        return JsonResponse(courses_serializer.data, safe=False)

    elif request.method=='POST':
        cours_data=JSONParser().parse(request)
        cours_serializer = CoursSerializer(data=cours_data)
        if cours_serializer.is_valid():
            cours_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        cours_data = JSONParser().parse(request)
        cours=Courses.objects.get(CoursId=cours_data['CoursId'])
        cours_serializer=CoursSerializer(cours,data=cours_data)
        if cours_serializer.is_valid():
            cours_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse(cours_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    elif request.method=='DELETE':
        cours=Courses.objects.get(CoursId=id)
        cours.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def course_detail(request, pk):
    try: 
        course = Courses.objects.get(pk=pk) 
    except course.DoesNotExist: 
        return JsonResponse({'message': 'The course does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        course_serializer = CoursSerializer(course) 
        return JsonResponse(course_serializer.data) 
 
    elif request.method == 'PUT': 
        course_data = JSONParser().parse(request) 
        course_serializer = CoursSerializer(course, data=course_data) 
        if course_serializer.is_valid(): 
            course_serializer.save() 
            return JsonResponse(course_serializer.data) 
        return JsonResponse(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        course.delete() 
        return JsonResponse({'message': 'course was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
@csrf_exempt
def SaveFile(request):
    file=request.FILES['uploadedFile']
    file_name = default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)

@csrf_exempt
def exerciceApi(request,id=0):
    if request.method=='GET':
        exercices = Exercices.objects.all()
        exercices_serializer = ExerciceSerializer(exercices, many=True)
        return JsonResponse(exercices_serializer.data, safe=False)

    elif request.method=='POST':
        exercice_data=JSONParser().parse(request)
        exercice_serializer = ExerciceSerializer(data=exercice_data)
        if exercice_serializer.is_valid():
            exercice_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        exercice_data = JSONParser().parse(request)
        exercice=Exercices.objects.get(ExerciceId=exercice_data['ExerciceId'])
        exercice_serializer=ExerciceSerializer(exercice,data=exercice_data)
        if exercice_serializer.is_valid():
            exercice_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse(exercice_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    elif request.method=='DELETE':
        exercice=Exercices.objects.get(ExerciceId=id)
        exercice.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def exercicee_detail(request, pk):
    try: 
        exercicee = Exercices.objects.get(pk=pk) 
    except exercicee.DoesNotExist: 
        return JsonResponse({'message': 'The exercice does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        exercicee_serializer = ExerciceSerializer(exercicee) 
        return JsonResponse(exercicee_serializer.data) 
 
    elif request.method == 'PUT': 
        exercicee_data = JSONParser().parse(request) 
        exercicee_serializer = ExerciceSerializer(exercicee, data=exercicee_data) 
        if exercicee_serializer.is_valid(): 
            exercicee_serializer.save() 
            return JsonResponse(exercicee_serializer.data) 
        return JsonResponse(exercicee_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
       exercicee.delete() 
    return JsonResponse({'message': 'exercice was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
  
@csrf_exempt
def exportcsv(request):
    courses = Courses.objects.all()
    response = HttpResponse('text/csv')
    response['Content-Disposition'] = 'attachment; filename=courses.csv'
    writer = csv.writer(response)
    writer.writerow(['CoursId','CoursName','idEtudiant' , 'CoursDescri', 'CoursLevel',  'CoursDate','PhotoFileName'])
    crs = courses.values_list('CoursId','CoursName', 'idEtudiant', 'CoursDescri', 'CoursLevel','CoursDate','PhotoFileName')
    for std in crs:
        writer.writerow(std)
    return response
# Create your views here.
