import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/config/directives';
import { DateUtil } from '../util/date-util';

@Component ({
	selector: 'date-filter',
	directives: [IONIC_DIRECTIVES],
	//inputs: ['startDate'],
	//outputs: ['historyMonths'],
	template: `<ion-item>
		<ion-label stacked>Qual mês/ano você quer consultar?</ion-label>
		<ion-datetime displayFormat="MM/YYYY" [(ngModel)]="month" (click)="historyMonth()"></ion-datetime>
	</ion-item>`
})

export class HistoryDateFilter {
	@Output() historyMonths: EventEmitter<string> = new EventEmitter<string>();
	//private historyMonths = new EventEmitter();
	//private selectedMonth: string;
	private dateUtil: any;
	public date: Date;
	private year: any;
	//private month: any;

	constructor() {
		// Fará a comunicação entre date-filter.ts e history.html.
		//this.historyMonth = new EventEmitter();

		this.dateUtil = new DateUtil();
		this.date = new Date();
		//this.month = this.date.getMonth();
		this.year = this.date.getFullYear();
		//this.historyMonths.emit(this.date);
	}


	/*ngOnInit() {
		alert("Funcionou!");
		this.updateMonth();
		this.executeChangeMonth();
	}*/

	// Altera para o mês do item inserido.
	/*ngOnChanges(changes) {
		alert('Change detected:'+ changes.month);
		//this.executeChangeMonth();
		//this.updateMonth();
	}*/

	public getMonth() {
		this.historyMonths.emit('20/09/2016');
	}

	private executeChangeMonth() {
		//this.historyMonths.next(this.date);
	}

	private updateMonth() {
		//this.selectedMonth = this.dateUtil.getMonthName(this.month) +"-"+ this.year;
		//this.date = new Date(this.year, this.month);
		//this.executeChangeMonth();
	}
}