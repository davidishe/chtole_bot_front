import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ItemDetailedCardComponent } from './components/kit/item-detailed-card/item-detailed-card.component';
import { AdminGuard } from './components/core/guards/admin.guard';
import { ClientsComponent } from './components/content/main/clients/clients.component';
import { ItemFormComponent2 } from './components/kit/forms/item-form-2/item-form2.component';
import { ItemForm1Component } from './components/kit/forms/item-form-1/item-form-1.component';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Главная'}},

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },

  { path: 'items', component: ClientsComponent, data: {breadcrumb: 'Напоминания'}},
  { path: 'items/add/second/:type/:id', component: ItemFormComponent2, data: {breadcrumb: 'Учредители'}},

  { path: 'items/:id', component: ItemDetailedCardComponent, data: {breadcrumb: 'Подробности'}},
  { path: 'items/edit/:id', component: ItemForm1Component, data: {breadcrumb: 'Подробности'}},

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
