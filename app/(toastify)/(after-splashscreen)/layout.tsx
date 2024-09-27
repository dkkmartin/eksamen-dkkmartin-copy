import NavigationBar from '@/components/navigationBar'
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <NavigationBar />
    </>
  )
}
