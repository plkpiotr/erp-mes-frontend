import {Injectable} from '@angular/core';
import {Complaint, ComplaintStatus, Resolution, ShopServiceRequest} from '../types';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllComplaints(): Observable<Array<Complaint>> {
    return this.http.get<Array<Complaint>>('http://localhost:8080/complaints', {headers: this.httpHeaders});
  }

  fetchOneComplaint(id: number): Observable<Complaint> {
    return this.http.get<Complaint>('http://localhost:8080/complaints/' + id, {headers: this.httpHeaders});
  }

  addOneComplaint(request: ShopServiceRequest): Observable<Complaint> {
    return this.http.post<Complaint>('http://localhost:8080/complaints', request, {headers: this.httpHeaders});
  }

  updateComplaintStatus(status: string, id: number): Observable<Complaint> {
    return this.http.put<Complaint>('http://localhost:8080/complaints/' + id, status, {headers: this.httpHeaders});
  }

  updateComplaintResolution(resolution: string, id: number): Observable<Complaint> {
    return this.http.put<Complaint>('http://localhost:8080/complaints/' + id + '/resolution', resolution,
      {headers: this.httpHeaders});
  }
}
