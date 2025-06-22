import React from 'react';

interface StarRatingProps {
    rating: number;
    maxStars?: number;
    starSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Predefined sizes
    filledColor?: string;
    emptyColor?: string;
    showText?: boolean;
    textColor?: string;
    textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxStars = 5,
    starSize = 'md',
    filledColor = 'text-yellow-300',
    emptyColor = 'text-gray-300 dark:text-gray-500',
    showText = true,
    textColor = 'text-gray-500 dark:text-gray-400',
    textSize = 'sm',
    className = ''
}) => {
    // Calculate full stars and clamp values
    const fullStars = Math.min(Math.max(Math.floor(rating), 0), maxStars);
    const hasHalfStar = rating % 1 >= 0.5 && fullStars < maxStars;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    // Size classes
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8'
    };

    // Text size classes
    const textSizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    // Star SVG component
    const StarIcon = ({ filled }: { filled: boolean }) => (
        <svg
            className={`${sizeClasses[starSize]} me-1 ${filled ? filledColor : emptyColor}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
        >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
    );

    return (
        <div className={`flex items-center ${className}`}>
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <StarIcon key={`full-${i}`} filled={true} />
            ))}

            {/* Half star (optional) */}
            {hasHalfStar && (
                <div className={`relative ${sizeClasses[starSize]} me-1`}>
                    <svg
                        className={`absolute ${emptyColor}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                        className={`absolute ${filledColor}`}
                        style={{ width: '50%', overflow: 'hidden' }}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                </div>
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <StarIcon key={`empty-${i}`} filled={false} />
            ))}

            {/* Rating text */}
            {showText && (
                <div className="ms-1 flex items-center gap-1">
                    <span className={`${textSizeClasses[textSize]} font-medium ${textColor}`}>
                        {rating.toFixed(2)}
                    </span>
                    <span className={`${textSizeClasses[textSize]} font-medium ${textColor}`}>
                        out of
                    </span>
                    <span className={`${textSizeClasses[textSize]} font-medium ${textColor}`}>
                        {maxStars}
                    </span>
                </div>
            )}
        </div>
    );
};

export default StarRating;