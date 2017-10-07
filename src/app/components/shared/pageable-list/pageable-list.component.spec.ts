import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageableListComponent } from './pageable-list.component';

describe( 'ExamplePageableListComponent', () => {
	let component: PageableListComponent<string>;
	let fixture: ComponentFixture<PageableListComponent<string>>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ PageableListComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( PageableListComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should be created', () => {
		expect( component ).toBeTruthy();
	} );
} );
