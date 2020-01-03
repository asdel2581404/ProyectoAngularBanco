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
  private paisTributo: boolean = false;


  constructor(private formBuilder: FormBuilder, protected clientesService: ClientesService,
    public dialog: MatDialog) { }

  public Ocupacion: any;
  public GastosMensuales: any;
  public PaisesInfoEconomica: any;
  public origenIngresos: any;
  public OcupacionResumen: any;
  public ValidarOcupacion: any;
  public ValidarOrigenIngresos: any;
  public ocupacion: any;

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
      totalMensuales: ['',Validators.required],
      paisOrigenIngresos: ['',[Validators.required,this.validarPaisOrigenIngresos.bind(this)]],
      gastosMensuales: ['',Validators.required],
      activos: ['',Validators.required],
      pasivos: ['',Validators.required],     
      declaranteRenta: [''],
      obligadoTributar: [''],
      paisTributo: [''],
      opeMonedaExtranjera: [''],
      paisOperacion: [''],      
      profesion: [''],
      

    });
  }
                                  
    
   
                                                                               
                                                  
                                                 
 
    
  
                                                                        
  
                                                                        
  validateForm() {

    if (this.formGroup.invalid) {
      this.formGroup.get('ocupacion').markAsTouched();
      this.formGroup.get('ciiu').markAsTouched();
      this.formGroup.get('totalMensuales').markAsTouched();
      this.formGroup.get('activos').markAsTouched();
      this.formGroup.get('pasivos').markAsTouched();
    }
  }


   validarOCupacionControl(controlOcupacion: AbstractControl){
    this.ocupacion=controlOcupacion.value
   
    if (this.ocupacion != null && this.ocupacion != "") {
      console.log(this.ocupacion.prohibido,'this.ocupacion')
     this.ValidarOcupacion = this.ocupacion.prohibido ;
        if ( this.ocupacion.prohibido == true) {
          
          return { valid: true };}
        }
        
    return;
    }

        public LLamarValidarPais(control) { 
      
      return new Promise((resolve,reget)=>{
        
     
        if(control!=""){
          this.clientesService.getValidarPais(control).subscribe(response => {
             response
            return resolve(response)
            
          })
        }
        
      });}
    
    validarPaisOrigenIngresos(controlOrigenIngreso: AbstractControl) {
   
   
     this.LLamarValidarPais(controlOrigenIngreso.value).then(response=>{
      this.ValidarOrigenIngresos=response;
      if (response == true) {
        return { valid: true };
      }else{
        return false
      }
      
  
     })
     
     
    }  
    

  


  public ValidarOtroPais(value) {

    
    if (value == 'si') {
      this.otroPais = true;
      
      console.log(this.PaisesInfoEconomica ,'pasises')
    } else
      this.otroPais = false;


  }
  public ValidarOtroPaisTributa(value) {

    if (value == 'si') {
      this.paisTributo = true;
    } else
      this.paisTributo = false
  }

  submit() {
    
    if (this.ValidarOcupacion == true || this.ValidarOrigenIngresos == true) {
      let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
        data: {body:'Señor usuario hemos encontrado una inhabilidad para poder continuar el proceso, para mas informacion comuniquese al 0180098989',
        id:2
      },
        width: '30%',
        height: '40%',
        disableClose:true
      });
      dialogRef.afterClosed().subscribe(response => {
      })
    }
  
 
   
    if (this.formGroup.valid && this.ValidarOcupacion == false && this.ValidarOrigenIngresos == false ) {
      
      this.ocupacion=this.formGroup.get('ocupacion').value;  
      
      this.modeloInformacionEconomica.ocupacion= this.ocupacion.nombre;    
      this.modeloInformacionEconomica.ciiu= this.formGroup.get('ciiu').value;
      this.modeloInformacionEconomica.ventasAnuales= this.formGroup.get('ventasAnuales').value;      
      this.modeloInformacionEconomica.totalMensuales= this.formGroup.get('totalMensuales').value;
      this.modeloInformacionEconomica.paisOrigenIngresos= this.formGroup.get('paisOrigenIngresos').value;      
      this.modeloInformacionEconomica.gastosMensuales= this.formGroup.get('gastosMensuales').value;
      this.modeloInformacionEconomica.activos= this.formGroup.get('activos').value;      
      this.modeloInformacionEconomica.pasivos= this.formGroup.get('pasivos').value;
      this.modeloInformacionEconomica.declaranteRenta= this.formGroup.get('declaranteRenta').value;      
      this.modeloInformacionEconomica.obligadoTributar= this.formGroup.get('obligadoTributar').value;
      this.modeloInformacionEconomica.paisTributo= this.formGroup.get('paisTributo').value;      
      this.modeloInformacionEconomica.opeMonedaExtranjera= this.formGroup.get('opeMonedaExtranjera').value;
      this.modeloInformacionEconomica.paisOperacion= this.formGroup.get('paisOperacion').value;      
      this.modeloInformacionEconomica.profesion= this.formGroup.get('profesion').value;
  
     
      this.ModeloInformacionEconomica.emit(this.modeloInformacionEconomica);


    }
    else {

    }


  }


}
 


