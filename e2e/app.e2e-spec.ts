import { MyStorePage } from './app.po';

describe('my-store App', () => {
	let page: MyStorePage;

	beforeEach(() => {
		page = new MyStorePage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
	expect(page.getParagraphText()).toEqual('app works!');
	});
});


