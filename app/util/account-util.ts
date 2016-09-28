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
			let result = {account: obj[0].account, totalValue: 0};
			for(var i=0; i < obj.length; i++) {
				result.totalValue += obj[i].value;
			}

			return result;
		}
	}

}