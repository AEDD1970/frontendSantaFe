import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Tooltip } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { IProduct } from "@/types/products";
import { useEffect, useState } from "react";
import axios from "axios";

type PaginationModel = {
  page: number,
  pageSize: number,
}

interface IProducts {
  setID: (id: string) => void;
  rows: IProducts[]
  paginationModel: PaginationModel
  setPaginationModel: (data: PaginationModel) => void
}

interface CellType {
  row: IProduct;
}

export default function TableProducts({ setID, rows, paginationModel, setPaginationModel }: IProducts) {
 

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 0.5},
    { field: "description", headerName: "Description", flex: 1},
    {
      field: "price",
      headerName: "price",
      type: "number",
    },
    {
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => setID(row._id)}>
              <RemoveRedEye />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
         pagination
         rows={rows}
         columns={columns}
         disableRowSelectionOnClick
         pageSizeOptions={[10, 25, 50]}
         paginationModel={paginationModel}
         onPaginationModelChange={setPaginationModel}
         getRowId={row => row._id}
      />
    </div>
  );
}
