import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AlertButtonComponent} from './alert-button.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {AlertButtonService} from './alert-button.service';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;

  // test environment for this component and provide access to the component itself
  let fixture: ComponentFixture<AlertButtonComponent>;

  // mocks aka stubs
  let serviceStub: any;

  // renden HTML
  let de: DebugElement;

  beforeEach(async(() => {
    // mock the service
    serviceStub = {
      getMessageAsPromise(): Promise<string> {
        return of('You have been warned from promise stub!').toPromise();
      },
      getMessageAsObservable(): Observable<string> {
        return of('You have been warned from a observable stub!');
      }
    };

    // TestBed is a NGModel for this test environment
    TestBed.configureTestingModule({
      declarations: [AlertButtonComponent],
      providers: [{provide: AlertButtonService, useValue: serviceStub}]
    })
      .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // sample validating properties
  it('should have a message with `warn`', () => {
    expect(component.content).toContain('warn');
  });

  it('should have severity greater tahn 2', () => {
    expect(component.severity).toBeGreaterThan(2);
  });

  // validating the DOM
  it('should have a H1 tag of `Alert Button`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Alert Button');
  });

  // validating a function
  it('should toggle the message boolean', () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  });

  // validating a function async
  it('should toggle the message boolean asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    tick(500);
    expect(component.hideContent).toBeFalsy();
  }));

  // validating response from service
  it('should have message content from promise', async () => {
    await component.load();
    expect(component.content).toContain('stub');
  });


  // validating response from a observable
  it('it should have message content from observable', () => {
    component.loadWithObservable();
    expect(component.content).toBeDefined();
    expect(component.content).toContain('observable');
  });

  // validating a private variable
  it('it should be a secret private variable', () => {
    expect(component['topSecret']).toContain('secret');
  });

  // validating if a private method was called
  it('it should call a private function', () => {
    const privateSpy = spyOn<any>(component, 'secretFunction');
    component.somePublicMethod();
    expect(privateSpy).toHaveBeenCalled();
  });

});
