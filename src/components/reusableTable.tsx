import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

// interface Column {
//   key: string;
//   label: string;
// }

interface Row {
  [key: string]: any;
}

interface Props {
  columns: any;
  data: any;
  rowOnClick?: (row: Row) => void;
}

const ReusableTable: React.FC<Props> = ({ columns, data, rowOnClick }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
       boxShadow:0
      }}
    >
      <TableContainer sx={{ 
      //  "&::-webkit-scrollbar": {
      //     width: "12px",
      //   },
      //   "&::-webkit-scrollbar-thumb": {
      //     backgroundColor: "#fff",
      //     borderRadius: "8px",
      //   },
      //   "&::-webkit-scrollbar-track": {
      //     // backgroundColor: "#fff",
      //   },
         }}>
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
                  // width: `${100 / (columns?.length)}%`,
                },
              }}
            >
              {columns.map((column: any) => (
                <TableCell key={column} style={{ minWidth: column.minWidth }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      fontWeight: "600",
                    }}
                  >
                    {column.name} <TuneIcon />
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReusableTable;
