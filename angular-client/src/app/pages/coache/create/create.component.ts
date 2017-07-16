import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var google;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCoacheComponent implements OnInit {

   busy: Subscription;
  form: FormGroup;

  image = "assets/img/preloader.gif";
  imageLoded = false;
  lastFile: File;
  error:string="";

  longitude = '9.2834726'; lng: Number = 9.2834726;
  latitude = '35.3304388'; lat: Number = 35.3304388;
  point:any={
    x:35.3304388,
    y:9.2834726
  }

  item: any;
  constructor(private _sailsService: SailsService, private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      'firstname': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'lastname': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'phonePrefixNumber': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'phoneNumber': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'username': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'monthCoach': [0, Validators.required],
      'expertCoach': [0, Validators.required],
      'marathonCoach': [0, Validators.required],
      'gender': [null, Validators.required]
    })
  }

  submitForm(data) {
    if(this.form.valid){
      console.log(data)
     // data.pos=[this.point.x,this.point.y];
      this.busy=this._sailsService.post("/api/coache",data).subscribe(
        (response)=>{console.log(response);this.busy.unsubscribe();
          this._router.navigateByUrl('/coache')},
        (error)=>{this.error=error.data.message;this.busy.unsubscribe()}
      )
    }
  }
  imageChanged(event) {
    this.lastFile = event.srcElement.files[0];
    if (this.lastFile) {
      if (this.lastFile.type === "image/png" || this.lastFile.type === "image/jpg") {
        this.changeImage();
        this.imageLoded = true;
      } else {
        this.imageLoded = false;
      }
    } else {
      this.imageLoded = false;
    }
  }
  changeImage() {
    var blobUrl = URL.createObjectURL(this.lastFile);
    var that = this;
    var xhr = new XMLHttpRequest;
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var recoveredBlob = xhr.response;
      var reader = new FileReader;
      reader.onload = function () {
        var blobAsDataUrl = reader.result;
        that.image = blobAsDataUrl;
      };
      reader.readAsDataURL(recoveredBlob);
    };
    xhr.open('GET', blobUrl);
    xhr.send();
  }
   onDragEnd(e) {
    this.latitude = e.coords.lat + "";
    this.longitude = e.coords.lng + "";
    this.point.x=e.coords.lat;
    this.point.y=e.coords.lng;
  }

}
