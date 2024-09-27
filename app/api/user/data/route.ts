import { getUserData } from '@/lib/api'
import { Activity } from '@/types/user'
import { cookies } from 'next/headers'

export type UserData = {
  status: number
  data: {
    age: number
    activities: Activity[]
  }
  message?: string
}

export async function GET() {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')
  const token = cookieStore.get('token')

  if (!userId || !token) {
    return Response.json({ error: 'User not signed in' })
  }

  try {
    const data = await getUserData(userId.value, token.value)
    if (data.status === 200) {
      return Response.json({
        id: userId.value,
        role: data.data?.role,
        age: data.data?.age,
        activities: data.data?.activities,
      })
    } else {
      return Response.json({ error: 'Failed to fetch user data' })
    }
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Internal server error' })
  }
}
