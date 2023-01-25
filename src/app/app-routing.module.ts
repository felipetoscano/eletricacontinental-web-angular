import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdminAreaComponent } from './pages/admin-area/admin-area.component';
import { AuthenticatedAdminAreaComponent } from './pages/authenticated-admin-area/authenticated-admin-area.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin-area', component: AdminAreaComponent },
  { path: 'authenticated-admin-area', component: AuthenticatedAdminAreaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }