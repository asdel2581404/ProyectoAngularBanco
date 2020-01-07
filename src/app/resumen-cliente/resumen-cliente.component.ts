import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Persona} from '../modelos/persona'
import {Residencia} from '../modelos/residencia'
import {Economica} from '../modelos/economica'
import { ClientesService } from '../clientes.service'
import { ValidarCedulaControlComponent } from '../validar-cedula-control/validar-cedula-control.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-resumen-cliente',
  templateUrl: './resumen-cliente.component.html',
  styleUrls: ['./resumen-cliente.component.css']
})
export class ResumenClienteComponent implements OnInit,OnChanges {
  public departamento:any;
  public ciudad:any;
  public pais:any;
  public paisOrigenIngresos:any;
  public nombreCiudad: String;
  public nombreDepartamento:String;
  public nombrePais:String;
  public nombrePaisOrigenIngresos:String;
  public EnvioInformacioResidencia:Residencia;
  @Input()   informacionPersonalCliente:Persona;
  @Input()   informacionResidenciaCliente:Residencia;
  @Input()   informacionEconomicaCliente:Economica;
  
  @Input()    idCiudadRecibe:Number;


  constructor(protected clientesService: ClientesService , public dialog: MatDialog) { }
  ngOnChanges() {
    console.log('hola 42')
  }
  ngOnInit() {
    
    
  
this.llenarCiudadResumen( )
   
  }

  public llenarCiudadResumen( ) {


    this.clientesService.getValidarCiudad(this.informacionResidenciaCliente.idciudad).subscribe(response=>{
      this.ciudad=response;
      this.nombreCiudad= this.ciudad.nombre;
      this.llenarDepartamentoResumaen();
      
    })
    
  }


  public llenarDepartamentoResumaen(){
    this.clientesService.getValidarDepartamento(this.ciudad.idDepartamento).subscribe(response => {
      this.departamento = response;
      this.nombreDepartamento=this.departamento.nombre;
      this.llenarPaisResumen();
    })
  }

  public llenarPaisResumen(){
    this.clientesService.getValidarPaisResumen(this.departamento.idPais).subscribe(response=>{
      this.pais=response;
      this.nombrePais=this.pais.nombre;
      this.llenarPaisOrigenIngresosResusmen();
    })
  }

  public llenarPaisOrigenIngresosResusmen(){
    console.log(this.informacionEconomicaCliente.paisOrigenIngresos)
    this.clientesService.getValidarPaisResumen(this.informacionEconomicaCliente.paisOrigenIngresos).subscribe(response=>{
      this.paisOrigenIngresos=response;
      this.nombrePaisOrigenIngresos=this.paisOrigenIngresos.nombre;

    })
  }
 
  GuardarInformacionPersonalCliente(){
       
        this.clientesService.postGuardarCliente(this.informacionPersonalCliente).subscribe(response =>{
          
         this.GuardarInformacionPersonalResidencia()
         this.guardarInformacionPersonalEconomica()

         let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
          data: {id:1,
            body:'VINCULACIÓN EXITOSA'},
          width: '30%',
          height: '40%',
          disableClose:true
         
        });
        dialogRef.afterClosed().subscribe(response => {
        })
       
        })

  }

  GuardarInformacionPersonalResidencia(){
    this.clientesService.postGuardarClienteResidencia(this.informacionResidenciaCliente).subscribe(respose=>{
      console.log(respose);
    })
    
  }

  guardarInformacionPersonalEconomica(){

    console.log(this.informacionEconomicaCliente);
    this.informacionEconomicaCliente.idCliente= this.informacionPersonalCliente.cedula;
    console.log(this.informacionEconomicaCliente , 'completo')
    this.clientesService.postGuardarClienteEconomica(this.informacionEconomicaCliente).subscribe(response => {
     
    })

  }

  
}


