"use client";
// ** MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { FormData, defaultValues, schema } from "@/types/login";
import CustomTextField from "@/components/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import CustomSnackbar from "@/components/toast";

export default function AddUser() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    createUser(data)
  };


  const createUser = async (data: FormData) => {
    try {
      const createUser = await axios.post(`/api/users`, data);
      console.log(createUser)
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Box
      sx={{
        p: [6, 12],
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextField
                  fullWidth
                  autoFocus
                  label="Email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder="email"
                  error={Boolean(errors.email)}
                  {...(errors.email && { helperText: errors.email.message })}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  onBlur={onBlur}
                  label="Password"
                  onChange={onChange}
                  id="auth-login-v2-password"
                  error={Boolean(errors.password)}
                  {...(errors.password && {
                    helperText: errors.password.message,
                  })}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              mb: 1.75,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></Box>
          <Button fullWidth type="submit" variant="contained" sx={{ mb: 4 }}>
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}
