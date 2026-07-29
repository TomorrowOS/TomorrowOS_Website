import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-out motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent disabled:shadow-none disabled:translate-y-0 disabled:hover:bg-gray-100",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover-fine:bg-[#202020] hover-fine:-translate-y-px hover-fine:shadow-[0_2px_6px_rgba(0,0,0,0.12)] active:translate-y-0 active:shadow-none active:bg-black",
        secondary:
          "bg-white text-black border border-black/20 hover-fine:bg-gray-100 hover-fine:border-black/40 hover-fine:-translate-y-px active:translate-y-0 active:bg-gray-200",
        tertiary:
          "bg-transparent text-primary hover-fine:underline active:opacity-70 px-0",
        outline:
          "border border-input bg-background hover-fine:bg-accent hover-fine:text-accent-foreground hover-fine:border-black/30 active:bg-gray-200",
        ghost:
          "hover-fine:bg-gray-100 hover-fine:text-gray-900 active:bg-gray-200",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
