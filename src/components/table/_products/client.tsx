import { DataTable } from "@/components/table/data-table";
import { columns, ProductColumn } from "./column";
import { priorities, statuses } from "../data/data";

interface ProductClientProps {
  data: ProductColumn[];
  handleAddRef: (
    key: string,
    el: HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | null
  ) => void;
}

export const ProductClient: React.FC<ProductClientProps> = ({ data, handleAddRef }) => {
  const filterData = [
    { field: "status", options: statuses },
    { field: "priority", options: priorities },
  ];

  return (
    <DataTable
      searchKey="product_info"
      filterData={filterData}
      columns={columns}
      data={data}
      paginations={[5, 10, 15, 20]}
      handleAddRef={handleAddRef}
    />
  );
};
