import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {}
}
