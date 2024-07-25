import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CharacterDetailPageComponent } from './pages/character-detail-page/character-detail-page.component';
import { LocationDetailPageComponent } from './pages/location-detail-page/location-detail-page.component';
import { EpisodeDetailPageComponent } from './pages/episode-detail-page/episode-detail-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'character/:id', component: CharacterDetailPageComponent },
  { path: 'location/:id', component: LocationDetailPageComponent },
  { path: 'episode/:id', component: EpisodeDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
