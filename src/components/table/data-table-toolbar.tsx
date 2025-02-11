import { XCircle } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  filterData: {
    field: string,
    options: any[];
  }[];
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  filterData,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {filterData.map((item, index) => (
          <DataTableFacetedFilter
          key={index}
          column={table.getColumn(item.field)}
          title={item.field}
          options={item.options}
        />
        ))} */}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XCircle className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
