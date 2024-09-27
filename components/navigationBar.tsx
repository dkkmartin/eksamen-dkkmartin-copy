import { Calendar, House, Search } from 'lucide-react'
import Link from 'next/link'

function NavigationBar() {
  return (
    <footer className="fixed bottom-0 w-full h-16 bg-white shadow-[0px_1px_15px_rgba(0,0,0,0.90)] z-50">
      <nav className="h-full">
        <ul className="flex justify-between px-9 items-center h-full">
          <li>
            <Link
              className="flex border rounded-full p-2 border-black active:scale-95"
              href="/aktiviteter"
              aria-label="Hjem"
            >
              <House color="black" />
            </Link>
          </li>
          <li>
            <Link
              className="flex border rounded-full p-2 border-black active:scale-95"
              href="/s%C3%B8g"
              aria-label="Søg"
            >
              <Search color="black" />
            </Link>
          </li>
          <li>
            <Link
              className="flex border rounded-full p-2 border-black active:scale-95"
              href="/kalender"
              aria-label="Kalender"
            >
              <Calendar color="black" />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default NavigationBar
