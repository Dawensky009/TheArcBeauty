"use client";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useCart, type CartItem } from "@/components/providers/cart";
import { Button } from "@/components/ui/button";

interface AddToCartProps {
  item: Omit<CartItem, "qty">;
  label: string;
  addedLabel: string;
  variant?: "primary" | "soft" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  withIcon?: boolean;
}

export function AddToCart({
  item,
  label,
  addedLabel,
  variant = "outline",
  size = "sm",
  className,
  withIcon = true,
}: AddToCartProps) {
  const { add } = useCart();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        add(item);
        toast.success(addedLabel, { description: item.name });
      }}
    >
      {withIcon && <Plus size={14} className="-ml-1" />}
      {label}
    </Button>
  );
}
