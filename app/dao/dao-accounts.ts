import { Storage, SqlStorage } from 'ionic-angular';
import { DAOLaunchsPage } from './dao-launchs';


export class DAOAccountsPage {
	public list: any = [];
	public accountList: any;
	private storage: any;

	constructor() {
		this.storage = new DAOLaunchsPage();
		this.accountList = [
			{description: "Mercado"},
			{description: "Alimentação"},
			{description: "Lazer"},
			{description: "Carro"},
			{description: "Renda"}
		];
	}

	public getList(firstDay, lastDay, successCallback) {
		this.storage.getList(firstDay, lastDay, (data) => {
			successCallback(data);
		}) 
	}

	public insert(account, successCallback) {
		let storage = new Storage(SqlStorage);
		storage.query("INSERT INTO accounts(description) VALUES(?)", [account.description])
			.then((data) => {
				let item = {
					id: data.res.insertId,
					description: account.description
				};

				successCallback(item);
				console.log("Gravou no BD");
			}, error => {
				console.log('Erro ao inserir dado da tabela'+ JSON.stringify(error.err));
			});
	}

	public edit(account, successCallback) {
		let storage = new Storage(SqlStorage);
		storage.query("UPDATE accounts SET description = ? where id = ?", [account.description, account.id])
			.then((data) => {
				successCallback(account);
			}, error => {
				console.log('Erro ao atualizar o dado da tabela'+ JSON.stringify(error.err));
			})

	}

	public delete(account, successCallback) {
		let storage = new Storage(SqlStorage);
		storage.query("DELETE FROM accounts where description = ?", [account.description])
			.then((data) => {
				successCallback(account);
				console.log("description: "+ data.res.description);
			}, error => {
				console.log('Erro ao deletar o dado da tabela'+ JSON.stringify(error.err));
			})
	}
}