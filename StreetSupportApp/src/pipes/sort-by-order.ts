import { Injectable, Pipe } from '@angular/core';


@Pipe({
  name: 'sortByOrder'
})
@Injectable()
export class SortByOrder {

  transform(items: any[]) {

    if (items === undefined || items === null) {
      return;
    }

    return items.sort(function(a, b) {
      if (a.sortOrder < b.sortOrder) {
        return 1;
      }
      if (a.sortOrder > b.sortOrder) {
        return -1;
      }
      return 0;
    });
  }
}
