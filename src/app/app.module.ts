import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './containers/board/board.component';
import { TilesComponent } from './components/tiles/tiles.component';
import { WinscreenComponent } from './containers/winscreen/winscreen.component';
import { StartscreenComponent } from './containers/startscreen/startscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    TilesComponent,
    WinscreenComponent,
    StartscreenComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
