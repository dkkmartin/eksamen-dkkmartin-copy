import { Activity } from '@/types/activity'

export async function getData(endpoint: string) {
  const URL = process.env.API_URL
  if (!URL) throw new Error('API_URL is not defined')

  try {
    const response = await fetch(`${URL}/api/v1/${endpoint}`)

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return { status: response.status, message: 'Failed to fetch data' }
    }
  } catch (err) {
    console.error(err)
    return { status: 500, message: 'Internal server error' }
  }
}

export async function getSearch(query: string) {
  const URL = process.env.API_URL
  if (!URL) throw new Error('API_URL is not defined')

  try {
    const data = await getData('activities')
    const filteredData = data.filter((item: Activity) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    if (filteredData.length === 0) {
      return {
        error: 'Der blev ikke fundet nogen aktiviteter. Prøv at søge efter noget andet.',
      }
    } else {
      return filteredData
    }
  } catch (err) {
    console.error(err)
    return { status: 500, error: 'Internal server error' }
  }
}

export async function fetchToken(credentials: Record<string, unknown>) {
  const URL = process.env.API_URL_AUTH
  if (!URL) throw new Error('API_URL_AUTH is not defined')

  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (res.ok) {
      const data = await res.json()
      return { status: res.status, data }
    } else {
      return { status: res.status, message: 'Failed to fetch token' }
    }
  } catch (err) {
    console.error(err)
    return { status: 500, message: 'Internal server error' }
  }
}

export async function getUserData(userId: string, token: string) {
  const URL = process.env.API_URL
  if (!URL) throw new Error('API_URL is not defined')
  try {
    const res = await fetch(`${URL}/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      const data = await res.json()
      return { status: res.status, data }
    } else {
      return { status: res.status, message: 'Failed to fetch user data' }
    }
  } catch (err) {
    console.error(err)
    return { status: 500, message: 'Internal server error' }
  }
}

export async function removeUserFromActivity(activityId: string, userId: string, token: string) {
  const URL = process.env.API_URL
  if (!URL) throw new Error('API_URL is not defined')
  try {
    const res = await fetch(`${URL}/api/v1/users/${userId}/activities/${activityId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      return { status: res.status }
    } else {
      return { status: res.status, message: 'Failed to remove user from activity' }
    }
  } catch (err) {
    console.error(err)
    return { status: 500, message: 'Internal server error' }
  }
}

export async function addUserToActivity(activityId: string, userId: string, token: string) {
  const URL = process.env.API_URL
  if (!URL) throw new Error('API_URL is not defined')
  try {
    const res = await fetch(`${URL}/api/v1/users/${userId}/activities/${activityId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      const data = await res.json()
      return { status: res.status, data }
    } else {
      return { status: res.status, message: 'Failed to add user to activity' }
    }
  } catch (err) {
    console.error(err)
    return { status: 500, message: 'Internal server error' }
  }
}
