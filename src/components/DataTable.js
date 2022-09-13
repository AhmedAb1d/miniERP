import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const originalRows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "null", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const useStyles = makeStyles({
  SearchBar: {
    borderRadius: 12,
    margin: "10px",
    width: "30%",
    right: "120px",
  },
  icon: {
    margin: 25,
    "&:hover": {
      border: "3px solid #fff",
      cursor: "pointer",
    },
  },
  iconDiv: {
    position: "absolute",
    right: "15%",
    top: "12%",
  },
});

export default function DataTable() {
  const classes = useStyles();

  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.firstName
        .toLowerCase()
        .includes(searchedVal.toString().toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <SearchBar
        value={searched}
        onChange={(searched) => requestSearch(searched)}
        onCancelSearch={() => cancelSearch()}
        className={classes.SearchBar}
      />
      <div className={classes.iconDiv}>
        <AddIcon className={classes.icon} onClick={handleClickOpen} />
        <ConstructionRoundedIcon fontSize='small' className={classes.icon} />
        <DeleteIcon className={classes.icon} />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          console.log(ids);
          
        }}
      />
    </div>
  );
}
