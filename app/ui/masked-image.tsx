'use client'

import Image from 'next/image'
import clsx from 'clsx'

type MaskedImageProps = {
  src: string
  alt: string
  className?: string
  mask?: 'blob-1' | 'blob-2' | 'blob-3'
  rotation?: 'left' | 'right' | 'none'
  priority?: boolean
  sizes?: string
}

export default function MaskedImage({
  src,
  alt,
  className,
  mask = 'blob-1',
  rotation = 'none',
  priority = false,
  sizes = '100vw',
}: MaskedImageProps) {
  const maskStyle = {
    WebkitMaskImage: `url('/masks/${mask}.svg')`,
    maskImage: `url('/masks/${mask}.svg')`,
    WebkitMaskRepeat: 'no-repeat' as const,
    maskRepeat: 'no-repeat' as const,
    WebkitMaskPosition: 'center' as const,
    maskPosition: 'center' as const,
    WebkitMaskSize: 'contain' as const,
    maskSize: 'contain' as const,
  }

  return (
    <div
      className={clsx(
        'relative',
        rotation === 'left' && '-rotate-2',
        rotation === 'right' && 'rotate-2',
        className
      )}
    >
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={maskStyle}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            ...maskStyle,
            boxShadow: 'inset 0 0 0 2px rgba(62, 35, 14, 0.18)',
          }}
        />
      </div>
    </div>
  )
}
