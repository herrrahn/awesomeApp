import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AlertButtonService} from './alert-button.service';
import {of} from 'rxjs';

describe('alert-button.service', () => {

  let service: AlertButtonService;
  // to Provide Http Data
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // mock the HttpClient
        HttpClientTestingModule,
      ],
      providers: [
        AlertButtonService,
      ],
    });

    service = TestBed.get(AlertButtonService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding.
    // If any requests are outstanding, fail with an error message indicating which requests were not handled.
    httpMock.verify();
  })

  it('should return message from via GET OBSERVABLE',  () => {
    service.getMessageAsObservable().subscribe( message => {
      expect(message).toContain('test message');
    });

    const request = httpMock.expectOne('./assets/message.json');
    expect(request.request.method).toBe('GET');
    request.flush('test message');
  });

  it('should return message from via GET PROMISE',  (done) => {
    service.getMessageAsPromise().then( message => {
      expect(message).toContain('test message');
      done();
    });

    const request = httpMock.expectOne('./assets/message.json');
    expect(request.request.method).toBe('GET');
    request.flush(of<string>('test message').toPromise());
  });

});
