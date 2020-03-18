import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopnavComponent } from './pages/subpages/topnav/topnav.component';
import { VisualizerComponent } from './pages/subpages/visualizer/visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopnavComponent,
    VisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
