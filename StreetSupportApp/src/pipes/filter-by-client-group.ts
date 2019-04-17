import { Injectable, Pipe, PipeTransform } from '@angular/core';

export interface ClientGroupFilter {
  filterTypes: string[]
}

@Pipe({
  name: 'filterByClientGroup',
  pure: false
})
@Injectable()
export class FilterByClientGroup implements PipeTransform {

  transform(items: any[], filter: ClientGroupFilter): any {

    if (!items) {
      return;
    }

    if(!filter) {
      return items;
    }
    
    return items.filter(item => item.clientGroup != null && 
      item.clientGroups.some(clientGroup => 
        filter.filterTypes.some(filterType => filterType == clientGroup.key)
      )
    )
  }
}
