"use client";

import React from "react";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "gold" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
  outline: "border-2 border-teff-700 bg-transparent text-teff-900 hover:bg-teff-700 hover:text-paper-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "btn-primary-lg",
};

/**
 * Primary call-to-action button with angular design
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = "left",
  disabled,
  children,
  className = "",
  ...props
}: StyledButtonProps) {
  const baseClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${baseClass}
        ${sizeClass}
        ${widthClass}
        ${disabledClass}
        font-semibold
        uppercase
        tracking-wider
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
        ${className}
      `}
    >
      {loading && (
        <span className="inline-block w-4 h-4 animate-spin rounded-full border-2 border-current border-r-transparent"></span>
      )}
      {icon && iconPosition === "left" && !loading && icon}
      {children}
      {icon && iconPosition === "right" && !loading && icon}
    </button>
  );
}

/**
 * Minimal text button variant
 */
export function TextButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`
        text-digital-500
        font-semibold
        uppercase
        tracking-wider
        text-sm
        hover:text-digital-700
        transition-colors
        relative
        group
        ${className}
      `}
      {...props}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-digital-500 group-hover:w-full transition-all duration-300"></span>
    </button>
  );
}

/**
 * Icon-only button for compact layouts
 */
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
}

export function IconButton({ icon, label, className = "", ...props }: IconButtonProps) {
  return (
    <button
      title={label}
      className={`
        w-10 h-10
        rounded
        flex
        items-center
        justify-center
        text-teff-900
        hover:bg-paper-100
        hover:text-digital-500
        transition-colors
        border-2
        border-teff-700
        hover:border-digital-500
        ${className}
      `}
      {...props}
    >
      {icon}
    </button>
  );
}

/**
 * Ghost button - minimal style with hover effect
 */
export function GhostButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`
        px-4
        py-2
        text-sm
        font-semibold
        uppercase
        tracking-wider
        rounded
        text-teff-900
        hover:bg-teff-700/10
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Danger/Destructive action button
 */
export function DangerButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`
        px-6
        py-3
        text-sm
        font-semibold
        uppercase
        tracking-wider
        rounded
        bg-red-500
        text-white
        hover:bg-red-600
        active:bg-red-700
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Button group for related actions
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  vertical?: boolean;
}

export function ButtonGroup({ children, vertical = false }: ButtonGroupProps) {
  return (
    <div
      className={`flex gap-3 ${vertical ? "flex-col" : "flex-row"}`}
    >
      {children}
    </div>
  );
}

/**
 * Toggle button (on/off state)
 */
interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
  activeLabel?: string;
}

export function ToggleButton({
  active = false,
  label,
  activeLabel,
  className = "",
  ...props
}: ToggleButtonProps) {
  return (
    <button
      className={`
        px-6
        py-3
        font-semibold
        uppercase
        tracking-wider
        rounded
        transition-all
        ${
          active
            ? "bg-digital-500 text-paper-50 border-2 border-digital-700"
            : "bg-paper-100 text-teff-900 border-2 border-teff-700 hover:bg-paper-200"
        }
        ${className}
      `}
      {...props}
    >
      {active && activeLabel ? activeLabel : label}
    </button>
  );
}

export default Button;
