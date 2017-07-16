import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreatePlaceComponent implements OnInit {
  busy: Subscription;
  form: FormGroup;


  longitude = '9.2834726'; lng: Number = 9.2834726;
  latitude = '35.3304388'; lat: Number = 35.3304388;
  point:any={
    x:35.3304388,
    y:9.2834726
  }
  error:string="";
   constructor(private _sailsService: SailsService, private _formBuilder: FormBuilder, private _router: Router) { }


  ngOnInit() {
     this.form = this._formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'address': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'start_time': [null, Validators.required],
      'end_time': [null, Validators.required]
    })
  }
   submitForm(data) {
    if(this.form.valid){
      data.pos="0101000020E610000087527B116DE70240E25817B7D1704840"
      this.busy=this._sailsService.post("/api/place",data).subscribe(
        (response)=>{console.log(response);this.busy.unsubscribe();
          this._router.navigateByUrl('/place')},
        (error)=>{this.error=error.data.message;this.busy.unsubscribe()}
      )
    }
  }
   onDragEnd(e) {
    this.latitude = e.coords.lat + "";
    this.longitude = e.coords.lng + "";
    this.point.x=e.coords.lat;
    this.point.y=e.coords.lng;
  }

}
