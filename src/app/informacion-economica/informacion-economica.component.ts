import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ClientesService} from '../clientes.service'

@Component({
  selector: 'app-informacion-economica',
  templateUrl: './informacion-economica.component.html',
  styleUrls: ['./informacion-economica.component.css']
})

export class InformacionEconomicaComponent implements OnInit {
  public formGroup: FormGroup;
  private otroPais:boolean=false;
  constructor(private formBuilder: FormBuilder, protected clientesService:ClientesService ) { }
  
  public Ocupacion:any;
  public GastosMensuales:any;
  public PaisesInfoEconomica:any;

  ngOnInit() {
    this.buildForm();
    this.llenarOcupacion();
    this.llenarGastos();
    this.llenarPaises();
    console.log(this.formGroup.value);
  }

  @Output() public notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  
  public llenarOcupacion(){
    this.clientesService.getOcupacion().subscribe(response => {
      this.Ocupacion=response;
    })}

    public llenarGastos(){
      this.clientesService.getGastos().subscribe(response => {
        this.GastosMensuales=response;

      })
    }

    public llenarPaises(){
      this.clientesService.getPais().subscribe(response => {
        this.PaisesInfoEconomica=response;

      })
    }
    

  private buildForm(){
   this.formGroup = this.formBuilder.group({
     ocupacion:['',Validators.required],
    ciiu:[''],
    ventasAnuales:['',Validators.required],
    totalIngresosMensuales:['', Validators.required],
    paisOrigenIngreson:['',Validators.required],
    gastosMesuales:['',Validators.required],
    activos:['',Validators.required],
    pasivos:['',Validators.required],
    tributarOtroPais:['',Validators.required],
    declaranteRenta:['', Validators.required],
    monedaExtranjera:['',Validators.required]  
   });
   
  }
  public ValidarOtroPais(value){
    
    console.log(value)
      if(value=='si'){
         this.otroPais=true;
      }else
      this.otroPais=false;

  } 

  submit() {
    if (this.formGroup.valid) {
       this.notify.emit(this.formGroup);
    }
    else{
      alert("Llene todo los campos por favor")
    }

  }
}
