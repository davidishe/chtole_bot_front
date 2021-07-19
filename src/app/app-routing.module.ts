import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ItemFormComponent } from './components/kit/forms/item-form/item-form.component';
import { ItemDetailedCardComponent } from './components/kit/item-detailed-card/item-detailed-card.component';
import { ItemFormEditComponent } from './components/kit/forms/item-form-edit/item-form-edit.component';
import { AdminGuard } from './components/core/guards/admin.guard';
import { ClientsComponent } from './components/content/main/clients/clients.component';
import { ItemFormComponent2 } from './components/kit/forms/item-form-2/item-form2.component';
import { ItemFormComponent3 } from './components/kit/forms/item-form-3/item-form3.component';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Главная'}},

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },

  { path: 'clients', component: ClientsComponent, data: {breadcrumb: 'Клиенты'}},
  { path: 'clients/add/first/:type', component: ItemFormComponent, data: {breadcrumb: 'Добавить'}},
  { path: 'clients/add/first/:type/:id', component: ItemFormComponent, data: {breadcrumb: 'Изменить'}},

  { path: 'clients/add/second/:type/:id', component: ItemFormComponent2, data: {breadcrumb: 'Учредители'}},

  { path: 'clients/add/third/:type/:id', component: ItemFormComponent3, data: {breadcrumb: 'Руководитель'}},



  { path: 'clients/:id', component: ItemDetailedCardComponent, data: {breadcrumb: 'Подробности'}},
  { path: 'clients/:id/edit', component: ItemFormEditComponent, data: {breadcrumb: 'Изменение'}},


  { path: 'admin', loadChildren: () => import('./components/content/admin/admin.module').then(mod => mod.AdminModule),
  data: {breadcrumb: 'Администратор'}, canActivate: [AdminGuard]},


  { path: 'account', loadChildren: () => import('./components/layouts/account/account.module').then(mod => mod.AccountModule),
  data: {breadcrumb: {skip: true}}, },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
