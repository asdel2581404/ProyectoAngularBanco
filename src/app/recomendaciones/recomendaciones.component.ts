import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
}
  constructor() { }
  ngOnInit() { }
  continuar:boolean=false;
   habilitar() {
     
    if(this.continuar==false){

      this.continuar=true;

    }else{
      
      this.continuar=false;
    }
 
  }
}
