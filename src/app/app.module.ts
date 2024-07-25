import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { CharacterDetailPageComponent } from './pages/character-detail-page/character-detail-page.component';
import { LocationDetailPageComponent } from './pages/location-detail-page/location-detail-page.component';
import { EpisodeDetailPageComponent } from './pages/episode-detail-page/episode-detail-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SidebarComponent,
    NavbarComponent,
    CardCharacterComponent,
    CharacterDetailPageComponent,
    LocationDetailPageComponent,
    EpisodeDetailPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
