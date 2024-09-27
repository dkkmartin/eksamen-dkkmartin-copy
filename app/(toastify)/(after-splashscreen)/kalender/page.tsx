'use client'

import { Activity } from '@/types/user'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

function Page() {
  const [userActivities, setUserActivities] = useState<Activity[]>([])
  const [role, setRole] = useState<string>('')

  // Fetch user data, hvis man er instructor, så fetch alle hold, ellers fetch ens hold
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch('/api/user/data')
        if (res.ok) {
          const data = await res.json()
          setRole(data.role)
          if (data.role === 'instructor') {
            fetchAllActivities(parseInt(data.id))
          } else {
            setUserActivities(data.activities)
          }
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (err) {
        console.error(err)
      }
    }

    // Fetch alle aktiviteter og filtrere dataen ud fra instructorId
    async function fetchAllActivities(userId: number) {
      const res = await fetch('/api/activities')
      if (res.ok) {
        const data = await res.json()
        const filteredActivities = data.filter(
          (activity: Activity) => activity.instructorId === userId
        )
        setUserActivities(filteredActivities)
      }
    }

    fetchUserData()
  }, [])

  // Redirect til login hvis man ikke er logget ind med query for redirektion tilbage igen
  if (!userActivities) {
    redirect('/login?redirect=/kalender')
  }

  return (
    <section className="min-h-screen container flex flex-col gap-6 pt-8">
      <h1 className="text-3xl pb-4">Kalender</h1>
      <section className="text-black flex flex-col gap-4">
        {userActivities.map((activity: Activity) => (
          <Link
            href={
              role === 'instructor'
                ? `/kalender/hold-oversigt/${activity.id}`
                : `/aktivitet/${activity.id}`
            }
            key={activity.id}
          >
            <div className="bg-white rounded-xl p-4" key={activity.id}>
              <h2 className="text-4xl truncate">{activity.name}</h2>
              <div className="flex gap-2">
                <p>{activity.weekday}</p>
                <p>{activity.time}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </section>
  )
}

export default Page
