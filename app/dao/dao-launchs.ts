import { Storage, SqlStorage } from 'ionic-angular';
import { DateUtil } from '../util/date-util'

export class DAOLaunchsPage {
	private accountList: any;

	constructor() {
		let storage = new Storage(SqlStorage);

		let query = "CREATE TABLE IF NOT EXISTS launchs (id INTEGER PRIMARY KEY AUTOINCREMENT,";
		query += " description TEXT, value REAL, date INTEGER, account TEXT, inOut TEXT, payed INTEGER)";

		storage.query(query)
			.then((data) => {
				console.log("Criou a tabela para lancamentos!");
			}, error => {
				console.log('Erro na criação da tabela para Lançamentos! '+ JSON.stringify(error.err));
			});

		this.accountList = [
			{description: "Mercado"},
			{description: "Alimentação"},
			{description: "Lazer"},
			{description: "Carro"},
			{description: "Renda"}
		];
	}

	public getList(firstDay, lastDay, successCallback) {
		let dateUtil = new DateUtil();
		firstDay = dateUtil.formatDate(firstDay.getTime())
		lastDay = dateUtil.formatDate(lastDay.getTime())

		let storage = new Storage(SqlStorage);
		//alert("firsDay: "+ firstDay.getTime() +", lastDay: "+ lastDay);
		let query = "SELECT * FROM launchs WHERE date >= ? and date <= ? ORDER BY account, date DESC";

		storage.query(query, [firstDay, lastDay])
			.then((data) => {
				let list = [];

				for(var i=0; i < data.res.rows.length; i++) {
					let launchDB = data.res.rows.item(i);
					//alert('launchDB.date: '+ launchDB.date);
					let launch = {
						id: launchDB.id,
						description: launchDB.description,
						value: launchDB.value,
						date: launchDB.date,
						account: launchDB.account,
						inOut: launchDB.inOut,
						payed: launchDB.payed
					}

					list.push(launch);
				}

				successCallback(list);

			}, error => {
				console.log('Erro ao inserir dado da tabela: '+ JSON.stringify(error.err));
			});

	}

	public insert(launch, successCallback) {
		let storage = new Storage(SqlStorage);

		let query = "INSERT INTO launchs (description, value, date, account, inOut, payed)";
		query += " VALUES(?, ?, ?, ?, ?, ?)"; 

		storage.query(query, [
				launch.description,
				launch.value,
				launch.date,
				launch.account,
				launch.inOut,
				launch.payed
			])
			.then((data) => {
				successCallback(launch);
			}, error => {
				console.log('Erro ao inserir dado da tabela: '+ JSON.stringify(error.err));
			});
	}

	public edit(launch, successCallback) {
		let storage = new Storage(SqlStorage);

		let query = "UPDATE launchs SET description = ?, value = ?, date = ?, ";
		query += "account = ?, inOut = ?, payed = ?  where id = ?";

		storage.query(query, [
				launch.description,
				launch.value,
				launch.date,
				launch.account,
				launch.inOut,
				launch.payed,
				launch.id
			])
			.then((data) => {
				successCallback(launch);
			}, error => {
				console.log('Erro ao atualizar o dado da tabela: '+ JSON.stringify(error.err));
			})

	}

	public delete(launch, successCallback) {
		let storage = new Storage(SqlStorage);

		let query = "DELETE FROM launchs where id = ?";

		storage.query(query, [launch.id])
			.then((data) => {
				successCallback(launch);
			}, error => {
				console.log('Erro ao deletar o dado da tabela: '+ JSON.stringify(error.err));
			})
	}


}

