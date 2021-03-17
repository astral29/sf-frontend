import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const row = (x, i, header) => {
  return (
    <>
      <TableRow key={`tr-${i}`} selectable={false}>
        {header.map((y, k) => (
          <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default function Table1({ data, header }) {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {header.map((x, i) => (
            <TableCell key={`thc-${i}`}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>{x.name}</span>
              </div>
            </TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>{data.map((x, i) => row(x, i, header))}</TableBody>
    </Table>
  );
}
