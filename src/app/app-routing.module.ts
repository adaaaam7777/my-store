import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoinGridComponent } from './components/coin-grid/coin-grid.component';

let routes: Routes = [
	{
		path: '',
		// redirectTo: '',
		// pathMatch: 'full'
		component: CoinGridComponent
	},
/*	{
		path: 'other',
		component: OtherComponent,
/!*		children: [
			{
				path: '',
				component: xxx
			},
			{
				path: 'new',
				component: yyyy
			},
			{
				path: ':id',
				component: zzz
			},
			{
				path: ':id/edit',
				component: vsbds
			}
		]*!/
	}*/
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule {

}
