import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { ViewReposComponent } from './view-repos/view-repos.component';
import { Map1Component } from './map1/map1.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { SiteHead1Component } from './site-head1/site-head1.component';
@NgModule({
  declarations: [
    AppComponent,
    RepoListComponent,
    ViewReposComponent,
    Map1Component,
    SiteHead1Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBab9PqnYIjljc2kIiLcZyiswnlmy_mDqY'
    }),
    AgmJsMarkerClustererModule,
    AgmSnazzyInfoWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// not sure if the app component strategy should put map stuff in map1 conponent.
// npm install js-marker-clusterer @agm/js-marker-clusterer --save
//import { AgmJsMarkerClustererModule, ClusterManager } from '@agm/js-marker-clusterer'; 

