'use client'

import { toast } from 'react-toastify'
import CustomButton from './ui/button'
import { tilmeldAction } from '@/app/actions'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { Activity } from '@/types/user'

function Tilmeld({
  className,
  activityId,
  ageLimit,
  weekday,
}: {
  className?: string
  activityId: string
  ageLimit: { minAge: number; maxAge: number }
  weekday: string
}) {
  const [state, formAction] = useFormState(() => tilmeldAction(activityId, isSignedUp), null)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userAge, setUserAge] = useState<number | null>(null)
  const [userActivities, setUserActivities] = useState<Activity[]>([])
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const [alreadySignedUpForSameWeekday, setAlreadySignedUpForSameWeekday] = useState(false)

  function userAgeCheck() {
    if (!userAge) return false
    return userAge >= ageLimit.minAge && userAge <= ageLimit.maxAge
  }

  // Fetch fra API route for at hente brugerens data
  // Bliver rerun når shouldRefetch skifter state
  useEffect(() => {
    async function fetchUserActivities() {
      try {
        const res = await fetch('/api/user/data')
        if (res.ok) {
          const data = await res.json()
          setUserAge(data.age)
          setUserActivities(data.activities)
          setUserRole(data.role)
          setShouldRefetch(false)
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchUserActivities()
  }, [shouldRefetch])

  // Tjekker om brugeren er tilmeldt aktiviteten ved at tjekke om tilsendt parameter activityId findes i userActivities
  useEffect(() => {
    if (!userActivities) return
    const isCurrentlySignedUp: boolean = userActivities.some(
      (activity) => activity.id === parseInt(activityId)
    )
    if (isCurrentlySignedUp !== isSignedUp) {
      setIsSignedUp(isCurrentlySignedUp)
    }
  }, [userActivities, activityId, isSignedUp])

  // Tjekker om brugeren er tilmeldt en anden aktivitet på samme ugedag og ikke den aktivitet der er tilmeldt
  useEffect(() => {
    if (!userActivities) return
    const isSignedUpForDifferentWeekday: boolean = userActivities.some(
      (activity) => activity.weekday === weekday && activity.id !== parseInt(activityId)
    )
    if (isSignedUpForDifferentWeekday !== alreadySignedUpForSameWeekday) {
      setAlreadySignedUpForSameWeekday(isSignedUpForDifferentWeekday)
    }
  }, [userActivities, weekday, alreadySignedUpForSameWeekday, activityId])

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message, {
        position: 'top-right',
      })
    } else {
      toast.error(state?.message, {
        position: 'top-right',
      })
    }
  }, [state])

  if (userRole === 'instructor') return null

  if (alreadySignedUpForSameWeekday) {
    return (
      <CustomButton
        className={className}
        onClick={() =>
          toast.error('Du er allerede tilmeldt en aktivitet på samme ugedag', {
            position: 'top-right',
          })
        }
      >
        Tilmeld
      </CustomButton>
    )
  }

  return (
    <form action={formAction}>
      {userAgeCheck() ? (
        <CustomButton className={className} onClick={() => setShouldRefetch(true)}>
          {isSignedUp ? 'Forlad' : 'Tilmeld'}
        </CustomButton>
      ) : null}
      {!userActivities ? <CustomButton className={className}>Log ind</CustomButton> : null}
    </form>
  )
}

export default Tilmeld
