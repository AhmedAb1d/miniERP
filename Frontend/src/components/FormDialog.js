import * as React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function FormDialog(props) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    const product = ({
      title: title,
      image: image,
      quantity: quantity,
      price: price
    });
    console.log(product);
    axios.post('http://localhost:3000/api/Products',product)
    .catch(error => console.log(error));
  }

  return (
    <div>
      <AddIcon onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the fields to create a new product
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image link"
            fullWidth
            variant="standard"
            onChange={event => setImage(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            fullWidth
            variant="standard"
            onChange={event => setPrice(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            fullWidth
            variant="standard"
            onChange={event => setQuantity(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
