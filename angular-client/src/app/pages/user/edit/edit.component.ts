import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import * as moment from 'moment'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditUserComponent implements OnInit {


  busy: Subscription;
  form: FormGroup;

  image = "assets/img/preloader.gif";
  imageLoded = false;
  lastFile: File;
  error: string = "";

  item: any;


  constructor(private _sailsService: SailsService, private _formBuilder: FormBuilder,
    private _router: Router, private _activatedRoute: ActivatedRoute) {


  }

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
    this._activatedRoute.params.subscribe(
      params => {
        this.busy = this._sailsService.get("/api/user/" + params.id).subscribe(
          (response) => {
            this.item = response.data;
            this.builForm();
            this.busy.unsubscribe();
          },
          (error) => {
            this._router.navigateByUrl("/user");
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
      'birthDate': [moment(this.item.birthDate).format('YYYY-MM-DD'), Validators.required],
      'email': [this.item.email, Validators.compose([Validators.required, Validators.email])],
      'password': [this.item.password, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'weight': [this.item.weight, Validators.required],
      'height': [this.item.height, Validators.required],
      'shape': [this.item.shape, Validators.required],
      'gender': [this.item.gender, Validators.required],
      'handicap': [this.item.handicap, Validators.compose([Validators.required, Validators.maxLength(255)])]
    })
  }
  submitForm(data) {
    if (this.form.valid) {
     // console.log(data)
      this.busy = this._sailsService.put("/api/user/"+this.item.id, data).subscribe(
        (response) => {
          console.log(response); this.busy.unsubscribe();
          this._router.navigateByUrl('/user')
        },
        (error) => { this.error = error.data.message; this.busy.unsubscribe() }
      )
    }
  }

}
