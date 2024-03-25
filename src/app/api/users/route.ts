import { NextApiRequest, NextApiResponse } from 'next/types'
import axiosConfig from '@/utils/axiosConfig'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { data } = await axiosConfig.post(`users/register`, req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return Response.json({ data })

  } catch (error) {
    console.log(error)

    if (error instanceof AxiosError) {
      return NextResponse.json({ data: error.response?.data.message }, { status: error.response?.status })
    }
  }
}

export async function GET() {
  try {

  } catch (error) {

  }
}