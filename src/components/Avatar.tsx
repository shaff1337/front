import React from 'react'

interface AvatarProps {
  src: string
  alt: string
  fallback: string
}

export function Avatar({ src, alt, fallback }: AvatarProps) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          //e.currentTarget.nextElementSibling!.style.display = 'flex'
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center text-gray-600 dark:text-gray-300"
        style={{ display: 'none' }}
      >
        {fallback}
      </div>
    </div>
  )
}
