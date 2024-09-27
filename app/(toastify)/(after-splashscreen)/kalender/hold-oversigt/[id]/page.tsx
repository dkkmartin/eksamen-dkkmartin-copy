import { getData } from '@/lib/api'
import { User } from '@/types/user'

async function HoldOversigt({ params }: { params: { id: string } }) {
  const data = await getData(`activities/${params.id}`)
  return (
    <section className="min-h-screen container flex flex-col gap-6 pt-8">
      <div>
        <h2 className="text-4xl truncate">{data.name}</h2>
        <div className="flex gap-2">
          <p>{data.weekday}</p>
          <p>{data.time}</p>
        </div>
        <div className="pt-4">
          <h3 className="text-xl">Deltagere:</h3>
          <ul>
            {data.users.map((user: User) => (
              <li className="list-disc ml-4" key={user.id}>
                <p>
                  {user.firstname} {user.lastname}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default HoldOversigt
