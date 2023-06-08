import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NoAccessComponent } from '../components/no-access/no-access.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

import { AppRoutingModule } from '../app-routing.module';


const components = [

  HomeComponent,
  LoginComponent,
  NavbarComponent,
  NoAccessComponent,
  NotFoundComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [components]
})
export class ComponentModule { }
