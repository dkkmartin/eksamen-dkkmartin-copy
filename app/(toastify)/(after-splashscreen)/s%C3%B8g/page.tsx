'use client'

import { searchAction } from '@/app/actions'
import ActivityCard from '@/components/activityCard'
import { Activity } from '@/types/activity'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

function Page() {
  const [search, setSearch] = useState('')
  const [state, formAction] = useFormState(searchAction, null)

  // Debouncer
  // Venter 400ms og søger efter aktiviteter ved at lave en ny FormData og sætter det ind i formAction
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        const formData = new FormData()
        formData.append('search', search)
        formAction(formData)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [search, formAction])

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <div className="min-h-screen container flex flex-col gap-6 pt-8">
      <section>
        <h1 className="text-3xl pb-4">Søg</h1>
        <form action={formAction}>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#7d5b75] h-12 text-xl px-4"
              type="text"
              name="search"
            />
            <button type="submit">
              <Search className="absolute top-1/2 right-4 -translate-y-1/2" />
            </button>
          </div>
        </form>
      </section>
      <section className="flex flex-col items-center gap-8 pt-12 pb-24">
        {state?.success &&
          state.activities.length > 0 &&
          state.activities.map((activity: Activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
      </section>
    </div>
  )
}

export default Page
