import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {  ToastsManager } from 'ng2-toastr'
declare var toastr;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastr:ToastsManager,vRef: ViewContainerRef) {
    toastr.setRootViewContainerRef(vRef)
  }

  ngOnInit() {
    this.toastr["success"]("Welcom to your Dshboard Admin ... Enjoy it !!");
  }

}
