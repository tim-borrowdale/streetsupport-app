import { Injectable, Pipe } from '@angular/core';


@Pipe({
  name: 'sortByTime'
})
@Injectable()
export class SortByOpeningTime {

  transform(items: any[]) {

    if (items === undefined || items === null) {
      return;
    }

    return items.sort(function(a, b) {
      const dateA = new Date('1970/01/01 ' + a.openingTime.startTime);
      const dateB = new Date('1970/01/01 ' + b.openingTime.startTime);

      return dateA.valueOf() - dateB.valueOf();
    });
  }
}
