import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartscreenComponent } from './containers/startscreen/startscreen.component';
import { BoardComponent } from './containers/board/board.component';

export const routes: Routes = [
  {
    path: '',
    component: StartscreenComponent,
  },
  { path: 'new', component: BoardComponent },
  { path: ':id', component: BoardComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
