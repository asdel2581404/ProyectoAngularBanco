import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,  AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ValidarCedulaControlComponent } from '../validar-cedula-control/validar-cedula-control.component';
import { ClientesService } from '../clientes.service'
import { Economica } from '../modelos/economica'

@Component({
  selector: 'app-informacion-economica',
  templateUrl: './informacion-economica.component.html',
  styleUrls: ['./informacion-economica.component.css']
})

export class InformacionEconomicaComponent implements OnInit {
  public formGroup: FormGroup;
  public modeloInformacionEconomica = new Economica();
  private otroPais: boolean = false;
  private otroPaisTributa: boolean = false;


  constructor(private formBuilder: FormBuilder, protected clientesService: ClientesService,
    public dialog: MatDialog) { }

  public Ocupacion: any;
  public GastosMensuales: any;
  public PaisesInfoEconomica: any;
  public origenIngresos: any;
  public OcupacionResumen: any;
  public ValidarOcupacion: any;
  public ValidarOrigenIngresos: any;
  

  ngOnInit() {
    this.buildForm();
    this.llenarOcupacion();
    this.llenarGastos();
    this.llenarPaises();
    setTimeout(() => {
      this.notify.emit(this.formGroup);
    });
    
  }

  @Output() public notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output() public ModeloInformacionEconomica: EventEmitter<Economica> = new EventEmitter<Economica>();


  public llenarOcupacion() {
    this.clientesService.getOcupacion().subscribe(response => {
      this.Ocupacion = response;
    })
  }

  public llenarGastos() {

    this.clientesService.getGastos().subscribe(response => {
      this.GastosMensuales = response;

    })
  }

  public llenarPaises() {
    this.clientesService.getPais().subscribe(response => {
      this.PaisesInfoEconomica = response;


    })
  }

  
  llenarOcupacionPorId() {
    this.clientesService.getValidarOcupacionResumen(this.formGroup.get('ocupacion').value).subscribe(response => {
      this.OcupacionResumen=response;
      return this.OcupacionResumen;
    })
  }


  private buildForm() {
    this.formGroup = this.formBuilder.group({
      ocupacion: ['',[Validators.required,this.validarOCupacionControl.bind(this)]],
      ciiu: [''],
      ventasAnuales: ['',Validators.required],
      totalIngresosMensuales: ['',Validators.required],
      paisOrigenIngreson: ['',[Validators.required,this.validarPaisOrigenIngresos.bind(this)]],
      gastosMesuales: ['',Validators.required],
      activos: ['',Validators.required],
      pasivos: ['',Validators.required],
      tributarOtroPais: [''],
      declaranteRenta: [''],
      monedaExtranjera: [''],
      paisMonedaExtranjera: [''],
      otroPaisTributa: [''],
      profesion: [''],

    });

  }

  validateForm() {

    if (this.formGroup.invalid) {
      this.formGroup.get('ocupacion').markAsTouched();
      this.formGroup.get('ciiu').markAsTouched();
      this.formGroup.get('totalIngresosMensuales').markAsTouched();
      this.formGroup.get('activos').markAsTouched();
      this.formGroup.get('pasivos').markAsTouched();


    }

  }


   validarOCupacionControl(controlOcupacion: AbstractControl){

    console.log(controlOcupacion.value, 'prueba')
    if (controlOcupacion.value != null && controlOcupacion.value != "") {
     this.ValidarOcupacion = controlOcupacion.value ;
        if ( controlOcupacion.value == 'true') {
          console.log('el formulario es falso')
          return { valid: true };}
      
        }
        console.log(controlOcupacion.value ,"aaa")
    return;
    }

      LLamarValidarPais(value){
        if (value != null && value != "") {
          this.clientesService.getValidarPais(value).subscribe(response => {
            this.ValidarOrigenIngresos = response
            if(this.ValidarOrigenIngresos==true){
              origendeIngresos=true;
            }
          })
        }
      }
    
    validarPaisOrigenIngresos(controlOrigenIngreso: AbstractControl) {
        
      console.log(controlOrigenIngreso.value)
      this.LLamarValidarPais(controlOrigenIngreso.value)
     
      if (this.ValidarOrigenIngresos == true) {
        return { valid: true };
      } else {
        return;
      }
  
    }  
    

  


  public ValidarOtroPais(value) {

   
    if (value == 'si') {
      this.otroPais = true;

    } else
      this.otroPais = false;


  }
  public ValidarOtroPaisTributa(value) {

    if (value == 'si') {
      this.otroPaisTributa = true;
    } else
      this.otroPaisTributa = false
  }

  submit() {
    
   
    if (this.ValidarOcupacion == 'true' || this.ValidarOrigenIngresos == true) {
      let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
        data: 'Señor usuario hemos encontrado una inhabilidad para poder continuar el proceso, para mas informacion comuniquese al 0180098989',
        width: '30%',
        height: '30%'
      });
      dialogRef.afterClosed().subscribe(response => {
      })
    }
    
    
    console.log(this.formGroup.controls["ocupacion"].invalid, 'hola8');
    if (this.formGroup.valid && this.ValidarOcupacion == 'false' && this.ValidarOrigenIngresos == false ) {
     
      this.ModeloInformacionEconomica.emit(this.formGroup.value)

    }
    else {

    }


  }



 

}
