import * as React from "react";
import { useState, useEffect } from "react";
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

  const [originalRows,setOriginalRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  
  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw res
    })
    .then(data => {
      setOriginalRows(data);
      setRows(data);
    })
    .catch(err => {
       console.error('Error fetching data: ',err);
    })
  },[])

  const classes = useStyles();

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
