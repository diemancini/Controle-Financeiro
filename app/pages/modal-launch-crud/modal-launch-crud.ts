

import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { DAOLaunchsPage } from '../../dao/dao-launchs';
import { DateUtil } from '../../util/date-util';

@Component({
    templateUrl: 'build/pages/modal-launch-crud/modal-launch-crud.html',
})

export class ModalLaunchCrudPage {
	private view: any;
	private launch: any;
	private dao: any;
	private accountList: any;

	constructor(private viewCtrl: ViewController, private params: NavParams) {

		this.view = viewCtrl;
		this.launch = params.get("params") || {};

		this.dao = new DAOLaunchsPage();
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

