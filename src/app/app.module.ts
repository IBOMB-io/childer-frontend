import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddChildComponent } from './add-child/add-child.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildrenNotFoundComponent } from './main-page/children-not-found/children-not-found.component';
import { ChildProfileComponent } from './child-profile/child-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    AddChildComponent,
    LoginformComponent,
    ChildrenNotFoundComponent,
    ChildProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
