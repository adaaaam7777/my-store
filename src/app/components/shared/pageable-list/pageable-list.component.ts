import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component( {
	selector: 'ar-pageable-list',
	templateUrl: './pageable-list.component.html',
	styleUrls: [ './pageable-list.component.scss' ]
} )
export class PageableListComponent<T> {
	static readonly defaultPageSizes = [ 10, 25, 50, 100 ];

	// list related inputs
	@Input() items: T[];
	@Input() listItemTemplateRef: TemplateRef< { $implicit: T } >;
	@Input() selectable = true;
	@Input() selected: T;

	// paginator related inputs
	@Input() actualPage = 0;
	@Input() totalPage = 1;
	@Input() firstAndLastButtonVisible = true;
	@Input() prevAndNextButtonVisible = true;
	@Input() pageRangeWidth: number = PaginatorComponent.defaultPageRangeWidth;

	// other inputs
	@Input() totalItems?: number;
	@Input() itemsPerPage: number;
	@Input() pageSizes: number[] = PageableListComponent.defaultPageSizes;

	// list related outputs
	@Output() click = new EventEmitter<T>();
	@Output() selectionChanged = new EventEmitter<T>();

	// paginator related outputs
	@Output() pageChanged = new EventEmitter<number>();

	// other outputs
	@Output() itemsPerPageChanged = new EventEmitter<number>();

	onItemsPerPageChanged( newItemsPerPage: string ) {
		this.itemsPerPageChanged.emit( parseInt( newItemsPerPage, 0 ) );
	}
}
