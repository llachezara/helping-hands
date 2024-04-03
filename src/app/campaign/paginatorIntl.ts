import { MatPaginatorIntl } from "@angular/material/paginator";

export class PaginatorIntl extends MatPaginatorIntl{
    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        return `Page ${page+1} of ${Math.ceil(length/pageSize)}`
    } 
}