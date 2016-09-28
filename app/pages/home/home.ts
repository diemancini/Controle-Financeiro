import { Component } from '@angular/core';
import { LaunchsPage } from '../launchs/launchs';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
	
	public launchs: any;

	constructor() {
		//É referenciado pela propriedade [root]="launchs" em home.html. 
		this.launchs = LaunchsPage;

	}
}
