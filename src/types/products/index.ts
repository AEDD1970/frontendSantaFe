// ** Third Party Imports
import * as yup from 'yup'

export const  schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.string().required(),
    description: yup.string(),
    quantity: yup.string()
  })
  
  export const defaultValues = {
    name: '',
    price: '',
    description: '',
    quantity: ''
  }
  
  export interface FormData {
    name: string,
    price: string,
    description?: string,
    quantity?: string
  }
  
  export interface IProduct {
    name: string,
    price: string,
    description: string,
    quantity: string
    _id: string
    create: Date
  }