import React, { useState, useEffect, useRef } from 'react'

// Multiple fallback images for better reliability
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&crop=center'
]

// Enhanced SVG fallback
const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGOUZBIi8+CjxyZWN0IHg9IjEwMCIgeT0iNzUiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiByeD0iMTIiIGZpbGw9IiNFNUU3RUIiIHN0cm9rZT0iI0QxRDVEQiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE0MCIgY3k9IjEyNSIgcj0iMTUiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTEyMCAxNzVMMTYwIDEzNUwyMDAgMTc1TDI2MCA5NSIgc3Ryb2tlPSIjRDFENURCIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KPHN2ZyB4PSIxNzAiIHk9IjI0MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwIj4KPHRleHQgeD0iMzAiIHk9IjE1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+'

// Property type placeholders with better styling
const getPlaceholderForType = (type?: string) => {
  const baseStyle = "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br text-white relative overflow-hidden"
  
  const typeConfig = {
    hotel: {
      className: `${baseStyle} from-blue-500 to-blue-600`,
      emoji: '🏨',
      text: 'Hotel'
    },
    apartment: {
      className: `${baseStyle} from-green-500 to-green-600`,
      emoji: '🏠',
      text: 'Apartment'
    },
    resort: {
      className: `${baseStyle} from-orange-500 to-orange-600`,
      emoji: '🏖️',
      text: 'Resort'
    },
    flight: {
      className: `${baseStyle} from-sky-500 to-sky-600`,
      emoji: '✈️',
      text: 'Flight'
    },
    car: {
      className: `${baseStyle} from-purple-500 to-purple-600`,
      emoji: '🚗',
      text: 'Car Rental'
    },
    destination: {
      className: `${baseStyle} from-teal-500 to-teal-600`,
      emoji: '🌍',
      text: 'Destination'
    }
  }
  
  return typeConfig[type as keyof typeof typeConfig] || typeConfig.hotel
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  propertyType?: string;
  lazy?: boolean;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  showPlaceholderText?: boolean;
}

export function ImageWithFallback({ 
  propertyType = 'hotel', 
  lazy = true, 
  aspectRatio = 'landscape',
  showPlaceholderText = true,
  ...props 
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(props.src)
  const [fallbackIndex, setFallbackIndex] = useState(-1)
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(!lazy)
  const imgRef = useRef<HTMLDivElement>(null)

  const handleError = () => {
    if (fallbackIndex < FALLBACK_IMAGES.length - 1) {
      // Try next fallback image
      const nextIndex = fallbackIndex + 1
      setFallbackIndex(nextIndex)
      setCurrentSrc(FALLBACK_IMAGES[nextIndex])
    } else {
      // All fallbacks failed, show placeholder
      setDidError(true)
      setIsLoading(false)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Reset when src changes
  useEffect(() => {
    setCurrentSrc(props.src)
    setFallbackIndex(-1)
    setDidError(false)
    setIsLoading(true)
  }, [props.src])

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
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <div className="text-6xl mb-3 drop-shadow-lg">{placeholder.emoji}</div>
          {showPlaceholderText && (
            <>
              <div className="text-lg font-semibold mb-1 drop-shadow">{placeholder.text}</div>
              <div className="text-sm opacity-90 drop-shadow">Image unavailable</div>
            </>
          )}
        </div>
      </div>
    )
  }

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 ${className ?? ''} ${aspectRatioClass} relative overflow-hidden rounded-lg border border-gray-200`}
        style={style}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse bg-gray-300 w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-4xl">{placeholder.emoji}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={imgRef} className={`relative ${aspectRatioClass} overflow-hidden rounded-lg bg-gray-100`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
          <div className="animate-pulse bg-gray-300 w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-4xl">{placeholder.emoji}</div>
          </div>
        </div>
      )}
      <img 
        src={currentSrc} 
        alt={alt || `${placeholder.text} image`} 
        className={`${className ?? ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 w-full h-full object-cover`}
        style={style} 
        {...rest} 
        onError={handleError}
        onLoad={handleLoad}
        loading={lazy ? "lazy" : "eager"}
      />
    </div>
  )
}
