import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe( 'ExampleListComponent', () => {
	let component: ListComponent<string>;
	let fixture: ComponentFixture<ListComponent<string>>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ ListComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( ListComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should be created', () => {
		expect( component ).toBeTruthy();
	} );
} );
