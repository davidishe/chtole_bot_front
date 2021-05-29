import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/core/guards/auth.guard';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ItemFormComponent } from './components/kit/item-form/item-form.component';
import { ItemDetailedCardComponent } from './components/kit/item-detailed-card/item-detailed-card.component';
import { PetsComponent } from './components/content/main/pets/pets.component';
import { ItemFormEditComponent } from './components/kit/item-form-edit/item-form-edit.component';
import { AdminGuard } from './components/core/guards/admin.guard';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Главная'}},

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },

  { path: 'clients', component: PetsComponent, data: {breadcrumb: 'Питомцы'}},
  { path: 'clients/add', component: ItemFormComponent, data: {breadcrumb: 'Добавление'}},
  { path: 'clients/:type/:id', component: ItemDetailedCardComponent, data: {breadcrumb: 'Подробности'}},
  { path: 'clients/:type/:id/edit', component: ItemFormEditComponent, data: {breadcrumb: 'Изменение'}},


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
