import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /*     RouterModule.forRoot(routes), */
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {}
}
