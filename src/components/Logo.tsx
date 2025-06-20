'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="w-64 h-20 flex items-center px-4">
      <Image
        src="/logo-aietfinesherbes.svg"
        alt="AI et Fines Herbes"
        width={256}
        height={80}
        className="object-contain"
        priority
      />
    </div>
  )
} 