import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formatNumber } from "@/lib/utils";

export type ProductColumn = {
  id: string;
  product_info: string;
  thumbnail: string;
  price: string;
  stock: string;
  sold: string;
  isActive: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] translate-x-3"
      />
    ),
    cell: ({ row }) => (
      <>
        {row.original.id.toString().length > 0 && (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px] translate-x-3"
          />
        )}
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_info",
    header: "Product Info",
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-2">
        {row.original.product_info.length > 0 && (
          <>
            <div className="w-8 overflow-hidden rounded-md shadow-lg border-2 border-white">
              <img
                src={row.original.thumbnail}
                alt={row.original.product_info}
              />
            </div>
            <span className="capitalize">{row.original.product_info}</span>
          </>
        )}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.price.length <= 0
          ? row.original.price
          : formatNumber(+row.original.price)}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <span className="capitalize">{row.original.stock}</span>,
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ row }) => <span className="capitalize">{row.original.sold}</span>,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (
      <div
        className="inline-flex items-center gap-2"
        style={
          {
            "--primary": "238.7 83.5% 66.7%",
            "--ring": "238.7 83.5% 66.7%",
          } as React.CSSProperties
        }
      >
        {row.original.isActive !== undefined && (
          <>
            <Switch
              id={`switch-${row.original.id}`}
              checked={row.original.isActive}
            />
            <Label htmlFor={`switch-${row.original.id}`} className="sr-only">
              Colored switch
            </Label>
          </>
        )}
      </div>
    ),
  },
];
