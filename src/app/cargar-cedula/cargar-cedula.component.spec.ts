import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCedulaComponent } from './cargar-cedula.component';

describe('CargarCedulaComponent', () => {
  let component: CargarCedulaComponent;
  let fixture: ComponentFixture<CargarCedulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarCedulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarCedulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
