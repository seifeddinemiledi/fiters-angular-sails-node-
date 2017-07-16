import { ModuleWithProviders } from '@angular/core';
import { Route,RouterModule,Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ListUserComponent } from './pages/user/list/list.component';
import { CreateUserComponent } from './pages/user/create/create.component';
import { EditUserComponent } from './pages/user/edit/edit.component';
import { DeleteUserComponent } from './pages/user/delete/delete.component';
import { DetailsUserComponent } from './pages/user/details/details.component';

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


const appRoutes:Routes=[
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'user',
        children:[
            {
                path:'',
                component:ListUserComponent
            },
            {
                path:'create',
                component:CreateUserComponent
            },
            {
                path:'edit/:id',
                component:EditUserComponent
            },
            {
                path:'delete/:id',
                component:DeleteUserComponent
            },
            {
                path:'details/:id',
                component:DetailsUserComponent

            }
        ]
    },
    {
        path:'coache',
        children:[
            {
                path:'',
                component:ListCoacheComponent
            },
            {
                path:'create',
                component:CreateCoacheComponent
            },
            {
                path:'edit/:id',
                component:EditCoacheComponent
            },
            {
                path:'delete/:id',
                component:DeleteCoacheComponent
            },
            {
                path:'details/:id',
                component:DetailsCoacheComponent

            }
        ]
    },
    {
        path:'place',
        children:[
            {
                path:'',
                component:ListPlaceComponent
            },
            {
                path:'create',
                component:CreatePlaceComponent
            },
            {
                path:'edit/:id',
                component:EditPlaceComponent
            },
            {
                path:'delete/:id',
                component:DeletePlaceComponent
            },
            {
                path:'details/:id',
                component:DetailsPlaceComponent

            }
        ]
    },
    {
        path:'booking',
        children:[
            {
                path:'',
                component:ListBookingComponent
            },
            {
                path:'details/:id',
                component:DetailsBookingComponent

            }
        ]
    }
];

export const  Routing :  ModuleWithProviders=RouterModule.forRoot(appRoutes);