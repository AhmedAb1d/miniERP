import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconMenu from "./IconMenu";

export default function ProductCard(props) {
  const [isShown, setIsShown] = useState(false);
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        action={
          <IconButton
            aria-label='settings'
            onClick={() => {
              setIsShown((current) => !current);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.date}
        />
        {isShown && (
          <IconMenu/>
        )}
      <CardMedia
        component='img'
        height='194'
        image='https://m.media-amazon.com/images/I/61YJ4uktesL._AC_SL1200_.jpg'
        alt='product image'
      />
      <CardContent>
        <Typography variant='h6' color='text.secondary'>
          Price: {props.price}dt
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Quantity: {props.quantity}
        </Typography>
      </CardContent>
    </Card>
  );
}
