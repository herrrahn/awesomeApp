import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertButtonService {

  constructor(private http: HttpClient) {
  }

  getMessage(): Promise<string> {
    return this.http.get<string>('./assets/message.json').toPromise();
  }
}
