import CustomButton from '@/components/ui/button'
import { racingSansOne, roboto } from '@/styles/fonts'
import Image from 'next/image'
import Link from 'next/link'

function Home() {
  return (
    <main>
      <Image
        loading="eager"
        src="/Baggrund.png"
        alt="Landrup Dans baggrund"
        fill
      />
      <div className="absolute top-1/2 left-0 w-full">
        <h1
          className={`${roboto.className} uppercase text-5xl text-stroke text-transparent pl-8 tracking-tighter`}
        >
          Landrup
        </h1>
        <h2
          className={`${racingSansOne.className} uppercase text-6xl text-stroke text-[#e856eb] pl-8`}
        >
          Dans
        </h2>
        <div className="border-b-[18px] border-[#913693] w-2/3"></div>
      </div>
      <Link
        className="fadeIn-button absolute bottom-16 left-1/2 transform -translate-x-1/2 w-1/2"
        href="/aktiviteter"
      >
        <CustomButton className="w-full">Kom i gang</CustomButton>
      </Link>
    </main>
  )
}

export default Home
