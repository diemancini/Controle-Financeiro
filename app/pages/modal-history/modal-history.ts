import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
//import { DAOAccountsPage } from '../../dao/dao-accounts';
import { DateUtil } from '../../util/date-util';

@Component({
    templateUrl: 'build/pages/modal-history/modal-history.html',
})

export class ModalHistoryPage {
	private view: any;
	private accountsList: any;

	constructor(private viewCtrl: ViewController, private params: NavParams) {

		this.view = viewCtrl;
		this.accountsList = params.get("params") || {};
	}

	public cancel() {
		this.view.dismiss();
	}

	public getDate(accounts) {
		let dateUtil = new DateUtil();
		return dateUtil.parseString(accounts.date);
	}

	public accountsModalHistoryIn(launch) {
		return launch.inOut == "in";
	}
}
