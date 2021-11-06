import { MatTableDataSource } from '@angular/material/table';
import { AppService } from './../service/app.service';

declare var jQuery: any;

export class Util {

    private actionCode = {
        agregar: "abcabc",
        editar: "ertryrt",
        eliminar: "bmdjgh"
    };


    constructor(private appservice: AppService) { }

    showModal(id: string) {
        jQuery("#" + id).modal("show");
        jQuery("#" + id).appendTo("body");
    }

    hideModal(id: string) {
        jQuery("#" + id).modal("hide");
    }

    destroyModal(id: string) {
        jQuery("body>#" + id).remove();
    }

    nestedFilterCheck(search, data, key) {
        if (typeof data[key] === 'object') {
            for (const k in data[key]) {
                if (data[key][k] !== null) {
                    search = this.nestedFilterCheck(search, data[key], k);
                }
            }
        } else {
            search += data[key];
        }
        return search;
    }

    filterPredicate(dataSource: MatTableDataSource<any>) {
        dataSource.filterPredicate = (data, filter: string) => {
            const accumulator = (currentTerm, key) => {
                return this.nestedFilterCheck(currentTerm, data, key);
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
        }
    }

    applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
        const filterValue = (event.target as HTMLInputElement).value;
        dataSource.filter = filterValue.trim().toLowerCase();
        if (dataSource.paginator) {
            dataSource.paginator.firstPage();
        }
    }

}
