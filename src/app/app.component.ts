import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VinculacionDigital';
  isLinear = false;
  myFormGroup: FormGroup;
  onNotify(formGroup: FormGroup): void {
      this.myFormGroup = formGroup;
  }
  ngOnInit() {}
}
