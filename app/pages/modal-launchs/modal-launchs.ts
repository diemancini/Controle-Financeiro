import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, ModalController, AlertController } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { DateUtil } from '../../util/date-util';
import { DAOLaunchsPage } from '../../dao/dao-launchs';
import { ModalLaunchCrudPage } from '../modal-launch-crud/modal-launch-crud';


@Component({
    templateUrl: 'build/pages/modal-launchs/modal-launchs.html',
})

export class ModalLaunchsPage {
	private dao: any;
	private view: any;
	private modal: any;
	private alert: any;
	private accountsList: any;

	constructor(private viewCtrl: ViewController,
				private params: NavParams,
				private navCtrl: NavController,
				private modalCtrl: ModalController,
				private alertCtrl: AlertController) {

		this.view = viewCtrl;
		this.modal = modalCtrl;
		this.alert = alertCtrl;
		this.accountsList = params.get("params") || {};
		this.dao = new DAOLaunchsPage();
	}

	public cancel() {
		this.view.dismiss();
	}

	public edit(launch) {
		let modalLaunchs= this.modal.create(ModalLaunchCrudPage, {params: launch});

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
							let pos = this.accountsList.indexOf(launch);
							this.accountsList.splice(pos, 1);

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


	public getDate(accounts) {
		let dateUtil = new DateUtil();
		return dateUtil.parseString(accounts.date);
	}

	public accountsModalLaunchIn(launch) {
		return launch.inOut == "in";
	}
}
