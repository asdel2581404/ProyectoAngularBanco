import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
 

@Component({
  selector: 'app-cargar-cedula',
  templateUrl: './cargar-cedula.component.html',
  styleUrls: ['./cargar-cedula.component.css']
})
export class CargarCedulaComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];
  continuar:boolean=true;
public message
public imagePath
public imgURL
public Habilitado=false
  constructor() { }



  ngOnInit() {
  }


  preview(files) {
    if (files.length === 0)
      return;
    if (this.files!=null){
      this.continuar=false;
      this.Habilitado=true;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  
}



