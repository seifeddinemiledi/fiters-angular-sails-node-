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
export class CreateUserComponent implements OnInit {

  busy: Subscription;
  form: FormGroup;

  image = "assets/img/preloader.gif";
  imageLoded = false;
  lastFile: File;
  error:string="";
  constructor(private _sailsService: SailsService, private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      'firstname': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'lastname': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'phonePrefixNumber': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'phoneNumber': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'birthDate': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'weight': [0, Validators.required],
      'height': [0, Validators.required],
      'shape': [0, Validators.required],
      'gender': [null, Validators.required],
      'handicap': [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    })
  }
  submitForm(data) {
    if(this.form.valid){
      console.log(data)
      this.busy=this._sailsService.post("/api/user",data).subscribe(
        (response)=>{console.log(response);this.busy.unsubscribe();
          this._router.navigateByUrl('/user')},
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

}
