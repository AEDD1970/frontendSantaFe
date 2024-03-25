import { Box, Button, CardActions, Divider, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

interface IDetailsProduct {
  modalDelete: (data: boolean) => void;
  idProduct: string
}
export default function DetailsProduct({ modalDelete, idProduct }: IDetailsProduct) {
  const [product, setProduct] = useState({name:"",
  description:"",
  price: 0,
  quantity: 0,
  create: ''});
  const deleteProduct = () => {
    modalDelete(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/api/products?id=${idProduct}`
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [idProduct]);
  return (
    <Fragment>
      <Box>
        <Typography variant="body2" color={"secondary"}  >
          Name: {product.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Description: {product.description}
        </Typography>
        <Divider/>
        <Typography sx={{ fontSize: 14 }}  color="text.secondary">
          Price: {product.price}$
          <br />
          Quantity: {product.quantity}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date Create: {product.create}
        </Typography>
      </Box>
      <CardActions>
        <Button variant="contained" color="secondary" size="small" onClick={deleteProduct}>
          Remove
        </Button>
      </CardActions>
    </Fragment>
  );
}
