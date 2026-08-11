import { NextResponse } from 'next/server'
import { getServiceTiers } from '@/lib/data'

export async function GET() {
  const services = await getServiceTiers()

  return NextResponse.json(
    { data: services },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    },
  )
}
