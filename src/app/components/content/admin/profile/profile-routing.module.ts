import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { BaseComponent } from '../base/base.component';
import { UsersComponent } from '../user/users/users.component';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent, data: {breadcrumb: 'Пользователь' }},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
