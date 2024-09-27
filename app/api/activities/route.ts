import { getData } from '@/lib/api'

export async function GET() {
  try {
    const data = await getData('activities')
    return Response.json(data)
  } catch (err) {
    console.error(err)
  }
}
