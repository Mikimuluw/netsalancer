"use client";

import React from "react";

interface CalculatorCardProps {
  title: string;
  amharic?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Styled calculator card with Ethiopian banknote aesthetic
 * Features: Border pattern, brutalist shadow, paper texture background
 */
export function CalculatorCard({
  title,
  amharic,
  children,
  className = "",
}: CalculatorCardProps) {
  return (
    <div className={`calculator-card ${className}`}>
      <div className="mb-8">
        <h3 className="text-2xl md:text-4xl font-black text-teff-900">{title}</h3>
        {amharic && <p className="amharic-header">{amharic}</p>}
      </div>
      {children}
    </div>
  );
}

interface DataPointProps {
  label: string;
  value: string | number;
  amharic?: string;
  isMoney?: boolean;
  highlight?: boolean;
  showGeezToggle?: boolean;
}

/**
 * Individual data display point - Arabic numerals default with optional Ge'ez toggle
 */
export function DataPoint({
  label,
  value,
  amharic,
  isMoney,
  highlight,
  showGeezToggle = false,
}: DataPointProps) {
  const [useGeez, setUseGeez] = React.useState(false);
  const { toGeezNumerals } = require('@/lib/geez-numerals');
  
  const arabicDisplay = value.toLocaleString ? value.toLocaleString() : value;
  const geezDisplay = useGeez ? toGeezNumerals(String(value).replace(/,/g, '')) : arabicDisplay;
  
  return (
    <div
      className={`py-4 px-4 border-l-4 ${
        highlight
          ? "border-digital-500 bg-digital-300/5"
          : "border-coffee-400 bg-paper-100/50"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs uppercase tracking-widest font-semibold text-teff-700">
          {label}
          {amharic && <span className="amharic-accent ml-2">{amharic}</span>}
        </p>
        {showGeezToggle && (
          <button
            onClick={() => setUseGeez(!useGeez)}
            className="text-xs font-semibold px-2 py-0.5 rounded transition-colors"
            style={{
              backgroundColor: useGeez ? 'var(--color-digital-500)' : 'var(--color-paper-100)',
              color: useGeez ? 'var(--color-paper-50)' : 'var(--color-teff-900)'
            }}
          >
            {useGeez ? '፩' : '1'}
          </button>
        )}
      </div>
      <p
        className={`text-2xl font-black mt-2 ${
          useGeez ? 'geez-numeral' : ''
        } ${
          highlight ? "text-digital-500" : "text-coffee-600"
        }`}
      >
        {isMoney && "$"}{geezDisplay}
      </p>
    </div>
  );
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  amharic?: string;
}

/**
 * Custom styled slider for calculator inputs
 */
export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  amharic,
}: SliderControlProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-sm font-semibold text-teff-900">
          {label}
          {amharic && <span className="amharic-accent ml-2">{amharic}</span>}
        </label>
        <span className="text-lg font-bold text-digital-500">
          {value.toLocaleString()}
          {unit && <span className="text-sm ml-1">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider w-full"
      />
    </div>
  );
}

interface ResultsSummaryProps {
  items: Array<{
    label: string;
    value: string | number;
    isMoney?: boolean;
    highlight?: boolean;
    amharic?: string;
  }>;
  title?: string;
  allowGeezToggle?: boolean;
}

/**
 * Summary results display - Arabic numerals default with optional Ge'ez toggle
 */
export function ResultsSummary({ items, title, allowGeezToggle = false }: ResultsSummaryProps) {
  const [useGeez, setUseGeez] = React.useState(false);
  const { toGeezNumerals } = require('@/lib/geez-numerals');
  
  return (
    <div className="mt-8 pt-8 border-t-2 border-teff-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          {title && <h4 className="text-xl font-bold text-teff-900">{title}</h4>}
        </div>
        {allowGeezToggle && (
          <button
            onClick={() => setUseGeez(!useGeez)}
            className="numeral-toggle text-sm"
          >
            <span className={!useGeez ? "active" : ""}>123</span>
            <span className={useGeez ? "active" : ""}>፩፪፫</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => {
          const arabicDisplay = item.value.toLocaleString ? item.value.toLocaleString() : item.value;
          const geezDisplay = useGeez ? toGeezNumerals(String(item.value).replace(/,/g, '')) : arabicDisplay;
          
          return (
            <div
              key={idx}
              className={`p-4 ${
                item.highlight
                  ? "bg-digital-300/10 border-2 border-digital-500"
                  : "bg-coffee-200/10 border-2 border-coffee-400"
              }`}
              style={{
                clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-teff-700">
                {item.label}
              </p>
              {item.amharic && (
                <p className="amharic-accent text-xs">{item.amharic}</p>
              )}
              <p className={`text-2xl font-black mt-2 ${useGeez ? 'geez-numeral' : ''}`}>
                {item.isMoney && "$"}{geezDisplay}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface CalculatorFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export function CalculatorForm({ children, onSubmit }: CalculatorFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
    </form>
  );
}
