import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'coacheFilter'
})
export class CoacheFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=> row.firstname.indexOf(query) > -1 || row.lastname.indexOf(query) > -1 );
        }
        return array;
    }
}