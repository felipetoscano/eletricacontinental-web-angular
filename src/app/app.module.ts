import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { ContentTitleComponent } from './components/content-title/content-title.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MenuItemComponent,
    ContentPageComponent,
    ContentTitleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
