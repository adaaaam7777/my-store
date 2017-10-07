import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Store, StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { FreelancerGridComponent } from './components/freelancer-grid/freelancer-grid.component';
import { FilterComponent } from './components/filter/filter.component';
import { reducers } from './reducers/index';
import { RealtimeFreelancersService } from './components/services/freelancer.service';

@NgModule( {
	declarations: [
		AppComponent,
		FreelancerGridComponent,
		FilterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ReactiveFormsModule,
		StoreModule.forRoot( reducers, {
			initialState: {
				freelancers: []
			}
		} )
	],
	providers: [
		Store,
		RealtimeFreelancersService
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
