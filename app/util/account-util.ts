export class AccountUtil {

	public getFood(obj) {
		if (obj.account == "Alimentação") {
			return obj;
		}
	}

	public getMarket(obj) {
		if (obj.account == "Mercado") {
			return obj;
		}
	}

	public getLazer(obj) {
		if (obj.account == "Lazer") {
			return obj;
		}
	}

	public getCar(obj) {
		if (obj.account == "Carro") {
			return obj;
		}
	}

	public getIncome(obj) {
		if (obj.account == "Renda") {
			return obj;
		}
	}

	public getTotalValue(obj) {
		if (obj) {
			let icon = this.getIcon(obj[0].account);
			let result = {account: obj[0].account, totalValue: 0, icon: icon};
			for(var i=0; i < obj.length; i++) {
				result.totalValue += obj[i].value;
			}

			return result;
		}
	}

	private getIcon(account) {
		if (account == 'Alimentação') {
			return 'pizza';
		}
		else if (account == 'Mercado') {
			return 'cart';
		}
		else if (account == 'Lazer') {
			return 'logo-playstation';
		}
		else if (account == 'Carro') {
			return 'car';
		}
		else if (account == 'Renda') {
			return 'logo-usd';
		}
	}

}