import React from 'react'

function CustomButton({
  onClick,
  className,
  children,
}: {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-dark-purple text-white text-lg px-4 py-3 rounded-lg active:scale-95`}
    >
      {children}
    </button>
  )
}

export default CustomButton
