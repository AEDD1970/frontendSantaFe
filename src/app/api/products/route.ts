import axiosConfig from '@/utils/axiosConfig'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { AxiosError } from 'axios'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ data: 'You must be logged in.' }, { status: 401 })
    }
    const body = await req.json()
    const { data } = await axiosConfig.post(`products/register`, body ,{
      headers: {
        Authorization: `Bearer ${session.user?.token}`
      }
    })

    console.log(data)

    return NextResponse.json({data: data.message})
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return NextResponse.json( error.response?.data.message, { status: error.response?.status })
    }  
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ data: 'You must be logged in.' }, { status: 401 })
    }
    const url = new URL(req.url)

    const page = url.searchParams.get("page")
    const pageNumber = url.searchParams.get("pageNumber")
    const idProduct = url.searchParams.get('id')
    const endpoint = idProduct ? `products/${idProduct}` : `products/getAll`
    const { data } = await axiosConfig.get(endpoint, {
      params: { page, pageNumber },
      headers: {
        Authorization: `Bearer ${session.user?.token}`
      }
    })

    return NextResponse.json(data)
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ data: error.response?.data.message }, { status: error.response?.status })
    }  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ data: 'You must be logged in.' }, { status: 401 })
    }
    const url = new URL(req.url)
    const id = url.searchParams.get("id")
    const { data } = await axiosConfig.delete(`products/${id}`, {
   
      headers: {
        Authorization: `Bearer ${session.user?.token}`
      }
    })

    return NextResponse.json(data)
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ data: error.response?.data.message }, { status: error.response?.status })
    }  }
}

