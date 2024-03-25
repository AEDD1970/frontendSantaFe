// ** Third Party Imports
import * as yup from 'yup'

export const  schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })
  
  export const defaultValues = {
    password: '',
    email: ''
  }
  
  export interface FormData {
    email: string
    password: string
  }
  