import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenClienteComponent } from './resumen-cliente.component';

describe('ResumenClienteComponent', () => {
  let component: ResumenClienteComponent;
  let fixture: ComponentFixture<ResumenClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
