import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './components/kit/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ItemDetailedCardComponent } from './components/kit/item-detailed-card/item-detailed-card.component';
import { AdminGuard } from './components/core/guards/admin.guard';
import { ClientsComponent } from './components/content/main/clients/clients.component';
import { MemberComponent } from './components/content/main/members/member.component';
import { ItemAddComponent } from './components/content/main/clients/item-add/item-add.component';
import { MemberDetailedComponent } from './components/content/main/members/member-detailed/member-detailed.component';
import { ItemUpdateComponent } from './components/content/main/clients/item-update/item-update.component';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Главная'}},

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },

  { path: 'items', component: ClientsComponent, data: {breadcrumb: 'Напоминания'}},
  { path: 'items/add', component: ItemAddComponent, data: {breadcrumb: 'Добавить'}},
  { path: 'items/:id', component: ItemDetailedCardComponent, data: {breadcrumb: 'Подробности'}},
  { path: 'items/edit/:id', component: ItemUpdateComponent, data: {breadcrumb: 'Подробности'}},

  { path: 'members', component: MemberComponent, data: {breadcrumb: 'Команда'}},
  { path: 'members/:id', component: MemberDetailedComponent, data: {breadcrumb: 'Команда'}},


  { path: 'admin', loadChildren: () => import('./components/content/admin/admin.module').then(mod => mod.AdminModule),
  data: {breadcrumb: 'Администратор'}, canActivate: [AdminGuard]},

  { path: 'account', loadChildren: () => import('./components/kit/layouts/account/account.module').then(mod => mod.AccountModule),
  data: {breadcrumb: {skip: true}}, },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
