import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { HistoryPage } from './pages/history/history';
//import { AccountsPage } from './pages/accounts/accounts';

ionicBootstrap(HomePage, null, {
	config: {mode: 'md'},
	iconMode: 'md',
	tabsPlacement: "top"
});

@Component({
 	templateUrl: 'build/app.html',

 	//config:  { mode: 'md' }
})

export class MyApp {
	private home: any;
	private history: any;
	//private accounts: any;
	private root: any;


	constructor(public platform: Platform) {
		this.home = HomePage;
		this.history = HistoryPage;
		//this.accounts = AccountsPage;
		this.root = this.home;

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
		});
	}

	public openMenu(page) {
		this.root = page;
	}
}

ionicBootstrap(MyApp);
