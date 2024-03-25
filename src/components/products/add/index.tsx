import { schema, defaultValues, FormData } from "@/types/products";
import CustomTextField from "@/components/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomModal from "@/components/modal";
import CustomSnackbar from "@/components/toast";
import axios from "axios";

interface IProductForm {
  handleClose: () => void;
  openModal: boolean;
  fetchData: () => void
}

export default function ProductForm({ handleClose, openModal, fetchData }: IProductForm) {
  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const buttonSubmit = useRef<HTMLButtonElement>(null);

  const onSubmit = async (fData: FormData) => {
    try {
      const { data } = await axios.post(`/api/products`, fData);
      fetchData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async () => {
    buttonSubmit.current?.click();
  };

  return (
    <CustomModal
      openModal={openModal}
      handleClose={() => handleClose()}
      handleSubmit={() => createProduct()}
    >
      <Box sx={{ width: "100%", p: [6, 8] }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Name"
                    onChange={onChange}
                    placeholder="Product"
                    error={Boolean(errors.name)}
                    aria-describedby="validation-schema-first-name"
                    {...(errors.name && { helperText: errors.name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Controller
                name="price"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Price"
                    onChange={onChange}
                    placeholder="for example 1000$"
                    error={Boolean(errors.price)}
                    aria-describedby="validation-schema-first-price"
                    {...(errors.price && { helperText: errors.price.message })}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={3}
                    value={value}
                    label="Description"
                    onChange={onChange}
                    placeholder="Short description"
                    error={Boolean(errors.description)}
                    aria-describedby="validation-schema-first-description"
                    {...(errors.description && {
                      helperText: errors.description.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Quantity"
                    onChange={onChange}
                    placeholder="for exmaple 2"
                    error={Boolean(errors.quantity)}
                    aria-describedby="validation-schema-first-quantity"
                    {...(errors.quantity && {
                      helperText: errors.quantity.message,
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <button
            type="submit"
            style={{ display: "none" }}
            ref={buttonSubmit}
          />
        </form>
        {/* <CustomSnackbar severity="error" message="ups" open/> */}
      </Box>
    </CustomModal>
  );
}
