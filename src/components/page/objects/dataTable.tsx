import {
  Typography,
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { defaults } from "../content.defaults";
export interface zoneProps {
  dataTable: any;
}

export const DataTable = ({ dataTable }: zoneProps) => {
  //prepare the styles
  const [styles, setStyles] = useState<any>(defaults.dataTable);
  useEffect(() => {
    if (dataTable.styles) {
      setStyles(dataTable.styles);
    }
  }, [dataTable.styles]);
  return (
    <>
      {dataTable && (
        <>
          {dataTable?.title && (
            <>
              <Typography
                variant="h4"
                component="div"
                sx={_.cloneDeep(styles[0].title.Typography)}
              >
                {dataTable.title}
              </Typography>
            </>
          )}
          {dataTable?.info && (
            <>
              <Typography
                variant="body1"
                component="div"
                sx={_.cloneDeep(styles[1].info.Typography)}
              >
                {dataTable.info}
              </Typography>
            </>
          )}
          {dataTable?.columns && (
            <Box component="div" sx={{ flexGrow: 1 }}>
              <TableContainer
                component={Paper}
                sx={_.cloneDeep(styles[2].container.TableContainer)}
              >
                <Table aria-label="table">
                  <TableHead>
                    <TableRow>
                      {dataTable.columns.map((colName: any, index: any) => (
                        <TableCell
                          align={
                            dataTable.align ? dataTable.align[index] : "left"
                          }
                          key={index}
                        >
                          {colName}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTable.rowData.map((row: any, index: any) => (
                      <TableRow key={index}>
                        {row.map((rowData: any, index: any) => (
                          <TableCell
                            align={
                              dataTable.align ? dataTable.align[index] : "left"
                            }
                            key={index}
                          >
                            {rowData}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      )}
    </>
  );
};
