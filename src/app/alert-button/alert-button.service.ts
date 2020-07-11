import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertButtonService {

  constructor(private http: HttpClient) {
  }

  getMessageAsPromise(): Promise<string> {
    return this.http.get<string>('./assets/message.json').toPromise();
  }

  getMessageAsObservable(): Observable<string> {
    return this.http.get<string>('./assets/message.json');
    // return of('You have been warned from a real observable!');
  }
}
