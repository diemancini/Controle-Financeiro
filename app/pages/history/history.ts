import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { AccountUtil } from '../../util/account-util';
import { DAOLaunchsPage } from '../../dao/dao-launchs';
import { ModalHistoryPage } from '../modal-history/modal-history';


@Component({
	templateUrl: 'build/pages/history/history.html'
})

export class HistoryPage {
	private monthYear: any;
	private alert: any;
	private modal: any;
	private nav: any;
	private dao: any;

	private listAccounts: any;
	private accountUtil: any;
	private income: any;
	private market: any;
	private lazer: any;
	private food: any;
	private car: any;

	private totalAllCategories: any;

	private balanceAndIncome: any;
	private totalBalance: any;
	private totalIncome: any;
	private totalMarket: any;
	private totalLazer: any;
	private totalFood: any;
	private totalCar: any;

	constructor(private navCtrl: NavController,
				private modalCtrl: ModalController,
				private params: NavParams) {

		this.monthYear = params.get("params") || {};
		this.modal = modalCtrl;
		this.nav = navCtrl;
		this.dao = new DAOLaunchsPage();

		this.totalAllCategories = [];
		this.balanceAndIncome = [];

		this.totalBalance = {account: "Saldo", totalValue: 0};
		this.totalIncome = {};
		this.totalMarket = {};
		this.totalLazer = {};
		this.totalFood = {};
		this.totalCar = {};
	}

	public getMonth() {
		let firstDay = this.getFirstDayHistory(this.monthYear);
		let lastDay = this.getLastDayHistory(this.monthYear);

		this.accountUtil = new AccountUtil();
		this.dao.getList(firstDay, lastDay, (list) => {
			this.isEmpty();
			this.filterCategories(list);
			this.getTotalValuesAllCategories();
		});
	}

	private filterCategories (list) {
		this.market = list.filter(this.accountUtil.getMarket);
		this.lazer = list.filter(this.accountUtil.getLazer);
		this.food = list.filter(this.accountUtil.getFood);
		this.car = list.filter(this.accountUtil.getCar);
		this.income = list.filter(this.accountUtil.getIncome);
	}

	private getTotalSpendCategory(account) {
		let spend = {account: null, totalValue: 0};

		spend = this.accountUtil.getTotalValue(account);
		this.totalBalance.totalValue -= spend.totalValue;
		this.totalAllCategories.push(spend);
	}

	private getTotalBalance() {
		let balance = {account: null, totalValue: 0};
		let spend = {account: "Total de gastos", totalValue: this.totalBalance.totalValue};
		//spend.account = "Total de gastos";

		if (this.income.length > 0) {
			this.balanceAndIncome.push(spend);
			balance = this.accountUtil.getTotalValue(this.income);
			this.totalBalance.totalValue += balance.totalValue;
			this.totalAllCategories.push(balance);
			this.balanceAndIncome.push(this.totalBalance);
			//this.balanceAndIncome.push(spend);
		}
		else {
			this.balanceAndIncome.push(spend);
			this.balanceAndIncome.push(this.totalBalance);
			//this.balanceAndIncome.push(spend);
			//this.totalAllCategories.push(this.totalBalance);
		}
	}

	private getTotalValuesAllCategories() {
		if (this.market.length > 0) {
			this.getTotalSpendCategory(this.market);
		}
		if (this.lazer.length > 0) {
			this.getTotalSpendCategory(this.lazer);
		}
		if (this.food.length > 0) {
			this.getTotalSpendCategory(this.food);
		}
		if (this.car.length > 0) {
			this.getTotalSpendCategory(this.car);
		}
		this.getTotalBalance();
	}

	private getAccount(obj) {
		if (obj.account == "Mercado") {
			return this.market;
		}
		else if (obj.account == "Lazer") {
			return this.lazer;
		}
		else if (obj.account == "Alimentação") {
			return this.food;
		}
		else if (obj.account == "Carro") {
			return this.car;
		}
		else if (obj.account == "Renda") {
			return this.income;
		}
	}

	public getCategoryAccounts(account) {
		let accountSelected = {};
		accountSelected = this.getAccount(account);

		let modalHistory = this.modal.create(ModalHistoryPage, {params: accountSelected});

		modalHistory.present(modalHistory);
	}

	public getFirstDayHistory(date) {
		let monthYear = date.split('-');
		let year = monthYear[0];
		let month = monthYear[1]-1;

		let firstDay = new Date(year, month, 1);

		return firstDay;
	}

	public getLastDayHistory(date) {
		let monthYear = date.split('-');
		let year = monthYear[0];
		let month = monthYear[1];

		let lastDay = new Date(year, month, 0);

		return lastDay;
	}

	private isEmpty() {
		while (this.totalAllCategories.length > 0) {
			this.totalAllCategories.pop();
			this.balanceAndIncome.pop();
		}
		this.totalBalance.totalValue = 0;
	}

	public accountsHistoryIn(obj) {
		if (obj.account == "Saldo" && obj.totalValue >= 0)
			return true;
		else false;
	}
}
