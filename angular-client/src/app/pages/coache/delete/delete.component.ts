import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteCoacheComponent implements OnInit {
   busy: Subscription;
  item: any;
  constructor(private _sailsService: SailsService,
    private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      params => {
        this.busy = this._sailsService.get("/api/coache/" + params.id).subscribe(
          (response) => {
            this.item = response.data;
            this.busy.unsubscribe();
          },
          (error) => {
            this._router.navigateByUrl("/coache");
            this.busy.unsubscribe();
          }
        )

      })
  }
  delete(id){
    this.busy=this._sailsService.delete("/api/coache/"+this.item.id).subscribe(
      (data)=>{this.busy.unsubscribe();this._router.navigateByUrl("/coache")},
      (error)=>{console.log(error)}
    )
  }

}
