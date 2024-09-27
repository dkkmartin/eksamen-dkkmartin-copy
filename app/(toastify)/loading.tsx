import { LoaderCircle } from 'lucide-react'

function Loading() {
  return (
    <section className="h-screen flex items-center justify-center">
      <LoaderCircle className="animate-spin size-24" />
    </section>
  )
}

export default Loading
