"use client";
import OutlinedCard from "@/components/card";
import DetailsProduct from "@/components/products/details";
import TableProducts from "@/components/products/listTable";
import Image from "next/image";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomModal from "@/components/modal";
import { useEffect, useState } from "react";
import ProductForm from "@/components/products/add";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import CustomSnackbar from "@/components/toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function RootPageProduct() {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [idProduct, setID] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
  });
  const router = useRouter()

  const deleteProduct = async () => {
    try {
      const deleteProduct = await axios.delete(
        `/api/products?id=${idProduct}`
      );
      fetchData()
      setOpenModalDelete(!openModalDelete)
      setID("")
      setToast({ open: true,
        message: "delete product",
       })
    } catch (error) {
      setToast({ open: true,
        message: "error delete product"})
      console.log(error)
    }
  }

  const fetchData = async () => {
    const { page, pageSize } = paginationModel;
    try {
      const { data } = await axios.get(
        `/api/products?pageNumber=${page}&limit=${pageSize}`
      );
      setRows(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  const logout = () => {
    signOut()
    router.push('/')
  }

  

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Box padding={5} display={'flex'} justifyContent={"flex-end"}>
        <Button variant="contained" onClick={logout}>Exit App</Button>
      </Box>
      <Typography color={"secondary"} variant="h3" component="h2">
        PRODUCTS
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <OutlinedCard>
            <Box mb={3} display={"flex"} justifyContent={"flex-end"}>
            <Button  variant="contained" onClick={()=> setOpenModal(true)}>Create</Button>
            </Box>
            <TableProducts setID={setID} rows={rows} paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
          </OutlinedCard>
        </Grid>
        <Grid item xs={5}>
          <OutlinedCard>
            {idProduct ? (
              <DetailsProduct
                modalDelete={setOpenModalDelete}
                idProduct ={idProduct}
              />
            ) : (
              <Typography variant="h4" textAlign={"center"} gutterBottom>
                select a table option
              </Typography>
            )}
          </OutlinedCard>
          <Box mt={2} display={"flex"} justifyContent={"center"}>
            <Image
              src="/Wavy_Bus-17_Single-03.jpg"
              alt="check-products"
              width={450}
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
        <ProductForm openModal={openModal} handleClose={()=> setOpenModal(!openModal)} fetchData={fetchData}/>
      <CustomModal
        openModal={openModalDelete}
        handleClose= {() => setOpenModalDelete(!openModalDelete)}
        handleSubmit={() => deleteProduct()}
      >
        <Box sx={{ width: "100%", p: [3, 3] }} textAlign={"center"}>
          <Typography>sure you want to</Typography>
          <Typography color={"error"}>REMOVE</Typography>
        </Box>
      </CustomModal>
      <CustomSnackbar {...toast} setToast={setToast} />
    </Box>
  );
}
