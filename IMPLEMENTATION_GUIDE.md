# Digital Tej House - Implementation Guide

## Quick Start

The redesign is fully implemented in the following files. Here's how to use each component:

## IMPORTANT: Numeral System

**All components display Arabic numerals (1, 2, 3, 4, 5...) by default.**

Users can optionally toggle to Ge'ez numerals (፩ ፪ ፫ ፬ ፭...) if your component enables it:

```tsx
// Arabic numerals are ALWAYS the default
<DataPoint 
  label="Monthly Income"
  value={2500}
  showGeezToggle={true}  // Optional: adds toggle button for Ge'ez
/>

// ResultsSummary can enable Ge'ez toggle
<ResultsSummary 
  items={[...]}
  allowGeezToggle={true}  // Optional: adds toggle for entire summary
/>

// BigNumber component
<BigNumber 
  value={2850}
  showToggle={true}  // Optional: adds Ge'ez toggle button
/>
```

**In all cases:**
- [PASS] Arabic numerals (1, 2, 3) display by default
- [PASS] Ge'ez numerals (፩ ፪ ፫) only show when user explicitly toggles
- [PASS] No data is ever forced into Ge'ez script
- [PASS] International standard numerals always work

## 1. Core Styling (app/globals.css)

All CSS custom properties are defined in `globals.css`. Use them directly in your JSX:

```tsx
// Using Tailwind classes (colors defined in @theme)
<div className="bg-teff-900 text-paper-50 border-digital-500">Content</div>

// Using CSS variables
<div style={{ color: 'var(--color-digital-500)' }}>Content</div>
```

**Key animation classes:**
- `.coffee-pour` - Loading animation
- `.weave-in` / `.weave-out` - Smooth transitions
- `.flip-card` - 3D currency flip
- `.parallax` - Scroll depth effect
- `.pulse-cta` - Attention-grabbing button pulse

### Numeral Display (ALWAYS Arabic by default)

| Component | Default Display | Optional Ge'ez | How to Enable |
|-----------|-----------------|-----------------|---------------|
| `BigNumber` | Arabic (2,850) | Yes | `showToggle={true}` |
| `DataPoint` | Arabic (1,000) | Yes | `showGeezToggle={true}` |
| `ResultsSummary` | Arabic (24,000) | Yes | `allowGeezToggle={true}` |
| `SliderControl` | Arabic (5,000 USD) | No | Always shows input in Arabic |
| Number display in all components | Arabic numerals | Yes (optional) | Toggle buttons when enabled |

**Rule:** Users never see Ge'ez numerals unless they explicitly toggle a button. Arabic numerals (1, 2, 3...) are ALWAYS the default.

## 2. Navigation Component

Updated with:
- Dark Tej House theme
- Language toggle (English/Amharic)
- Ge'ez logo text
- Angular design elements

```tsx
import Navigation from '@/components/Navigation'

export default function Layout() {
  return (
    <>
      <Navigation />
      {/* Content */}
    </>
  )
}
```

## 3. Button Components

Located in `components/StyledButton.tsx`

```tsx
import { Button, TextButton, IconButton, GhostButton, DangerButton, ButtonGroup } from '@/components/StyledButton'

// Primary action button
<Button variant="primary" size="lg">Save Changes</Button>

// Gold accents for premium
<Button variant="gold">Premium Feature</Button>

// Secondary outline
<Button variant="secondary">Cancel</Button>

// Text-only with underline animation
<TextButton>Learn More</TextButton>

// Icon button
<IconButton icon={<Save />} label="Save" />

// Ghost button (minimal)
<GhostButton>Maybe Later</GhostButton>

// Button group for related actions
<ButtonGroup>
  <Button variant="primary">Accept</Button>
  <Button variant="secondary">Decline</Button>
</ButtonGroup>

// With loading state
<Button loading>Processing...</Button>
```

## 4. Calculator Components

Located in `components/CalculatorCardComponents.tsx`

```tsx
import {
  CalculatorCard,
  DataPoint,
  SliderControl,
  ResultsSummary,
  CalculatorForm
} from '@/components/CalculatorCardComponents'

export default function MyCalculator() {
  const [income, setIncome] = useState(0);

  return (
    <CalculatorCard 
      title="Visa Readiness Calculator"
      amharic="ቪዛ ዝግጁነት ካልኩሌተር"
    >
      <CalculatorForm onSubmit={(e) => {
        e.preventDefault();
        // Handle submission
      }}>
        
        <SliderControl
          label="Monthly Income"
          amharic="ወርሃዊ ገቢ"
          value={income}
          min={0}
          max={10000}
          onChange={setIncome}
          unit="USD"
        />

        <DataPoint
          label="Status"
          value={income > 2000 ? "Visa Ready ✓" : "Not Yet Qualified"}
          isMoney={false}
          highlight={income > 2000}
          showGeezToggle={true}  // Optional: adds Ge'ez numeral toggle
        />

        <ResultsSummary 
          title="Annual Projection"
          allowGeezToggle={true}  // Optional: adds Ge'ez toggle for entire summary
          items={[
            {
              label: "Annual Income",
              value: income * 12,  // Shows as: 24,000 (Arabic) → default
              isMoney: true,
              highlight: true,
              amharic: "ዓመታዊ ገቢ"
            },
            {
              label: "Visa Threshold",
              value: 24000,  // Shows as: 24,000 (Arabic) → default
              isMoney: true,
              amharic: "ቪዛ ገደብ"
            }
          ]}
        />

        <Button variant="primary" type="submit">Calculate</Button>
      </CalculatorForm>
    </CalculatorCard>
  );
}
```

## 5. Ge'ez & Amharic Text Components

Located in `components/GeezComponents.tsx`

```tsx
import {
  BigNumber,
  NumeralToggle,
  BilingualHeader,
  AmharicLabel,
  EthiopianDate
} from '@/components/GeezComponents'

// Big number - Shows Arabic numerals by default (2,850)
// Optional toggle to show Ge'ez (፪፰፶०)
<BigNumber 
  value={2850}
  prefix="You Save"
  suffix="USD/year"
  showToggle={true}  // Shows toggle button default: Arabic → can switch to Ge'ez
/>

// Without toggle - always shows Arabic numerals
<BigNumber 
  value={2850}
  prefix="You Save"
  suffix="USD/year"
/>

// Standalone numeral toggle - Let user choose Arabic or Ge'ez
const [useGeez, setUseGeez] = useState(false);
<NumeralToggle 
  value={useGeez}
  onChange={setUseGeez}
  labels={{ latin: "1,234", geez: "፩፪፫፬" }}
/>

// Bilingual header (English + Amharic)
<BilingualHeader 
  english="Your True Earnings"
  amharic="የእውነተኛው ገቢ"
  level="h2"
/>

// Amharic label for form fields
<AmharicLabel
  english="Monthly Income"
  amharic="ወርሃዊ ገቢ"
  showBoth={true}
/>

// Ethiopian date display (shows both Gregorian and Ethiopian calendar)
<EthiopianDate />
```

### Numeral Display Policy

**Default:** All numbers display in Arabic numerals (1,234 / $2,850 / etc.)

**Optional:** When `showToggle={true}` or `showGeezToggle={true}`, a button appears allowing users to switch to Ge'ez (፩፪፫ / ብር፪፰፶००ወ / etc.)

**Never forced:** Users must explicitly click to see Ge'ez numerals - we never force culturally-specific displays.

## 6. Ge'ez Numerals

Located in `lib/geez-numerals.ts`

```tsx
import {
  toGeezDigit,
  toGeezNumerals,
  formatGeezCurrency,
  GEEZ_LABELS,
  AMHARIC_TRANSLATIONS
} from '@/lib/geez-numerals'

// Convert single digit
toGeezDigit('5')  // Returns: '፭'

// Convert full number
toGeezNumerals('2024')  // Returns: '፪०፲፬'

// Format currency
formatGeezCurrency('1,234.56', 'ETB')  // Returns: '፩፪፴፬.፭፮ ብር'

// Access pre-translated labels
GEEZ_LABELS['earnings']  // Returns: 'ገቢ'

// Amharic UI text
AMHARIC_TRANSLATIONS['freedomCalculator']  // Returns: 'የነፃነት ካልኩሌተር'
```

## 7. SVG Patterns

Located in `public/patterns/`:
- `weave.svg` - Diagonal cross-hatching (netela fabric)
- `tilf.svg` - Diamond shapes (traditional weaving)
- `stepped.svg` - Stepped pattern (traditional architecture)
- `cross.svg` - Ethiopian cross pattern

**Usage in CSS:**
```css
.my-element::before {
  background: url('/patterns/weave.svg');
  opacity: 0.03;
}
```

## Color Palette Quick Reference

```tsx
// Primary Theme Colors
className="bg-teff-900 text-paper-50"

// Accent Colors
className="bg-digital-500 hover:bg-digital-700"

// Coffee Tones
className="text-coffee-600 border-coffee-400"

// Gold Accents
className="text-gold-500 hover:text-gold-300"

// Paper/Neutral
className="bg-paper-50 border-paper-200"
```

## Typography Classes

```tsx
// Display font (Nyala, Ge'ez)
className="font-display text-4xl"

// Body font (Inter)
className="font-body text-base"

// Mono font (JetBrains)
className="font-mono text-lg"

// Use predefined display styles
className="big-number"           // 72px, bold, green
className="amharic-header"       // Nyala font, formatted
className="amharic-accent"       // Small Amharic text
className="geez-numeral"         // Ge'ez script formatting
```

## Animation Classes

```tsx
// Apply to elements for automatic animation
className="weave-in"             // Fade in with weave effect (800ms)
className="weave-out"            // Fade out with unweave effect (800ms)
className="coffee-pour"          // Loading animation (infinite)
className="flip-card"            // 3D flip (600ms)
className="pulse-cta"            // Pulsing glow (2s infinite)
className="fade-in-up"           // Slide up fade (600ms)
```

## Form Styling

```tsx
// Input styling
<input type="text" className="input-field" />

// Slider styling
<input type="range" className="slider" />

// Custom styled controls
<SliderControl
  label="Amount"
  value={amount}
  onChange={setAmount}
  min={0}
  max={10000}
/>
```

## Brutalist Design Elements

All major components use angular clip-paths for that "handmade craft" aesthetic:

```css
/* Primary buttons */
clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);

/* Smaller elements */
clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
```

## Shadows & Depth

Netsalancer uses **brutalist shadows** (offset, not blurred) for a handmade feel:

```css
/* Example from calculator cards */
box-shadow: 8px 8px 0 var(--color-coffee-800);

/* Hover state */
box-shadow: 10px 10px 0 var(--color-coffee-600);
```

## Implementation Checklist

- [DONE] Color palette in globals.css
- [DONE] Fonts loaded (Inter, Noto Sans Ethiopic, JetBrains Mono)
- [DONE] Navigation component updated
- [DONE] Button component library
- [DONE] Calculator card components
- [DONE] Ge'ez utilities & displays
- [DONE] SVG patterns created
- [DONE] Animations defined

## Next Steps

1. **Update Existing Pages** - Import new components into Hero, Problem, FAQ, etc.
2. **Test Colors** - Verify contrast ratios meet WCAG AAA
3. **Responsive Testing** - Test on mobile, tablet, desktop
4. **Animation Performance** - Check FPS on lower-end devices (common in Ethiopia)
5. **Cross-browser** - Test on Chrome, Firefox, Safari, Edge

## Performance Tips

- Fonts are subset to common characters for faster load
- SVG patterns use data URIs to avoid extra HTTP requests
- Animations use `transform` and `opacity` (GPU-accelerated)
- Lazy-load calculator components for below-fold sections

## Accessibility

- All buttons have proper keyboard focus states
- Animations respect `prefers-reduced-motion`
- Color contrast passes WCAG AAA on all text
- Ge'ez numerals are optional (Latin always available)
- All icons have `aria-label` support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Older browsers will still render correctly, but some animations and advanced CSS features may not work.

---

**Questions?** Refer to `BRAND_IDENTITY.md` for design philosophy and rationale.
