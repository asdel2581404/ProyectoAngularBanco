import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-informacion-economica',
  templateUrl: './informacion-economica.component.html',
  styleUrls: ['./informacion-economica.component.css']
})
export class InformacionEconomicaComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  
  ngOnInit() {
    this.buildForm();
    console.log(this.formGroup.value);
  }
  private buildForm(){
   this.formGroup = this.formBuilder.group({
     ocupacion:[''],
    ciiu:[''],
    ventasAnuales:[''],
    totalIngresosMensuales:[''],
    paisOrigenIngreson:[''],
    gastosMesuales:[''],
    activos:[''],
    pasivos:[''],
    tributarOtroPais:[''],
    declaranteRenta:[''],
    monedaExtranjera:['']  
   });
   
  }

}
