import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AlertButtonComponent} from './alert-button.component';
import {DebugElement} from '@angular/core';
import {of} from 'rxjs';
import {AlertButtonService} from './alert-button.service';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;

  // test environment for this component and provide access to the component itself
  let fixture: ComponentFixture<AlertButtonComponent>;

  // renden HTML
  let de: DebugElement;

  let service: AlertButtonService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {

    // TestBed is a NGModel for this test environment
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AlertButtonComponent],
      providers: [AlertButtonService]
    })
      .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = de.injector.get(AlertButtonService);
    spy = spyOn(service, 'getMessageAsPromise').and.returnValue(of<string>('from spy').toPromise());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // sample validating properties
  it('should have a message with `warn`', () => {
    expect(component.content).toContain('warn');
  });

  // validating a function async
  it('should toggle the message boolean asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    tick(500);
    expect(component.hideContent).toBeFalsy();
  }));

  // validating response from a observable
  // mark test to be ignored xit
  xit('it should have message content from observable', () => {
    spy = spyOn(service, 'getMessageAsObservable').and.returnValue(of<string>('from spy obs'));
    component.loadWithObservable();
    component.loadWithObservable(); // will fail
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.content).toBeDefined();
    expect(component.content).toBe('from spy obs');
  });

  // validating response from a promise with spy
  it('it should have message content from promise', async () => {
    await component.load();
    expect(spy).toHaveBeenCalled();
    expect(component.content).toBeDefined();
    expect(component.content).toContain('from spy');

    fixture.detectChanges();
    expect(de.query(By.css('#content')).nativeElement.innerText).toContain('spy');
  });

  // validating a expected exception
  it('should fail', () => {
    expect(component.notImplemented).toThrowError('Sorry not implemented yet :(');
  });
});
