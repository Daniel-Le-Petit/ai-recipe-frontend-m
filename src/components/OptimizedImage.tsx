import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const FALLBACK_IMAGE = '/Images/fallback-recipe.jpg';

// Fonction utilitaire pour extraire le public_id Cloudinary
function getCloudinaryPublicId(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/upload\/([^\.]+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
}

// Fonction pour vérifier si l'URL est une image Cloudinary
function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

// Fonction pour vérifier si l'URL est une image locale
function isLocalImage(url: string): boolean {
  return url.startsWith('/') || url.startsWith('./');
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  fallbackSrc = FALLBACK_IMAGE,
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    } else {
      setIsLoading(false);
      onError?.();
    }
  };

  // Si l'image n'est pas encore en vue, afficher un skeleton
  if (!isInView && !priority) {
    return (
      <div ref={imageRef} className={`bg-gray-200 animate-pulse ${className}`}>
        <div 
          className="w-full h-full bg-gray-200 rounded"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
    );
  }

  // Image Cloudinary
  if (isCloudinaryUrl(imageSrc)) {
    const cloudinaryId = getCloudinaryPublicId(imageSrc);
    if (cloudinaryId) {
      return (
        <div ref={imageRef} className={`relative ${className}`}>
          <CldImage
            src={cloudinaryId}
            width={width}
            height={height}
            alt={alt}
            className={`transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
            quality={85}
            format="auto"
            loading={priority ? 'eager' : 'lazy'}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
          )}
        </div>
      );
    }
  }

  // Image locale avec Next.js Image
  if (isLocalImage(imageSrc)) {
    return (
      <div ref={imageRef} className={`relative ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          priority={priority}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
      </div>
    );
  }

  // Image externe avec fallback
  return (
    <div ref={imageRef} className={`relative ${className}`}>
      <motion.img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
        style={{ width: `${width}px`, height: `${height}px` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
};

// Composant spécialisé pour les cartes de recettes
export const RecipeImage: React.FC<{
  src?: string | null;
  alt: string;
  className?: string;
  compact?: boolean;
}> = ({ src, alt, className = '', compact = false }) => {
  const width = compact ? 280 : 400;
  const height = compact ? 200 : 300;

  return (
    <OptimizedImage
      src={src || FALLBACK_IMAGE}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover rounded-xl shadow ${className}`}
      fallbackSrc={FALLBACK_IMAGE}
    />
  );
};

// Composant pour les images de profil
export const ProfileImage: React.FC<{
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ src, alt, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 100
  };

  return (
    <OptimizedImage
      src={src || '/Images/default-avatar.png'}
      alt={alt}
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={`object-cover rounded-full ${className}`}
      fallbackSrc="/Images/default-avatar.png"
    />
  );
};

export default OptimizedImage; 