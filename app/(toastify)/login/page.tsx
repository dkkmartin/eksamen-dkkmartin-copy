'use client'

import CustomButton from '@/components/ui/button'
import Image from 'next/image'
import { useFormState } from 'react-dom'
import { loginAction } from '@/app/actions'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { LoaderCircle } from 'lucide-react'

function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, formAction] = useFormState(loginAction, null)
  const [loading, setLoading] = useState(false)

  function handleClick() {
    setLoading(true)
  }

  useEffect(() => {
    if (state?.errors) {
      toast.error(state?.errors.username[0] || state.errors.password[0])
    } else if (state?.message && state.success === false) {
      toast.error(state?.message)
    } else if (state?.success) {
      toast.success('Du er nu logget ind!', {
        position: 'top-right',
      })
      if (searchParams.get('redirect')) {
        router.push(searchParams.get('redirect') as string)
      } else {
        router.back()
      }
    }
    setLoading(false)
  }, [state, router, searchParams])

  return (
    <div className="h-screen text-black bg-gradient-to-br from-purple-300 to-pink-200 flex items-center justify-center relative overflow-hidden">
      <Image loading="eager" src="/Baggrund.png" alt="Landrup Dans baggrund" fill />

      <div className="absolute inset-0 bg-[#5E2E53]/40 transform rotate-[60deg] scale-125 z-10"></div>

      <div className="p-8 w-full z-50">
        <h1 className="text-4xl text-white mb-4">Log ind</h1>
        <form action={formAction} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="brugernavn"
              name="username"
              className="w-full bg-white px-4 py-2"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="adgangskode"
              name="password"
              className="w-full bg-white px-4 py-2"
            />
          </div>
          <div className="flex justify-center">
            {loading ? (
              <CustomButton className="w-2/3 py-3 rounded-lg flex justify-center gap-4 items-center">
                <LoaderCircle className="animate-spin" />
                Log ind
              </CustomButton>
            ) : (
              <CustomButton onClick={handleClick} className="w-2/3 py-3 rounded-lg">
                Log ind
              </CustomButton>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
