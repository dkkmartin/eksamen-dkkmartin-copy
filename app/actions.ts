'use server'

import { addUserToActivity, fetchToken, getSearch, removeUserFromActivity } from '@/lib/api'
import { loginSchema } from '@/schemas/loginSchema'
import { searchSchema } from '@/schemas/searchSchema'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: unknown, formData: FormData) {
  const cookieStore = cookies()

  const form = {
    username: formData.get('username'),
    password: formData.get('password'),
  }

  const validatedFields = loginSchema.safeParse(form)

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {
        username: validatedFields.error.flatten().fieldErrors.username || [],
        password: validatedFields.error.flatten().fieldErrors.password || [],
      },
    }
  }
  try {
    const response = await fetchToken(form)
    if (response.status === 200) {
      cookieStore.set('token', response.data.token, {
        expires: new Date(response.data.validUntil),
      })
      cookieStore.set('role', response.data.role, {
        expires: new Date(response.data.validUntil),
      })
      cookieStore.set('userId', response.data.userId.toString(), {
        expires: new Date(response.data.validUntil),
      })
      return {
        success: true,
        message: 'Login successful',
      }
    } else if (response.status === 401) {
      return {
        success: false,
        message: 'Ugyldigt brugernavn eller password',
      }
    } else {
      return {
        success: false,
        message: response.message,
      }
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Internal server error',
    }
  }
}

export async function searchAction(prevState: unknown, formData: FormData) {
  const query = formData.get('search')

  const validatedFields = searchSchema.safeParse({ query })

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.query?.[0],
    }
  }

  try {
    const data = await getSearch(query as string)

    if (data.error) {
      return {
        success: false,
        error: data.error,
      }
    }

    return {
      success: true,
      activities: data,
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: 'An error occurred while searching',
    }
  }
}

export async function tilmeldAction(activityId: string, isTilmeldt: boolean) {
  const cookieStore = cookies()

  if (!cookieStore.get('token') && !cookieStore.get('userId')) {
    redirect('/login')
  }

  try {
    const response = isTilmeldt
      ? await removeUserFromActivity(
          activityId,
          cookieStore.get('userId')?.value as string,
          cookieStore.get('token')?.value as string
        )
      : await addUserToActivity(
          activityId,
          cookieStore.get('userId')?.value as string,
          cookieStore.get('token')?.value as string
        )
    if (response.status === 200) {
      return {
        success: true,
        message: isTilmeldt ? 'Du er nu fjernet fra aktiviteten' : 'Du er nu tilmeldt aktiviteten',
      }
    } else {
      return {
        success: false,
        message: isTilmeldt ? 'Fjernelse fejlede' : 'Tilmelding fejlede',
      }
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Internal server error',
    }
  }
}
