'use client'
// ** React Imports
import { useState, ReactNode, } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from 'react-hook-form'
import { FormData , defaultValues, schema} from '@/types/login'
import CustomTextField from '@/components/text-field'
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    console.log(email , password)
    signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    })
    .then(response => {
      if (!response?.ok) throw response?.error
      router.push('/products')
    })
    .catch(err => {
      setError("email", {
        type: "manual",
        message: err,
      })
    })
  }

console.log(errors, "errors")
  return (
    <Box
    sx={{
      p: [6, 12],
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Box sx={{ my: 6 }}>
        <Typography variant='h3' sx={{ mb: 1.5 }}>
          Welcome to ! 👋🏻
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Please sign-in to your account and start the adventure
        </Typography>
      </Box>
  
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 4 }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                autoFocus
                label='Email'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder='email'
                error={Boolean(errors.email)}
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 1.5 }}>
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                value={value}
                onBlur={onBlur}
                label='Password'
                onChange={onChange}
                id='auth-login-v2-password'
                error={Boolean(errors.password)}
                {...(errors.password && { helperText: errors.password.message })}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon/>} 
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            mb: 1.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
         <Link href="/user" passHref>
        <Typography  color={"secondary"} variant="body1" >
          Register User
        </Typography>
      </Link>
          
        </Box>
        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
          Login
        </Button>
      </form>
    </Box>
  </Box>
  )
}

export default LoginPage
