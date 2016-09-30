export class DateUtil {

	public parseDate(date) {
		date += '';
		let parts = date.split("-");

		return new Date(parts[0], parts[1]-1, parts[2]);
	}

	public parseString(date) {
		date += '';
		let parts = date.split("-");

		date = parts[2] +'/'+ parts[1] +'/'+ parts[0];

		return date;
	}

	public formatDate(dateMilliseconds) {
		let date = new Date(dateMilliseconds);
		let init = "00";

		let ano = date.getFullYear();
		let mes = (init + (date.getMonth()+1)).slice(-init.length);
		let dia = (init + (date.getDate()+1)).slice(-init.length);

		return (ano +"-"+ mes +"-"+ dia);
	}

	public getMonthName(date) {
		let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
					  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

		return months[date];
	}

	public getFirstDay(date) {
		let year = date.getFullYear();
		let month = date.getMonth();
		let firstDay = new Date(year, month, 1);

		return firstDay;
	}

	public getLastDay(date) {
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let lastDay = new Date(year, month, 0);

		return lastDay;
	}
}