import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/config/directives';
import { DateUtil } from '../util/date-util';

@Component ({
	selector: 'date-filter',
	directives: [IONIC_DIRECTIVES],
	//inputs: ['startDate'],
	outputs: ['changeMonth'],
	template: `<ion-row>
        <ion-col width=10>
            <button favorite clear round (click)="previousMonth()"><ion-icon name="arrow-dropleft-circle"></ion-icon></button>
        </ion-col>
        <ion-col width=75>
            <h4 class="text-principal" favorite>{{selectedMonth}}</h4>
        </ion-col>
        <ion-col width=10>
             <button favorite clear round  (click)="nextMonth()"><ion-icon name="arrow-dropright-circle"></ion-icon></button>
        </ion-col>
    </ion-row>`
})

export class DateFilter {
	//@Output() changeMonth: EventEmitter<any>;// = new EventEmitter();
	private changeMonth: any;
	private selectedMonth: string;
	private dateUtil: any;
	public date: Date;
	private year: any;
	private month: any;

	constructor() {
		// Fará a comunicação entre date-filter.ts e launchs.html.
		this.changeMonth = new EventEmitter();

		this.dateUtil = new DateUtil();
		this.date = new Date();
		this.month = this.date.getMonth();
		this.year = this.date.getFullYear();
	}


	ngOnInit() {
		this.updateMonth();
	}

	// Altera para o mês do item inserido.
	/*ngOnChanges(changes) {
		this.updateMonth();
	}*/

	private executeChangeMonth() {
		this.changeMonth.next(this.date);
	}

	private updateMonth() {
		this.selectedMonth = this.dateUtil.getMonthName(this.month) +"-"+ this.year;
		this.date = new Date(this.year, this.month);
		this.executeChangeMonth();
	}

	public previousMonth() {
		if (this.month == 0) {
			this.month = 11;
			this.year -= 1;
		}
		else {
			this.month = (this.month - 1) % 12;
		}

		this.updateMonth();
	}

	public nextMonth() {
		this.month = (this.month + 1) % 12;
		if (this.month == 0) {
			this.year += 1;
		}

		this.updateMonth();
	}
}