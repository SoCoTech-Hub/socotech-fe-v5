import type { LucideIcon } from "lucide-react";

import { cn } from "@acme/ui";

import { Button } from "./button";

interface ButtonItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
}

interface ButtonGroupProps {
  buttons: ButtonItem[];
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function ButtonGroup({
  buttons,
  variant = "default",
  size = "default",
  className,
}: ButtonGroupProps) {
  return (
    <div className={cn("inline-flex rounded-md shadow-sm", className)}>
      {buttons.map((button, index) => {
        const Icon = button.icon;
        return (
          <Button
            key={index}
            variant={variant}
            size={size}
            onClick={button.onClick}
            className={cn(
              "flex items-center",
              index === 0 && "rounded-r-none",
              index === buttons.length - 1 && "rounded-l-none",
              index !== 0 && index !== buttons.length - 1 && "rounded-none",
              index !== 0 && "-ml-px",
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {button.label}
          </Button>
        );
      })}
    </div>
  );
}

// USE:
// import ButtonGroup from '@acme/ButtonGroup'
// import { Home, Settings, User } from 'lucide-react'

// export default function ButtonGroupExample() {
//   const handleClick = (action: string) => {
//     console.log(`${action} clicked`)
//   }

//   const buttons = [
//     { label: 'Home', icon: Home, onClick: () => handleClick('Home') },
//     { label: 'Profile', icon: User, onClick: () => handleClick('Profile') },
//     { label: 'Settings', icon: Settings, onClick: () => handleClick('Settings') },
//   ]

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Button Group Example</h1>
//       <ButtonGroup buttons={buttons} variant="outline" />
//     </div>
//   )
// }
