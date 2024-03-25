import axiosConfig from '@/utils/axiosConfig'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { data } = await axiosConfig.post(`users/register`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return NextResponse.json({ data })

  } catch (error) {
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