function HeaderTitle({ title }: { title: string }) {
  return (
    <div className="sticky top-4 z-50 pt-2">
      <h1 className="text-3xl mx-4 backdrop-blur-lg rounded-full py-2 px-4">
        {title}
      </h1>
    </div>
  )
}

export default HeaderTitle
