import { Store } from '@ngrx/store';
import {OnInit, Component} from "@angular/core";
import {Observable} from "rxjs";

import { IFreelancer, AppState } from "../../reducers/freelancers.reducer";

@Component({
	selector: 'app-freelancer-grid',
	templateUrl: './freelancer-grid.component.html',
	styleUrls: ['./freelancer-grid.component.scss'],
})
export class FreelancerGridComponent implements OnInit {

	public freelancers: Observable<Array<IFreelancer>>;

	constructor(private store: Store<AppState>) {
		this.freelancers = store.select('freelancers');
	}

	ngOnInit(): void {
	}

}
