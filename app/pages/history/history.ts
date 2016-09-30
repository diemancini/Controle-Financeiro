import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ionicBootstrap } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { AccountUtil } from '../../util/account-util';
import { DAOLaunchsPage } from '../../dao/dao-launchs';
import { ModalHistoryPage } from '../modal-history/modal-history';
import { LaunchHistoryUtil } from '../../util/launch-history-util';


@Component({
	templateUrl: 'build/pages/history/history.html'
})

export class HistoryPage {
	private launchHistoryUtil: any;
	private accountUtil: any;
	private monthYear: any;
	private alert: any;
	private modal: any;
	private nav: any;
	private dao: any;

	private totalAllCategories: any;
	private balanceAndIncome: any;
	
	constructor(private navCtrl: NavController,
				private modalCtrl: ModalController,
				private params: NavParams) {

		this.monthYear = params.get("params") || {};
		this.modal = modalCtrl;
		this.nav = navCtrl;
		this.dao = new DAOLaunchsPage();

		this.launchHistoryUtil = new LaunchHistoryUtil();

		this.totalAllCategories = [];
		this.balanceAndIncome = [];

	}

	public getMonth() {
		let date = this.monthYear.split('-');

		let firstDay = this.launchHistoryUtil.getFirstDayHistory(new Date(date[0], date[1]-1));
		let lastDay = this.launchHistoryUtil.getLastDayHistory(new Date(date[0], date[1]-1));

		this.accountUtil = new AccountUtil();
		this.dao.getList(firstDay, lastDay, (list) => {
			this.launchHistoryUtil.isEmpty();
			this.launchHistoryUtil.filterCategories(list);

			this.totalAllCategories = this.launchHistoryUtil.getTotalValuesAllCategories();
			this.balanceAndIncome = this.launchHistoryUtil.getBalanceAndIncome();
		});
	}

	public getCategoryAccounts(account) {
		let accountSelected = {};
		accountSelected = this.launchHistoryUtil.getAccount(account);

		let modalHistory = this.modal.create(ModalHistoryPage, {params: accountSelected});

		modalHistory.present(modalHistory);
	}

	public accountsHistoryIn(obj) {
		if (obj.account == "Saldo" && obj.totalValue >= 0)
			return true;
		else false;
	}

	public isIncome(account) {
		if (account == "Saldo") {
			return true;
		}
		else return false;
	}
}
