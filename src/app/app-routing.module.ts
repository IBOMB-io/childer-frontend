import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChildComponent } from './add-child/add-child.component';
import { ChildProfileComponent } from './child-profile/child-profile.component';
import { LoginformComponent } from './loginform/loginform.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '',pathMatch: 'full', redirectTo: localStorage.getItem("user") ? "main" : "login" },
  { path: 'main', component: MainPageComponent, runGuardsAndResolvers: 'always' },
  { path: 'add-child', component: AddChildComponent },
  { path: 'login', component: LoginformComponent, runGuardsAndResolvers: 'always' },
  { path: 'profile/:grade/:id', component: ChildProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
