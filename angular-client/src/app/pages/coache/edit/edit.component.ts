import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCoacheComponent implements OnInit {
  busy: Subscription;
  form: FormGroup;

  image = "assets/img/preloader.gif";
  imageLoded = false;
  lastFile: File;
  error: string = "";

  longitude = '9.2834726'; lng: Number = 9.2834726;
  latitude = '35.3304388'; lat: Number = 35.3304388;
  point: any = {
    x: 35.3304388,
    y: 9.2834726
  }

  item: any;
  constructor(private _sailsService: SailsService, private _formBuilder: FormBuilder, 
  private _router: Router, private _activatedRoute: ActivatedRoute) { }


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
    this._activatedRoute.params.subscribe(
      params => {
        this.busy = this._sailsService.get("/api/coache/" + params.id).subscribe(
          (response) => {
            this.item = response.data;
            this.builForm();
            this.busy.unsubscribe();
          },
          (error) => {
            this._router.navigateByUrl("/coache");
            this.busy.unsubscribe();
          }
        )

      })
  }
  builForm() {
    this.form = this._formBuilder.group({
      'firstname': [this.item.firstname, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'lastname': [this.item.lastname, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'phonePrefixNumber': [this.item.phonePrefixNumber, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'phoneNumber': [this.item.phoneNumber, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'username': [this.item.username, Validators.required],
      'email': [this.item.email, Validators.compose([Validators.required, Validators.email])],
      'password': [this.item.password, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'monthCoach': [this.item.monthCoach, Validators.required],
      'expertCoach': [this.item.expertCoach, Validators.required],
      'marathonCoach': [this.item.marathonCoach, Validators.required],
      'gender': [this.item.gender, Validators.required]
    })
  }
   submitForm(data) {
    if (this.form.valid) {
     // console.log(data)
      this.busy = this._sailsService.put("/api/coache/"+this.item.id, data).subscribe(
        (response) => {
          console.log(response); this.busy.unsubscribe();
          this._router.navigateByUrl('/coache')
        },
        (error) => { this.error = error.data.message; this.busy.unsubscribe() }
      )
    }
  }

}
