import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListBookingComponent implements OnInit {
items = [];
  filterQuery = "";
  rowsOnPage = 5;
   busy: Subscription;
  constructor(private _sailsService: SailsService) { }

  ngOnInit() {
     this.busy=this._sailsService.get("/api/booking").subscribe(
      value => { this.items = value.data.reverse();this.busy.unsubscribe() },
      error => { console.log(error);this.busy.unsubscribe() }
    );
    this._sailsService.on("api/booking").subscribe(
      event => { this.handleUserEvent(event) },
      error => { console.log(error) }
    );
  }
  handleUserEvent(event) {
    //console.log(event);
    switch (event.verb) {
      case "created":
        this.items.unshift(event.data);
        break;
      case "updated":
        var index = this.items.findIndex(x => x.id === event.previous.id);
        Object.keys(event.data).forEach(element => {
           this.items[index][element] = event.data[element];
        });
        break;
      case "destroyed":
        this.items = this.items.filter((u) => { return u.id !== event.previous.id })
        break;
      default:
        break;
    }
  }
  

}
