import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AccountUtil } from '../util/account-util';
import { DAOLaunchsPage } from '../dao/dao-launchs';
import { ModalHistoryPage } from '../pages/modal-history/modal-history';


@Component({
	templateUrl: 'build/pages/history/history.html'
})

export class LaunchHistoryUtil {
	private accountUtil: any;
	private income: any;
	private market: any;
	private lazer: any;
	private food: any;
	private car: any;

	private totalAllCategories = [];
	private balanceAndIncome = [];

	private totalBalance = {account: "Saldo", totalValue: 0, icon: null};
	private totalIncome = {};
	private totalMarket = {};
	private totalLazer = {};
	private totalFood = {};
	private totalCar = {};

	private filterCategories (list) {
		this.accountUtil = new AccountUtil();
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
		let spend = {
			account: "Total de gastos",
			totalValue: this.totalBalance.totalValue,
			icon: "thumbs-down"
		};

		if (this.income.length > 0) {
			this.balanceAndIncome.push(spend);
			balance = this.accountUtil.getTotalValue(this.income);

			this.totalBalance.totalValue += balance.totalValue;
			this.totalBalance.icon =  this.getIconIncome(this.totalBalance.totalValue);
			this.totalAllCategories.push(balance);
			this.balanceAndIncome.push(this.totalBalance);

			return this.totalAllCategories;
		}
		else {
			this.balanceAndIncome.push(spend);
			this.balanceAndIncome.push(this.totalBalance);

			return this.totalAllCategories;
		}
	}

	private getBalanceAndIncome() {
		return this.balanceAndIncome;
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
		return this.getTotalBalance();
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

	public getFirstDayHistory(date) {
		let month= date.getMonth();
		let year = date.getFullYear();

		let firstDay = new Date(year, month, 1);

		return firstDay;
	}

	public getLastDayHistory(date) {
		let month= date.getMonth() + 1;
		let year = date.getFullYear();

		let lastDay = new Date(year, month, 0);

		return lastDay;
	}


	private isEmpty() {
		while (this.totalAllCategories.length > 0) {
			this.totalAllCategories.pop();
		}
		while (this.balanceAndIncome.length > 0) {
			this.balanceAndIncome.pop();
		}
		this.totalBalance.totalValue = 0;
	}

	public accountsHistoryIn(obj) {
		if (obj.account == "Saldo" && obj.totalValue >= 0)
			return true;
		else false;
	}

	private getIconIncome(income) {
		if (income >= 0) {
			return "thumbs-up";
		}
		else {
			return "thumbs-down";
		}

	}
}
