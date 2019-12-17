import { Component, OnInit, Input } from '@angular/core';
import {Persona} from '../modelos/persona'
import {Residencia} from '../modelos/residencia'
import {Economica} from '../modelos/economica'

@Component({
  selector: 'app-resumen-cliente',
  templateUrl: './resumen-cliente.component.html',
  styleUrls: ['./resumen-cliente.component.css']
})
export class ResumenClienteComponent implements OnInit {

  @Input()   informacionPersonalCliente:Persona;
  @Input()   informacionResidenciaCliente:Residencia;
  @Input()   informacionEconomicaCliente:Economica;
  



  constructor() { }

  ngOnInit() {

   
  }

 

}
