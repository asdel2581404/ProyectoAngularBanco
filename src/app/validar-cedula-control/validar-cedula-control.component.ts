import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Content } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-validar-cedula-control',
  templateUrl: './validar-cedula-control.component.html',
  styleUrls: ['./validar-cedula-control.component.css']
})
export class ValidarCedulaControlComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ValidarCedulaControlComponent>,
     @Inject(MAT_DIALOG_DATA) public message:  string) { }

  ngOnInit() {
  }
    Aceptar(): void{
     location.reload();
    }
}
