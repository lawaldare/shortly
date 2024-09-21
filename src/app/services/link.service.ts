import { environment } from "./../../environments/environment";
import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LinkService {
  private readonly BASE_URL = "https://tinyurl.com/api-create.php?url=";
  private readonly http = inject(HttpClient);

  public shorten(link: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      responseType: "text",
    };
    return this.http
      .post(`${this.BASE_URL}${encodeURIComponent(link)}`, httpOptions)
      .pipe(
        map((response) => response.toString()),
        catchError((error) => of(error))
      );
  }

  // private headers = new HttpHeaders({'Content-Type': 'application/json'});

  // constructor(private http: HttpClient) {
  // }

  // shorten(url: string, alias?: string): Observable<string> {
  //   let extras = '';
  //   if (alias) {
  //     extras = `&alias=${encodeURIComponent(alias)}`;
  //   }
  //   return this.http.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url) + extras, {
  //     headers: this.headers,
  //     responseType: 'text'
  //   }).pipe(
  //     map(res => res.toString())
  //   );
  // }
}
