import { HAMMER_LOADER, BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { CoreModule } from './components/core/core.module';
import { TypesService } from './services/catalogs/types.service';
import { RegionsService } from './services/catalogs/regions.service';
import { JwtInterceptor } from './components/core/interceptors/jwt.interceptor';
import { ShopService } from './services/catalogs/shop.service';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ErrorInterceptor } from './components/core/interceptors/error.interceptor';
import { BusyService } from './services/infrastructure/busy.service';
import { LoadingInterceptor } from './components/core/interceptors/loading.interceptor';
import { MatButtonModule } from './components/kit/buttons/mat-button/mat-button.module';
import { NavbarModule } from './components/layouts/nav-menu/navbar.module';
import { ItemsModule } from './components/content/main/items/items.module';
import { ItemDetailedCardModule } from './components/kit/item-detailed-card/item-detailed-card.module';
import { HeroModule } from './components/layouts/hero/hero.module';
import { AdminModule } from './components/content/admin/admin.module';
import { TitleModule } from './components/kit/titles/title/title.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientsModule } from './components/content/main/clients/clients.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentUtcDateAdapter } from './components/kit/inputs/input-datepicker/moment-utc-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


registerLocaleData(localeRu, 'ru');

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};

const UserComponents = [
  
]

const UserModules = [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    Ng2CarouselamosModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatButtonModule,
    NavbarModule,
    ItemsModule,
    ItemDetailedCardModule,
    ClientsModule,
    HeroModule,
    AdminModule,
    TitleModule,
    MatTooltipModule
]

@NgModule({
  declarations:
  [
    AppComponent,
    ErrorComponent,
    ServererrorComponent,
    NotFoundComponent,
    UserComponents
  ],

  imports:
  [
    UserModules
  ],

  exports: [
  ],

  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},

    TypesService,
    RegionsService,
    ShopService,
    BusyService,
    {                                   
      provide: HAMMER_LOADER,
      useValue: () => new Promise(() => {})
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter, deps: [MAT_DATE_LOCALE] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
