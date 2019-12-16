import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ValidarCedulaControlComponent } from '../validar-cedula-control/validar-cedula-control.component';
import { ClientesService } from '../clientes.service'
import {Economica} from '../modelos/economica'

@Component({
  selector: 'app-informacion-economica',
  templateUrl: './informacion-economica.component.html',
  styleUrls: ['./informacion-economica.component.css']
})

export class InformacionEconomicaComponent implements OnInit {
  public formGroup: FormGroup;
  public modeloInformacionEconomica= new Economica();
  private otroPais: boolean = false;
  private otroPaisTributa: boolean = false;

  constructor(private formBuilder: FormBuilder, protected clientesService: ClientesService,
    public dialog: MatDialog) { }

  public Ocupacion: any;
  public GastosMensuales: any;
  public PaisesInfoEconomica: any;
  public origenIngresos: any;


  ngOnInit() {
    this.buildForm();
    this.llenarOcupacion();
    this.llenarGastos();
    this.llenarPaises();
    console.log(this.formGroup.value);
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

  
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      ocupacion: ['', Validators.required],
      ciiu: [''],
      ventasAnuales: ['', Validators.required],
      totalIngresosMensuales: ['', Validators.required],
      paisOrigenIngreson: ['', Validators.required],
      gastosMesuales: ['', Validators.required],
      activos: ['', Validators.required],
      pasivos: [''],
      tributarOtroPais: ['', Validators.required],
      declaranteRenta: ['', Validators.required],
      monedaExtranjera: ['', Validators.required],
      paisMonedaExtranjera: [''],
      otroPaisTributa: [''],
      profesion:[''],

    });

  }
  public ValidarOtroPais(value) {

    console.log(value)
    if (value == 'si') {
      this.otroPais = true;
      
    } else
      this.otroPais = false;
    

  }
  public ValidarOtroPaisTributa(value) {

    console.log(value)
    if (value == 'si') {
      this.otroPaisTributa = true;
    } else
      this.otroPaisTributa = false
  }

  submit() {
    if (this.formGroup.valid && this.origenIngresos == false && this.formGroup.get('ocupacion').value == 'false' ) {
      this.notify.emit(this.formGroup);
      this.ModeloInformacionEconomica.emit(this.formGroup.value)
      
    }
    else {
      alert("Llene todo los campos por favor")
    }

  }


  ValidarPaisOrigen() {


    this.clientesService.getValidarPais(this.formGroup.get('paisOrigenIngreson').value).subscribe(response => {
      this.origenIngresos = response;

      if (this.origenIngresos != false) {

        let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
          data: 'Señor usuario con fines de validar una informacion adicional usted no puede continuar con la vinculacion digitalmente dirigase a una sucursal fisica o comunicate al 0180009292 para mas información',
          width: '30%',
          height: '30%'
        });
        dialogRef.afterClosed().subscribe(response => {
          console.log(response);
        })

      }

    })

  }

  validarOcupacion(){
   
    console.log(this.formGroup.get('ocupacion').value);
   if(this.formGroup.get('ocupacion').value == 'true'){

    console.log(this.formGroup.get('ocupacion').value);
    let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
      data: 'PRUEBA',
      width: '30%',
      height: '30%'
    });
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    })

   }
  }

}
