import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SolutionModule } from './components/solution/solution.module';

import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SolutionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
