import React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(({ 
  className, 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  
  // Apple-inspired card variants
  const variants = {
    default: 'bg-white rounded-apple-lg shadow-apple border border-gray-200',
    elevated: 'bg-white rounded-apple-lg shadow-apple-md border border-gray-200',
    minimal: 'bg-white rounded-apple-lg border border-gray-200',
    glass: 'bg-white/80 backdrop-blur-apple rounded-apple-lg border border-gray-200/50',
    outline: 'bg-transparent rounded-apple-lg border border-gray-200',
    filled: 'bg-gray-50 rounded-apple-lg border border-gray-200',
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 rounded-apple-lg border border-blue-200'
  };
  
  return (
    <div
      className={cn(
        'transition-all duration-200',
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Header Component (More Compact)
const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 md:p-6 border-b border-gray-200', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

// Card Body Component (More Compact)
const CardBody = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 md:p-6', className)}
    {...props}
  >
    {children}
  </div>
));

CardBody.displayName = 'CardBody';

// Card Footer Component (More Compact)
const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 md:p-6 border-t border-gray-200 bg-gray-50 rounded-b-apple-lg', className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

// Card Title Component
const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-title', className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

// Card Description Component
const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-body mt-2', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

// Feature Card Component (Apple-style feature showcase)
const FeatureCard = React.forwardRef(({ 
  className, 
  icon: Icon, 
  title, 
  description,
  variant = 'default',
  interactive = false,
  ...props 
}, ref) => {
  
  const iconColors = {
    default: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-orange-500',
    error: 'text-red-500',
    purple: 'text-purple-500'
  };
  
  return (
    <Card
      ref={ref}
      className={cn(
        'text-center group',
        interactive && 'cursor-pointer hover:shadow-apple-lg hover:scale-105',
        className
      )}
      {...props}
    >
      <CardBody className="stack-apple">
        {Icon && (
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-50 rounded-apple-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <Icon className={cn('w-8 h-8', iconColors[variant])} />
            </div>
          </div>
        )}
        
        {title && (
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        )}
        
        {description && (
          <CardDescription className="mt-0">{description}</CardDescription>
        )}
      </CardBody>
    </Card>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Stats Card Component (Apple-style metrics display)
const StatsCard = React.forwardRef(({ 
  className, 
  title,
  value,
  description,
  trend,
  trendIcon: TrendIcon,
  variant = 'default',
  ...props 
}, ref) => {
  
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  };
  
  return (
    <Card
      ref={ref}
      className={cn('hover:shadow-apple-lg transition-shadow', className)}
      {...props}
    >
      <CardBody className="text-center">
        <div className="stack-apple">
          {title && (
            <p className="text-caption font-medium text-gray-500 uppercase tracking-wider">
              {title}
            </p>
          )}
          
          {value && (
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          )}
          
          {trend && (
            <div className="flex items-center justify-center gap-1">
              {TrendIcon && (
                <TrendIcon className={cn('w-4 h-4', trendColors[trend.type])} />
              )}
              <span className={cn('text-sm font-medium', trendColors[trend.type])}>
                {trend.value}
              </span>
            </div>
          )}
          
          {description && (
            <p className="text-body text-gray-500 mt-2">{description}</p>
          )}
        </div>
      </CardBody>
    </Card>
  );
});

StatsCard.displayName = 'StatsCard';

// Profile Card Component (Apple-style user profile)
const ProfileCard = React.forwardRef(({ 
  className, 
  avatar,
  name,
  title,
  description,
  actions,
  ...props 
}, ref) => {
  
  return (
    <Card
      ref={ref}
      className={cn('text-center', className)}
      {...props}
    >
      <CardBody className="stack-apple">
        {avatar && (
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
              {typeof avatar === 'string' ? (
                <img 
                  src={avatar} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                avatar
              )}
            </div>
          </div>
        )}
        
        {name && (
          <CardTitle className="text-xl">{name}</CardTitle>
        )}
        
        {title && (
          <p className="text-subtitle text-gray-600 -mt-2">{title}</p>
        )}
        
        {description && (
          <CardDescription className="mt-0">{description}</CardDescription>
        )}
        
        {actions && (
          <div className="flex-apple justify-center mt-4">
            {actions}
          </div>
        )}
      </CardBody>
    </Card>
  );
});

ProfileCard.displayName = 'ProfileCard';

// Export all components
export { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  CardTitle, 
  CardDescription,
  FeatureCard,
  StatsCard,
  ProfileCard 
};

export default Card; 