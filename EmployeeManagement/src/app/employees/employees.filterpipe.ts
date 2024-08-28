import {Pipe, PipeTransform, Injectable} from "@angular/core";
import { CommonModule } from "@angular/common";

@Pipe({
    name: 'employeeFilter'
})

@Injectable()
export class EmployeeFilterPipe implements PipeTransform {

    transform(values: any[], searchText: string): any[] {
    if(!values) return [];
    if(!searchText) return values;

        searchText = searchText.toLowerCase();

    return values.filter(v =>
      v.name.toLowerCase().startsWith(searchText.toLowerCase()));
    }
}