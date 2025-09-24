import React, { useState, useEffect, useRef } from 'react'

// Better fallback image that matches Booking.com style
const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjRTVFN0VCIiBzdHJva2U9IiNEMUQ1REIiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSIxMjAiIGN5PSI4NSIgcj0iMTAiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTExMCAxMTBMMTMwIDkwTDE2MCAzMDBMMTkwIDEwMCIgc3Ryb2tlPSIjRDFENURCIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPHRleHQgeD0iMTUwIiB5PSIxNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZCNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgdW5hdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo='

// Booking.com style placeholder for different property types
const getPlaceholderForType = (type?: string) => {
  const baseStyle = "w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
  
  switch (type) {
    case 'hotel':
      return {
        className: `${baseStyle} from-blue-50 to-blue-100`,
        content: '🏨'
      }
    case 'apartment':
      return {
        className: `${baseStyle} from-green-50 to-green-100`,
        content: '🏠'
      }
    case 'resort':
      return {
        className: `${baseStyle} from-orange-50 to-orange-100`,
        content: '🏖️'
      }
    case 'flight':
      return {
        className: `${baseStyle} from-sky-50 to-sky-100`,
        content: '✈️'
      }
    case 'car':
      return {
        className: `${baseStyle} from-purple-50 to-purple-100`,
        content: '🚗'
      }
    default:
      return {
        className: baseStyle,
        content: '🏨'
      }
  }
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  propertyType?: string;
  lazy?: boolean;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}

export function ImageWithFallback({ 
  propertyType, 
  lazy = true, 
  aspectRatio = 'landscape',
  ...props 
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(!lazy)
  const imgRef = useRef<HTMLDivElement>(null)

  const handleError = () => {
    setDidError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [lazy])

  const { src, alt, style, className, ...rest } = props
  const placeholder = getPlaceholderForType(propertyType)

  // Aspect ratio classes
  const aspectRatioClass = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]'
  }[aspectRatio]

  if (didError) {
    return (
      <div
        ref={imgRef}
        className={`${placeholder.className} ${className ?? ''} ${aspectRatioClass} relative overflow-hidden rounded-lg border border-gray-200`}
        style={style}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
          <div className="text-4xl mb-2">{placeholder.content}</div>
          <div className="text-xs text-gray-500 text-center px-2">
            Image unavailable
          </div>
        </div>
      </div>
    )
  }

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`${placeholder.className} ${className ?? ''} ${aspectRatioClass} relative overflow-hidden rounded-lg border border-gray-200`}
        style={style}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse bg-gray-300 w-full h-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div ref={imgRef} className={`relative ${aspectRatioClass} overflow-hidden rounded-lg`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse bg-gray-300 w-full h-full"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className ?? ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 w-full h-full object-cover`}
        style={style} 
        {...rest} 
        onError={handleError}
        onLoad={handleLoad}
        loading={lazy ? "lazy" : "eager"}
      />
    </div>
  )
}
