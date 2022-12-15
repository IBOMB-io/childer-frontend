import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChildComponent } from './add-child/add-child.component';
import { LoginformComponent } from './loginform/loginform.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'add-child', component: AddChildComponent },
  { path: 'login', component: LoginformComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
