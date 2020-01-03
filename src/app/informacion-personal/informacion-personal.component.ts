import { Component, OnInit, EventEmitter, Output, AfterContentInit ,OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { MatDialog } from '@angular/material';
import { ValidarCedulaControlComponent } from '../validar-cedula-control/validar-cedula-control.component';
import { Persona } from '../modelos/persona';
import { Residencia } from '../modelos/residencia';
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit,OnChanges {
  
  
  
  ngOnChanges() {
    console.log('hola 42')
  }
  public modeloInformacionPersonal = new Persona();
  public modeloInformacionResidencia = new Residencia();
  public formGroup: FormGroup;
  public formGroup2: FormGroup;

  constructor(private formBuilder: FormBuilder, protected clientesService: ClientesService,
    public dialog: MatDialog) {

  }



  public estadoCivil: any;
  public genero: any;
  public Direcciones: any;
  public Pais: any;
  public Departamento: any;
  public Ciudad: any;
  public ValidarDelitos: any;

  
  ngOnInit() {
    this.buildForm();
    this.llenarEstadoCivil();
    this.LlenarGenero();
    this.LlenarDireccion();
    this.LlenarPais();
    setTimeout(() => {
      this.notify.emit(this.formGroup);
      
    });

    
  }
 
  @Output() public notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public idCiudad: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() public cedula: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() public ModeloInformacionPersonal: EventEmitter<Persona> = new EventEmitter<Persona>();
  @Output() public ModeloInformacionResidencia: EventEmitter<Residencia> = new EventEmitter<Residencia>();
  public llenarEstadoCivil() {
    this.clientesService.getUsers().subscribe(response => {
      this.estadoCivil = response;
    })
  }

  validarCedulaControl(control: AbstractControl) {
    
    
    if (control.value != null && control.value != "") {
      this.clientesService.getValidarCedula(control.value).subscribe(response => {
       this.ValidarDelitos = response
       
       
      })
    }
    
    if (this.ValidarDelitos== true) {
      return { valid: true };
    } else {
      return;
    }

  }

  public LlenarGenero() {
    this.clientesService.getGenero().subscribe(response => {
      this.genero = response;
    })
  }

  public LlenarDireccion() {
    this.clientesService.getDirecciones().subscribe(response => {
      this.Direcciones = response;
    })
  }
  public LlenarPais() {

    this.clientesService.getPais().subscribe(response => {
      this.Pais = response;
    })


  }
  public LlenarDepartamento() {

    if (this.formGroup2.get('pais').value != null && this.formGroup2.get('pais').value != "") {
      this.clientesService.getDepartamentos(this.formGroup2.get('pais').value).subscribe(response => {
        this.Departamento = response;
        this.LlenarCiudad();
      })

    }

  }

  public LlenarCiudad() {

    if (this.formGroup2.get('departamento').value != null && this.formGroup2.get('departamento').value != "") {
      this.clientesService.getCiudad(this.formGroup2.get('departamento').value).subscribe(response => {
        this.Ciudad = response;
      })
    }

  }




  private buildForm() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', [Validators.required, this.validarCedulaControl.bind(this)]],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      genero: ['', Validators.required],
      estadocivil: ['', Validators.required],
      Residecia: this.formGroup2 = this.formBuilder.group({
        pais: ['', Validators.required],
        departamento: ['', Validators.required],
        idciudad: ['', Validators.required],
        nomenclatura: [''],
        numeroinicial: [''],
        numerosecundario: ['']
      })
    });
    

  }





  validateForm() {
    if (this.formGroup.invalid) {
      this.formGroup.get('nombre').markAsTouched();
      this.formGroup.get('apellido').markAsTouched();
      this.formGroup.get('cedula').markAsTouched();
      this.formGroup.get('celular').markAsTouched();
      this.formGroup.get('genero').markAsTouched();


    }

  }

  submit() {
   

    if (this.ValidarDelitos == true) {
      let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
        data: {id:1,
          body:'Señor usuario hemos encontrado una inhabilidad para poder continuar el proceso, para mas informacion comuniquese al 0180098989'},
        width: '30%',
        height: '40%',
        disableClose:true
       
      });
      dialogRef.afterClosed().subscribe(response => {
      })
    }

    
    
    console.log(this.formGroup2.valid)
    if (this.formGroup2.valid && this.formGroup.valid && this.ValidarDelitos == false) {
   
      this.ModeloInformacionPersonal.emit(this.formGroup.value)
      this.modeloInformacionResidencia.nomenclatura = this.formGroup2.get('nomenclatura').value;
      this.modeloInformacionResidencia.numeroinicial = this.formGroup2.get('numeroinicial').value;
      this.modeloInformacionResidencia.numerosecundario = this.formGroup2.get('numerosecundario').value;
      this.modeloInformacionResidencia.idclientes = this.formGroup.get('cedula').value;

      this.modeloInformacionResidencia.idciudad=parseInt( this.formGroup2.get('idciudad').value);
      
      this.ModeloInformacionResidencia.emit(this.modeloInformacionResidencia)

      

    }
    else {
      

    }

  }



}


