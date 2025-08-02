import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4', 
  rounded = 'rounded' 
}) => (
  <div 
    className={`animate-pulse bg-gray-200 ${width} ${height} ${rounded} ${className}`}
  />
);

export const RecipeCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow p-4 animate-pulse">
    {/* Image skeleton */}
    <div className="w-full h-48 bg-gray-200 rounded-xl mb-6" />
    
    {/* Content skeleton */}
    <div className="h-[calc(2/7*12rem)] bg-gray-200 rounded p-3">
      {/* Title skeleton */}
      <div className="h-4 bg-gray-300 rounded mb-2" />
      
      {/* Meta info skeleton */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded" />
          <div className="w-8 h-3 bg-gray-300 rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded" />
          <div className="w-12 h-3 bg-gray-300 rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded" />
          <div className="w-16 h-3 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export const RecipeGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <RecipeCardSkeleton key={index} />
    ))}
  </div>
);

export const CategorySkeleton: React.FC = () => (
  <div className="mb-12">
    <div className="h-8 bg-gray-200 rounded mb-4 w-48" />
    <div className="flex overflow-x-auto gap-6 pb-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex-shrink-0 w-64">
          <RecipeCardSkeleton />
        </div>
      ))}
    </div>
  </div>
);

export const HomePageSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Hero section skeleton */}
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_7rem] items-center gap-4">
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
        <div className="w-28 h-28 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Plan semaine skeleton */}
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_7rem] items-center gap-4">
        <div>
          <div className="h-10 bg-gray-200 rounded w-2/3 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
        <div className="w-20 h-20 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Categories skeleton */}
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md px-6 py-6">
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  </div>
);

export default Skeleton; 