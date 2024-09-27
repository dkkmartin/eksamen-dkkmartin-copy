import Tilmeld from '@/components/tilmeld'
import { getData } from '@/lib/api'

import Image from 'next/image'

async function Page({ params }: { params: { id: string } }) {
  const data = await getData(`activities/${params.id}`)

  return (
    <div className="h-screen">
      <section className="relative">
        <Image
          className="w-full max-h-[490px] object-cover"
          src={data.asset.url}
          alt={data.name}
          height={490}
          width={410}
        />
        <Tilmeld
          className="w-64 absolute bottom-6 right-6 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.5)] flex items-center justify-center"
          activityId={params.id}
          ageLimit={{ minAge: data.minAge, maxAge: data.maxAge }}
          weekday={data.weekday}
        />
      </section>
      <article className="text-lg container pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{data.name}</h1>
          <h1 className="text-2xl">Tid: {data.time}</h1>
        </div>
        <div className="flex justify-between items-center">
          <h2 className=" capitalize">Dag: {data.weekday}</h2>
          <h2 className="">
            Alder: {data.minAge}-{data.maxAge} år
          </h2>
        </div>

        <p className="pt-4">{data.description}</p>
      </article>
    </div>
  )
}

export default Page
