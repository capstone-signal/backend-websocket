import { Injectable } from "@nestjs/common";

@Injectable()
export class EventsService {
	  constructor() {}

	  parseUrl(url: string) {
		  const urlArr = url.split('?');
		  const id = urlArr[0];
		  const reviewDiffId = urlArr[1].split('=')[1];

		  return {
			  reservationId: parseInt(id, 10),
			  reviewDiffId: parseInt(reviewDiffId, 10),
		  }
	  }
}