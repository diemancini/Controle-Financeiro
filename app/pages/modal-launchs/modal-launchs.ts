import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { DAOAccountsPage } from '../../dao/dao-accounts';
import { DateUtil } from '../../util/date-util';

@Component({
    templateUrl: 'build/pages/modal-launchs/modal-launchs.html',
})

export class ModalLaunchsPage {
	private view: any;
	private launch: any;
	private dao: any;
	private accountList: any;

	constructor(private viewCtrl: ViewController, private params: NavParams) {

		this.view = viewCtrl;
		this.launch = params.get("params") || {};

		this.dao = new DAOAccountsPage();
		this.accountList = this.dao.accountList;
	}

	public cancel() {
		this.view.dismiss();
	}

	public save() {
		let dateUtil = new DateUtil;
		let newDate = dateUtil.parseDate(this.launch.date);

		this.launch.payed = this.launch.payed ? 1 : 0;
		this.launch.date = this.getDate(this.launch.date);
		this.view.dismiss(this.launch);
	}

	public getDate(date) {
		let dateUtil = new DateUtil();
		return dateUtil.formatDate(date);
	}

}
