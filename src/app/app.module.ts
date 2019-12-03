import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { CargarCedulaComponent } from './cargar-cedula/cargar-cedula.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NgxFileDropModule } from "ngx-file-drop";
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InformacionEconomicaComponent } from './informacion-economica/informacion-economica.component';
import { HttpClientModule} from '@angular/common/http';
import {ClientesService} from '../app/clientes.service'
@NgModule({
  declarations: [
    AppComponent,
    RecomendacionesComponent,
    CargarCedulaComponent,
    InformacionPersonalComponent,
    InformacionEconomicaComponent,
   
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatStepperModule,
    RecaptchaModule,
    MatCheckboxModule,
    AngularFileUploaderModule,
    NgxFileDropModule,
    ReactiveFormsModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule {
   

 }
