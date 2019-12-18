import { Component, OnInit, Input } from '@angular/core';
import {Persona} from '../modelos/persona'
import {Residencia} from '../modelos/residencia'
import {Economica} from '../modelos/economica'
import { ClientesService } from '../clientes.service'

@Component({
  selector: 'app-resumen-cliente',
  templateUrl: './resumen-cliente.component.html',
  styleUrls: ['./resumen-cliente.component.css']
})
export class ResumenClienteComponent implements OnInit {
  public departamento:any;
  public ciudad:any;
  public pais:any;
  public nombreCiudad: String;
  public nombreDepartamento:String;
  public nombrePais:String;

  @Input()   informacionPersonalCliente:Persona;
  @Input()   informacionResidenciaCliente:Residencia;
  @Input()   informacionEconomicaCliente:Economica;
  
  @Input()    idCiudadRecibe:Number;


  constructor(protected clientesService: ClientesService) { }

  ngOnInit() {
    
    
  
this.llenarCiudadResumen( )
   
  }

  public llenarCiudadResumen( ) {


    this.clientesService.getValidarCiudad(this.informacionResidenciaCliente.idCiudad).subscribe(response=>{
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

  GuardarInformacion(){
      alert('SU VINCULACIÓN FUE EXITOSA');
      location.reload();
      

  }

  
}
