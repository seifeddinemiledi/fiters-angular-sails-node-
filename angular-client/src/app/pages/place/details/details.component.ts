import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsPlaceComponent implements OnInit {
busy: Subscription;
  item: any;
  constructor(private _sailsService: SailsService,
    private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe(
      params => {
        this.busy = this._sailsService.get("/api/place/" + params.id).subscribe(
          (response) => {
            this.item = response.data;
            this.busy.unsubscribe();
          },
          (error) => {
            this._router.navigateByUrl("/place");
            this.busy.unsubscribe();
          }
        )

      })
  }

}
