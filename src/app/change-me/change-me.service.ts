import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChangeMeService { 

	constructor(private http: Http) {}

	public getFakeRandomNumber(min: number, max: number, amount = 1): Observable<number[]> {
		console.log(min, max);
		let numbers = [];
		for (let i = 0; i < amount; i++) {
			let randomNum: number = Math.floor(Math.random() * (max-min+1))+min;
			numbers.push(randomNum);
		}
		return Observable.of(numbers);
	}

	public getRealRandomNumber(min: number, max: number, amount = 1): Observable<number[]> {
		let url = `https://www.random.org/integers/?num=${amount}&min=${min}&max=${max}&format=plain&col=1&base=10`;
		return this.http.get(url).map(response => {
			return response.text().replace(/\n$/g,'').split('\n').map(x => parseInt(x));
		}).catch(this.handleError);
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
