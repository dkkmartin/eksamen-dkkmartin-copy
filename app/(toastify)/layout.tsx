import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="bg-dark-purple text-white">
      {children}
      <ToastContainer
        position="bottom-center"
        closeOnClick={true}
        pauseOnFocusLoss={false}
        limit={2}
        newestOnTop={true}
        autoClose={3000}
      />
    </main>
  )
}
