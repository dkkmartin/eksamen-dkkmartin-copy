import ActivityCard from '@/components/activityCard'
import HeaderTitle from '@/components/headerTitle'
import { getData } from '@/lib/api'
import { Activity } from '@/types/activity'

async function Page() {
  const data = await getData('activities')
  return (
    <>
      <HeaderTitle title="Aktivitet" />
      <div className="container pt-8">
        <section className="flex flex-col items-center gap-8 pb-24">
          {data.map((activity: Activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </section>
      </div>
    </>
  )
}

export default Page
