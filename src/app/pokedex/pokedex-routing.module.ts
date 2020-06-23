import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexPage } from './pokedex.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: PokedexPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexPageRoutingModule {}
