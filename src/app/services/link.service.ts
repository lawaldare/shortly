import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LinkService {

  BASE_URL = environment.base_url;

  constructor(private http: HttpClient) { }


  sendLink(link: string) {
    return this.http.post(this.BASE_URL, { "url": link }, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }
}
