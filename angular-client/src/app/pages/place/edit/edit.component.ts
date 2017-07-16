import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditPlaceComponent implements OnInit {
  busy: Subscription;
  form: FormGroup;


  longitude = '9.2834726'; lng: Number = 9.2834726;
  latitude = '35.3304388'; lat: Number = 35.3304388;
  point: any = {
    x: 35.3304388,
    y: 9.2834726
  }
  error: string = "";

  item: any;
  constructor(private _sailsService: SailsService, private _formBuilder: FormBuilder,
    private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'address': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'start_time': [null, Validators.required],
      'end_time': [null, Validators.required]
    })
    this._activatedRoute.params.subscribe(
      params => {
        this.busy = this._sailsService.get("/api/place/" + params.id).subscribe(
          (response) => {
            this.item = response.data;
            this.builForm();
            this.busy.unsubscribe();
          },
          (error) => {
            this._router.navigateByUrl("/place");
            this.busy.unsubscribe();
          }
        )

      })
  }
  builForm() {
    
    console.log(this.item.start_time);
    this.form = this._formBuilder.group({
      'name': [this.item.name, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'address': [this.item.address, Validators.compose([Validators.required, Validators.maxLength(255)])],
      'start_time': [moment('2017-10-10 '+this.item.start_time).format('HH:mm'), Validators.required],
      'end_time': [moment('2017-10-10 '+this.item.end_time).format('HH:mm'), Validators.required]
    })
  }
  submitForm(data) {
    if (this.form.valid) {
      data.pos = this.item.pos
      this.busy = this._sailsService.put("/api/place/" + this.item.id, data).subscribe(
        (response) => {
          console.log(response); this.busy.unsubscribe();
          this._router.navigateByUrl('/place')
        },
        (error) => { this.error = error.data.message; this.busy.unsubscribe() }
      )
    }
  }

}
