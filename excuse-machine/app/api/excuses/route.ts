import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const excuses = await prisma.excuse.findMany({
      orderBy: [
        { votes: 'desc' },
        { created_at: 'desc' }
      ]
    })
    return NextResponse.json(excuses)
  } catch (error) {
    console.error('Error fetching excuses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch excuses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { excuse_text } = body

    if (!excuse_text || typeof excuse_text !== 'string' || excuse_text.trim().length === 0) {
      return NextResponse.json(
        { error: 'excuse_text is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    const excuse = await prisma.excuse.create({
      data: {
        excuse_text: excuse_text.trim(),
        votes: 0
      }
    })

    return NextResponse.json(excuse, { status: 201 })
  } catch (error) {
    console.error('Error creating excuse:', error)
    return NextResponse.json(
      { error: 'Failed to create excuse' },
      { status: 500 }
    )
  }
}
