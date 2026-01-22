import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const excuse = await prisma.excuse.findUnique({
      where: { id }
    })

    if (!excuse) {
      return NextResponse.json(
        { error: 'Excuse not found' },
        { status: 404 }
      )
    }

    const updatedExcuse = await prisma.excuse.update({
      where: { id },
      data: {
        votes: {
          increment: 1
        }
      }
    })

    return NextResponse.json(updatedExcuse)
  } catch (error) {
    console.error('Error upvoting excuse:', error)
    return NextResponse.json(
      { error: 'Failed to upvote excuse' },
      { status: 500 }
    )
  }
}
