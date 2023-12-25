import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { RouterModule } from "@angular/router";

import { InMemoryDatabase } from "../in-memory-database";
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  exports:[
    //shared modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //shared components
    NavbarComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
