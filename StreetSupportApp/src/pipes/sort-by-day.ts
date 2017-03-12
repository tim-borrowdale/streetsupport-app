import { Injectable, Pipe } from '@angular/core';


@Pipe({
  name: 'sortByDay'
})
@Injectable()
export class SortByDay {

  transform(items: any[]) {

    if (items === undefined || items === null) {
      return;
    }

    let daysOfWeek = this.getSortedDayNames();

    return items.sort(function(a, b) {
      var indexA = daysOfWeek.indexOf(a.name);
      var indexB = daysOfWeek.indexOf(b.name);

      if (indexA < indexB) {
        return -1;
      }
      if (indexA > indexB) {
        return 1;
      }

      return 0;
    });
  }

  private getSortedDayNames() {
    const currentDayIndex = new Date().getDay();
    let dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return dayNames.slice(currentDayIndex).concat(dayNames.slice(0, currentDayIndex));
  }
}
