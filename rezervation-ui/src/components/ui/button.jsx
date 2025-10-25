import React from 'react';

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  // Bu sadece bir yer tutucudur. Gerçek bir uygulamada, bu bileşen 
  // stilleri ve varyantları işleyecektir (örneğin, clsx ve cva kullanarak).
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
