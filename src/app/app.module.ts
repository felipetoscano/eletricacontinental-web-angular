import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AdminAreaComponent } from './pages/admin-area/admin-area.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageTitleComponent } from './common/page-title/page-title.component';
import { DefaultButtonComponent } from './common/default-button/default-button.component';
import { AuthenticatedAdminAreaComponent } from './pages/authenticated-admin-area/authenticated-admin-area.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminAreaComponent,
    AboutComponent,
    ContactComponent,
    PageTitleComponent,
    DefaultButtonComponent,
    AuthenticatedAdminAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
