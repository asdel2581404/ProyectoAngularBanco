import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Persona} from '../modelos/persona'
import {Residencia} from '../modelos/residencia'
import {Economica} from '../modelos/economica'
import { ClientesService } from '../clientes.service'


@Component({
  selector: 'app-resumen-cliente',
  templateUrl: './resumen-cliente.component.html',
  styleUrls: ['./resumen-cliente.component.css']
})
export class ResumenClienteComponent implements OnInit,OnChanges {
  public departamento:any;
  public ciudad:any;
  public pais:any;
  public nombreCiudad: String;
  public nombreDepartamento:String;
  public nombrePais:String;
  public EnvioInformacioResidencia:Residencia;
  @Input()   informacionPersonalCliente:Persona;
  @Input()   informacionResidenciaCliente:Residencia;
  @Input()   informacionEconomicaCliente:Economica;
  
  @Input()    idCiudadRecibe:Number;


  constructor(protected clientesService: ClientesService) { }
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
    })
  }
 
  GuardarInformacionPersonalCliente(){
        console.log(this.informacionPersonalCliente);
        console.log(this.informacionEconomicaCliente);
        console.log(this.informacionResidenciaCliente);
        this.clientesService.postGuardarCliente(this.informacionPersonalCliente).subscribe(response =>{
          console.log(response);
         this.GuardarInformacionPersonalResidencia()
         this.guardarInformacionPersonalEconomica()
          alert('Vinculacion Exitosa');
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
      console.log(response);
    })

  }

  
}


