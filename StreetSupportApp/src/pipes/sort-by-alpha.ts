import { Injectable, Pipe } from '@angular/core';


@Pipe({
  name: 'sortByAlpha'
})
@Injectable()
export class SortByAlpha {

  transform(items: any[]) {

    if (items === undefined || items === null) {
      return;
    }

    return items.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  }
}
