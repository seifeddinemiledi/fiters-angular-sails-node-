import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routing } from './app.routing';
import { AgmCoreModule } from '@agm/core';

import { SailsModule } from "angular2-sails";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from 'angular2-datatable';
import { BusyModule } from 'angular2-busy';


import { UserFilterPipe }   from './pipes/user-filter.pipe';
import { CoacheFilterPipe }   from './pipes/coache-filter.pipe';
import { PlaceFilterPipe }   from './pipes/place-filter.pipe';
import { BookingFilterPipe }   from './pipes/booking-filter.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';

import { UserService } from './services/user.service';
import { CoacheService } from './services/coache.service';
import { PlaceService } from './services/place.service';
import { RemoteService } from './services/data-table.service';

import { HomeComponent } from './pages/home/home.component';

import { CreateUserComponent } from './pages/user/create/create.component';
import { EditUserComponent } from './pages/user/edit/edit.component';
import { DeleteUserComponent } from './pages/user/delete/delete.component';
import { DetailsUserComponent } from './pages/user/details/details.component';
import { ListUserComponent } from './pages/user/list/list.component';

import { CreateCoacheComponent } from './pages/coache/create/create.component'
import { EditCoacheComponent } from './pages/coache/edit/edit.component'
import { DeleteCoacheComponent } from './pages/coache/delete/delete.component'
import { DetailsCoacheComponent } from './pages/coache/details/details.component'
import { ListCoacheComponent } from './pages/coache/list/list.component'

import { CreatePlaceComponent } from './pages/place/create/create.component'
import { EditPlaceComponent } from './pages/place/edit/edit.component'
import { DeletePlaceComponent } from './pages/place/delete/delete.component'
import { DetailsPlaceComponent } from './pages/place/details/details.component'
import { ListPlaceComponent } from './pages/place/list/list.component'

import { DetailsBookingComponent } from './pages/booking/details/details.component'
import { ListBookingComponent } from './pages/booking/list/list.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    AsideBarComponent,
    HomeComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    DetailsUserComponent,
    ListUserComponent,
    UserFilterPipe,
    CreateCoacheComponent,
    EditCoacheComponent,
    DeleteCoacheComponent,
    DetailsCoacheComponent,
    ListCoacheComponent,
    CoacheFilterPipe,
    CreatePlaceComponent,
    EditPlaceComponent,
    DeletePlaceComponent,
    DetailsPlaceComponent,
    ListPlaceComponent,
    PlaceFilterPipe,
    DetailsBookingComponent,
    ListBookingComponent,
    BookingFilterPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing,
    SailsModule.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    BusyModule.forRoot({
      message: 'Chargement ...',
      backdrop: false,
      template: '<div class="app flex-row align-items-center busy">' +
      '<div class="sk-cube-grid ">' +
      '<div class="sk-cube sk-cube1 bg-primary"></div>' +
      '<div class="sk-cube sk-cube2 bg-primary"></div>' +
      '<div class="sk-cube sk-cube3 bg-primary"></div>' +
      '<div class="sk-cube sk-cube4 bg-primary"></div>' +
      '<div class="sk-cube sk-cube5 bg-primary"></div>' +
      '<div class="sk-cube sk-cube6 bg-primary"></div>' +
      '<div class="sk-cube sk-cube7 bg-primary"></div>' +
      '<div class="sk-cube sk-cube8 bg-primary"></div>' +
      '<div class="sk-cube sk-cube9 bg-primary"></div>' +
      '</div>' +
      '</div>',
      delay: 200,
      minDuration: 600,
      wrapperClass: 'busy-bg'
    }),
    DataTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwz_KQ81cwd6SWycejMeqaQldsZBGFk68'
    })
  ],
  providers: [RemoteService,UserService,CoacheService,PlaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
