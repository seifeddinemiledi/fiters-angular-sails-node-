import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeletePlaceComponent implements OnInit {
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
  delete(id){
    this.busy=this._sailsService.delete("/api/place/"+this.item.id).subscribe(
      (data)=>{this.busy.unsubscribe();this._router.navigateByUrl("/place")},
      (error)=>{console.log(error)}
    )
  }

}
