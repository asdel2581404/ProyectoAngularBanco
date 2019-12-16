import { Component, OnInit, Input } from '@angular/core';
import {Persona} from '../modelos/persona'

@Component({
  selector: 'app-resumen-cliente',
  templateUrl: './resumen-cliente.component.html',
  styleUrls: ['./resumen-cliente.component.css']
})
export class ResumenClienteComponent implements OnInit {

  @Input()   informacionPersonalCliente:Persona;
  public Nombre =this.informacionPersonalCliente.nombre;



  constructor() { }

  ngOnInit() {

    console.log( this.informacionPersonalCliente)
  }

}
