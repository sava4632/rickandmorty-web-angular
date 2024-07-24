import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CharacterDetailPageComponent } from './pages/character-detail-page/character-detail-page.component';
import { LocationDetailPageComponent } from './pages/location-detail-page/location-detail-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'character/:id', component: CharacterDetailPageComponent },
  { path: 'location/:id', component: LocationDetailPageComponent }
  // Otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
