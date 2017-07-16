import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'bookingFilter'
})
export class BookingFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=> row.basePrice.indexOf(query) > -1 || row.roomPrice.indexOf(query) > -1 );
        }
        return array;
    }
}