import { Component, Input } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {
	messages: Message[] = [];

	private _message!: string;

	@Input() set message(value: string) {
		this.messages = [{
			severity: 'info',
			summary: 'Not: ',
			detail: value || 'No data available'
		}];
		this._message = value || 'No data available';
	}
	
	get message() {
		return this._message;
	}
}
