import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Column {
  key: string;
  name: string;
  minWidth?: number;
}

interface Props {
  columns: Column[];
  data: any[]; // Assuming data is an array of objects
}

const ReusableTable1: React.FC<Props> = ({ columns, data }) => {
  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columns);

  useEffect(() => {
    setSelectedColumns(columns);
  }, [columns]);

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          // maxHeight: 600,
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#fff",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-track": {},
        }}
      >
        <Table >
          <TableHead
            sx={{
              "& th": { backgroundColor: "#F0F1F9" },
              tableLayout: "fixed",
              overflowX: "scroll",
            }}
          >
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  padding: "10px",
                  borderRightStyle: "solid",
                  borderRightColor: "gray",
                  borderWidth: "1px",
                },
              }}
            >
              {selectedColumns.map((column) => (
                <TableCell key={column.key} style={{ minWidth: column.minWidth }}>
                  <Box
                    sx={{
                      display: "flex",
                      // justifyContent: "space-around",
                      fontWeight: "600",
                    }}
                  >
                    {column.name}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={selectedColumns.length} sx={{ textAlign: "center" }}>
                  <Typography variant="body2">No data available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "10px",
                      borderRightStyle: "solid",
                      borderRightColor: "gray",
                      borderWidth: "1px",
                    },
                  }}
                >
                  {selectedColumns.map((column) => (
                    <TableCell key={column.key}>{row[column.key]}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReusableTable1;
