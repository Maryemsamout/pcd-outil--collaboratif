import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formation} from '../model/formation';
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private ID= new BehaviorSubject<number>(0);
  currentID=this.ID.asObservable();

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8000/etudiants/';
  private UrlQ = 'http://localhost:8000/questions/';
  private UrlC = 'http://localhost:8000/comments/';
  private UrlM = 'http://localhost:8000/messages/';
  public photoUrl = 'http://localhost:8000/media/';
  public Url = 'http://localhost:8000/';
  public APIUrl= 'http://localhost:8000/cours/';
  public Urlf= 'http://localhost:8000/formation/'
 
  changeID(id:number){
     this.ID.next(id)
  }
  getEtudiant(): Observable<any>{
    return this.http.get<[]>(this.baseUrl, headerOption);
  }
  getEt(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`)
  }
  getEtu(id:any): Observable<any>{
    return this.http.get(this.baseUrl+id)
  }
  updateEtu(id:any, data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}`, data);
  }


  addEtudiant(obj:any): Observable<any>{
    return this.http.post(this.baseUrl , obj);

  }
  //service Cours
  getCours(id:any): Observable<any>{
    return this.http.get(`${this.APIUrl}${id}`)
  }

getCoursList():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl);
}
addCours(val:any){
  return this.http.post(this.APIUrl,val);
}
updateCours( id:any,val:any){
  return this.http.put(this.APIUrl + `${id}`,val);
}
deleteCours(val:any){
  return this.http.delete(this.APIUrl+val);
}
deleteCrs(id:any): Observable<any>{
  return this.http.delete(this.UrlQ + id);
}

UploadPhoto(val:any){
  return this.http.post(this.Url+'/SaveFile',val);
}
downloadFile(docFile: string): Observable < Blob > {
  return this.http.get(this.photoUrl +  docFile, {
      responseType: 'blob'
  });
}
//service Exercice
getExercice(id:any): Observable<any>{
  return this.http.get(`${this.APIUrl}${id}`)
}

getExerciceList():Observable<any[]>{
return this.http.get<any[]>(this.APIUrl);
}
addExercice(val:any){
return this.http.post(this.APIUrl,val);
}
updateExercice( id:any,val:any){
return this.http.put(this.APIUrl + `${id}`,val);
}
deleteExercice(val:any){
return this.http.delete(this.APIUrl+val);
}
deleteExe(id:any): Observable<any>{
return this.http.delete(this.UrlQ + id);
}




  //service question
  getQuestion(): Observable<any>{
    return this.http.get<[]>(this.UrlQ, headerOption);
  }
  get(id:any): Observable<any>{
    return this.http.get(`${this.UrlQ}${id}`)
  }

  addQuestion(obj:any): Observable<any>{
    return this.http.post(this.UrlQ , obj);

  }
  deleteQuestion(id:any): Observable<any>{
      return this.http.delete(this.UrlQ + id);
  }
  updateQs(id:any, data:any): Observable<any> {
    return this.http.put(`${this.UrlQ}${id}`, data);
  }

  //service comments
  getComment(): Observable<any>{
    return this.http.get<[]>(this.UrlC, headerOption);
  }

  addcomment(obj:any): Observable<any>{
    return this.http.post(this.UrlC , obj);

  }
  getC(id:any): Observable<any>{
    return this.http.get(`${this.UrlC}${id}`)
  }

  deleteComment(id:any): Observable<any>{
    return this.http.delete(this.UrlC + id);
  }

  //service message
  getMessage(): Observable<any>{
    return this.http.get<[]>(this.UrlM, headerOption);
  }
  updateMsg(id:any, data:any): Observable<any> {
    return this.http.put(`${this.UrlM}${id}`, data);
  }

  addMessage(obj:any): Observable<any>{
    return this.http.post(this.UrlM , obj);

  }
  getM(id:any): Observable<any>{
    return this.http.get(`${this.UrlM}${id}`)
  }

  deleteMessage(id:any): Observable<any>{
    return this.http.delete(this.UrlM + id);
  }

  // //service photo
  // UploadPhoto(val:any){
  //    return this.http.post(this.Url+'SaveFile',val)
  // }
//service formation
getFormation(id: number): Observable<Object> {
  return this.http.get(`${this.Urlf}/${id}`);
}

createFormation(obj:any): Observable<any> {
  return this.http.post(`${this.Urlf}/`,obj);
}

updateFormation(id: number, value: any): Observable<Object> {
  return this.http.put(`${this.Urlf}/${id}`, value);
}

deleteFormation(id: number): Observable<any> {
  return this.http.delete(`${this.Urlf}/${id}`);
}

getFormationsList(): Observable<any> {
  return this.http.get(`${this.Urlf}`);
}

getFormationsByAge(val: string): Observable<any> {
  return this.http.get(`${this.Urlf}/FormationName/${val}`);
}

deletefAll(): Observable<any> {
  return this.http.delete(`${this.Urlf}/`);
}
}
