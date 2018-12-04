import {Injectable} from '@angular/core';
import {Complaint, ShopServiceRequest} from '../types';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllComplaints(): Observable<Array<Complaint>> {
    return this.http.get<Array<Complaint>>(BACKEND_URL + 'complaints', {headers: this.httpHeaders});
  }

  fetchOneComplaint(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(BACKEND_URL + 'complaints/' + id, {headers: this.httpHeaders});
  }

  addOneComplaint(request: ShopServiceRequest): Observable<Complaint> {
    return this.http.post<Complaint>(BACKEND_URL + 'complaints', request, {headers: this.httpHeaders});
  }

  updateComplaintStatus(status: string, id: number): Observable<Complaint> {
    return this.http.put<Complaint>(BACKEND_URL + 'complaints/' + id, status, {headers: this.httpHeaders});
  }

  updateComplaintResolution(resolution: string, id: number): Observable<Complaint> {
    return this.http.put<Complaint>(BACKEND_URL + 'complaints/' + id + '/resolution', resolution,
      {headers: this.httpHeaders});
  }
}
