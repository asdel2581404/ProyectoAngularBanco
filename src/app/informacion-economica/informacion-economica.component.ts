import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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


  ngOnInit() {
    this.buildForm();
    this.llenarOcupacion();
    this.llenarGastos();
    this.llenarPaises();
    
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
      ocupacion: ['',Validators.required],
      ciiu: [''],
      ventasAnuales: ['',Validators.required],
      totalIngresosMensuales: ['',Validators.required],
      paisOrigenIngreson: ['',Validators.required],
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
   this.ValidarPaisOrigen()
    console.log(this.origenIngresos)
    if (this.formGroup.valid && this.origenIngresos == false && this.formGroup.get('ocupacion').value == 'false') {
      this.notify.emit(this.formGroup);
      this.ModeloInformacionEconomica.emit(this.formGroup.value)

    }
    else {

    }


  }


  ValidarPaisOrigen() {


    this.clientesService.getValidarPais(this.formGroup.get('paisOrigenIngreson').value).subscribe(response => {
      this.origenIngresos = response;
      console.log(this.origenIngresos)
      if (this.origenIngresos != false ) {

        let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
        data: 'Señor usuario con fines de validar  información adicional usted no puede continuar con la vinculación digitalmente, puede dirigirse a una sucursal fisica o comunicate al 0180009292 para mas información',
        width: '30%',
        height: '30%'
        
        });
        dialogRef.afterClosed().subscribe(response => {
          console.log(response);
        })

      }

    })

  }


  llenarOcupacionPorId() {
    this.clientesService.getValidarOcupacionResumen(this.formGroup.get('ocupacion').value).subscribe(response => {
      this.OcupacionResumen=response;
      return this.OcupacionResumen;
    })
  }

  validarOcupacion() {
    
   
    if (this.formGroup.get('ocupacion').value == 'true') {

     
      let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
        data: 'Señor usuario con fines de validar  información adicional usted no puede continuar con la vinculación digitalmente, puede dirigirse a una sucursal fisica o comunicate al 0180009292 para mas información',
        width: '30%',
        height: '30%'
      });
      dialogRef.afterClosed().subscribe(response => {
        
      })

    }
  }

}
