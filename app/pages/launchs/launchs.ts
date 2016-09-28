import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { ModalLaunchsPage } from '../modal-launchs/modal-launchs';
import { DAOLaunchsPage } from '../../dao/dao-launchs';
import { DateUtil } from '../../util/date-util';
import { DateFilter } from '../../components/date-filter';


@Component({
 	templateUrl: 'build/pages/launchs/launchs.html',
 	directives: [DateFilter]
})

export class LaunchsPage {
	private listLaunchs: any;
	private dateFilter: any;
	private alert: any;
	private modal: any;
	private nav: any;
	private dao: any;

	constructor(private navCtrl: NavController,
				private modalCtrl: ModalController,
				private alertCtrl: AlertController) {

		this.modal = modalCtrl;
		this.nav = navCtrl;
		this.dao = new DAOLaunchsPage();
		this.listLaunchs = [];
		this.dateFilter = new Date();
		this.alert = alertCtrl;

		this.getLaunchList(this.dateFilter);
	}

	public insert() {
		let modalLaunchs = this.modal.create(ModalLaunchsPage);

		modalLaunchs.onDismiss((data) => {
			if (data) {
				this.dao.insert(data, (launch) => {
					//this.listLaunchs.push(launch);
					// launch.date é a data do item inserido.
					//this.updateMonth(new Date(launch.date));
					// Atualizará a lista com o mês atual.
					this.updateMonth(new Date());
					Toast.showShortBottom("Conta inserida com sucesso!")
						.subscribe(toast => {
							console.log(toast);
						});
				})
			}
		})

		modalLaunchs.present(modalLaunchs);
	}

	public edit(launch) {
		let modalLaunchs= this.modal.create(ModalLaunchsPage, {params: launch});

		modalLaunchs.onDismiss((data) => {
			if (data) {
				this.dao.edit(data, (launch) => {
					Toast.showShortBottom("Compra alterada com sucesso!")
						.subscribe(toast => {
							console.log(toast);
						});
				});
			}
		});

		modalLaunchs.present(modalLaunchs);
	}

	public delete(launch) {
		let confirm = this.alert.create({
			title: 'Excluir',
			body: 'Quer mesmo excluir essa compra?',
			buttons: [
				{
					text: 'Sim',
					handler: () => {
						this.dao.delete(launch, (data) => {
							let pos = this.listLaunchs.indexOf(launch);
							this.listLaunchs.splice(pos, 1);

							Toast.showShortBottom("Conta excluída com sucesso!")
								.subscribe(toast => {
									console.log(toast);
								});
						});
					}
				},
				{
					text: 'Não'
				}
			]
		});

		confirm.present();
	}

	public getDate(launch) {
		let dateUtil = new DateUtil;

		return dateUtil.parseString(launch.date);
	}

	public launchState(launch) {
		return launch.payed ? "Pago" : "Não Pago";
	}

	public launchIn(launch) {
		return launch.inOut == "in";
	}

	public updateMonth(date) {
		this.dateFilter = date;
		this.getLaunchList(date);
	}

	public getLaunchList(date) {
		let dateUtil = new DateUtil();
		let firstDay = dateUtil.getFirstDay(date);
		let lastDay = dateUtil.getLastDay(date);

		this.dao.getList(firstDay, lastDay, (list) => {
			this.listLaunchs = list;
		})
	}

}
