import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Store, StoreModule} from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { CoinGridComponent } from './components/coin-grid/coin-grid.component';
import { FilterComponent } from './components/filter/filter.component';
import { reducers } from './reducers/index';
import { RealtimeCoinsService } from './components/services/coin.service';
import { ListComponent } from './components/shared/list/list.component';
import { PageableListComponent } from './components/shared/pageable-list/pageable-list.component';
import { PaginatorComponent } from './components/shared/paginator/paginator.component';
import { ChatWindowComponent } from './components/chatwindow/chatwindow.component';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './components/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';

let fireBaseConfig = {
	apiKey: 'AIzaSyBpLBMCMjMtErMTwwetpiyPSkfGgU1DRfs',
	authDomain: 'coinchatapp-eaa2d.firebaseapp.com',
	databaseURL: 'https://coinchatapp-eaa2d.firebaseio.com',
	projectId: 'coinchatapp-eaa2d',
	storageBucket: '',
	messagingSenderId: '996571027592'
};

@NgModule( {
	declarations: [
		AppComponent,
		CoinGridComponent,
		FilterComponent,
		ListComponent,
		PageableListComponent,
		PaginatorComponent,
		ChatWindowComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ReactiveFormsModule,
		StoreModule.forRoot( reducers, {
			initialState: {
				coins: []
			}
		} ),
		EffectsModule.forRoot( [
			UserEffects
		] ),
		AngularFireModule.initializeApp( fireBaseConfig ),
		AngularFireAuthModule
	],
	providers: [
		Store,
		RealtimeCoinsService,
		AngularFireAuth,
		AuthService,
		AngularFireDatabase
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
