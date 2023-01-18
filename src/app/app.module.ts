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
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './child-profile/detail/detail.component';
import { OverviewComponent } from './child-profile/overview/overview.component';
import { EstimateComponent } from './child-profile/estimate/estimate.component';
import { EvaluationComponent } from './child-profile/evaluation/evaluation.component';
import { TabViewModule } from 'primeng/tabview';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    AddChildComponent,
    LoginformComponent,
    ChildrenNotFoundComponent,
    ChildProfileComponent,
    DetailComponent,
    OverviewComponent,
    EstimateComponent,
    EvaluationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
