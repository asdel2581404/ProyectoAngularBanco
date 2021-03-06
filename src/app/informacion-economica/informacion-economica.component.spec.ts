import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionEconomicaComponent } from './informacion-economica.component';

describe('InformacionEconomicaComponent', () => {
  let component: InformacionEconomicaComponent;
  let fixture: ComponentFixture<InformacionEconomicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionEconomicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionEconomicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
