import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarCedulaControlComponent } from './validar-cedula-control.component';

describe('ValidarCedulaControlComponent', () => {
  let component: ValidarCedulaControlComponent;
  let fixture: ComponentFixture<ValidarCedulaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarCedulaControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCedulaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
