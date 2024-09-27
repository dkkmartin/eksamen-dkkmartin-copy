import Image from 'next/image'
import { Activity } from '@/types/activity'
import Link from 'next/link'

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link href={`/aktivitet/${activity.id}`}>
      <div className="w-[356px] h-[344px] relative rounded-[39px] rounded-br-none overflow-hidden shadow-xl text-black">
        <Image
          className="object-cover"
          src={activity.asset.url}
          alt={activity.name}
          fill
        />
        <div className="absolute bottom-0 left-0 w-full bg-light-purple/80 h-24 rounded-tr-[39px] flex flex-col justify-center pl-6 text-lg">
          <h2>{activity.name}</h2>
          <h3>
            {activity.minAge}-{activity.maxAge} år
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default ActivityCard
