import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(protected http: HttpClient) { }
  getUsers() {
    return this.http.get('http://localhost:8086/estadocivil');
  }

  getGenero() {
    return this.http.get('http://localhost:8086/genero');
  }

  getOcupacion() {
    return this.http.get('http://localhost:8086/ocupacion');
  }

  getGastos(){
    return this.http.get('http://localhost:8086/gastosmensuales');
  }

  getDirecciones(){
    return this.http.get('http://localhost:8086/esquemas');
  }

}
