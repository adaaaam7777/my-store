import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FreelancerGridComponent } from './components/freelancer-grid/freelancer-grid.component';
import { FilterComponent } from './src/app/components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    FreelancerGridComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
