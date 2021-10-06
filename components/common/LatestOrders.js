import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CardHeader, Divider } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Product Name", width: 130 },
  { field: "store", headerName: "Store Name", width: 130 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 120,
  },
  {
    field: "category",
    headerName: "Category",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const rows = [
  {
    id: 1,
    name: "Snow hgytf hcyctrcyt gfcrtdtc",
    store: "Jon",
    price: 35,
    category: "Kids",
    subCategory: "Shoes",
  },
];

export default function LatestOrders() {
  return (
    <div style={{ height: 400, maxWidth: "100%" }}>
      <CardHeader title="Latest Orders" />
      <Divider className="mb-4" />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
  );
}
