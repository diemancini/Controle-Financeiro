import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { ModalLaunchsPage } from '../modal-launchs/modal-launchs';
import { ModalLaunchCrudPage } from '../modal-launch-crud/modal-launch-crud';
import { DAOLaunchsPage } from '../../dao/dao-launchs';
import { AccountUtil } from '../../util/account-util';
import { DateUtil } from '../../util/date-util';
import { DateFilter } from '../../components/date-filter';
import { LaunchHistoryUtil } from '../../util/launch-history-util';


@Component({
 	templateUrl: 'build/pages/home/home.html',
 	directives: [DateFilter]
})

export class HomePage {
	private launchHistoryUtil: any;
	private launch: any;
	private accountUtil: any;
	private dateFilter: any;
	private alert: any;
	private modal: any;
	private nav: any;
	private dao: any;

	private totalAllCategories: any;
	private balanceAndIncome: any;

	constructor(private navCtrl: NavController,
				private modalCtrl: ModalController,
				private alertCtrl: AlertController) {

		this.modal = modalCtrl;
		this.nav = navCtrl;
		this.dao = new DAOLaunchsPage();
		this.dateFilter = new Date();
		this.alert = alertCtrl;

		this.launchHistoryUtil = new LaunchHistoryUtil();

		this.totalAllCategories = [];
		this.balanceAndIncome = [];

		this.getCurrentMonth(this.dateFilter);

	}

	public getCurrentMonth(date) {
		let firstDay = this.launchHistoryUtil.getFirstDayHistory(date);
		let lastDay = this.launchHistoryUtil.getLastDayHistory(date);

		this.accountUtil = new AccountUtil();
		this.dao.getList(firstDay, lastDay, (list) => {
			this.launchHistoryUtil.isEmpty();
			this.launchHistoryUtil.filterCategories(list);
			this.totalAllCategories = this.launchHistoryUtil.getTotalValuesAllCategories();
			this.balanceAndIncome = this.launchHistoryUtil.getBalanceAndIncome();
		});
	}

	public getCategoryLaunchAccounts(account) {
		let accountSelected = {};
		accountSelected = this.launchHistoryUtil.getAccount(account);

		let modalLaunch = this.modal.create(ModalLaunchsPage, {params: accountSelected});

		modalLaunch.onDismiss(() => {
			this.getCurrentMonth(this.dateFilter);
		});

		modalLaunch.present(modalLaunch);
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

	public insert() {
		let modalLaunchs = this.modal.create(ModalLaunchCrudPage);

		modalLaunchs.onDismiss((data) => {
			if (data) {
				this.dao.insert(data, (launch) => {
					this.getCurrentMonth(new Date());
					Toast.showShortBottom("Conta inserida com sucesso!")
						.subscribe(toast => {
							console.log(toast);
						});
				})
			}
		})

		modalLaunchs.present(modalLaunchs);
	}

	//Total de gastos

}
