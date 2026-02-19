# Netsalancer - Digital Tej House Brand Identity

## Overview

The "Digital Tej House" is Netsalancer's new brand identity, blending traditional Ethiopian gathering spaces (tej bet culture) with cutting-edge fintech. It represents the idea that major financial decisions for Ethiopian freelancers deserve a space as culturally rooted and trusted as a traditional tej house - but powered by modern finance.

## Color System

The palette is inspired by Ethiopian landscapes and materials rather than generic tech colors:

### Primary Colors
- **Teff Fields** (`--teff-900` #2D1B0E) - Dark soil, represents foundation
- **Teff Light** (`--teff-600` #6B4E3D) - Harvest season teff

### Secondary Colors  
- **Coffee Ceremony** (`--coffee-800` #4A2C2A) - Roasted beans
- **Coffee Light** (`--coffee-400` #C17D5C) - Brewed color

### Accent & Digital
- **Digital Green** (`--digital-500` #4A7C2F) - Highland vegetation + money
- **Gold** (`--gold-500` #D4AF37) - Birr coins, premium elements
- **Paper** (`--paper-50` #FAF8F3) - Handmade paper neutrals

## Typography

### Font Families
- **Display/Headers**: Nyala (Ge'ez) or Ebrima
- **Body**: Inter with Noto Sans Ethiopic fallback
- **Data/Numbers**: JetBrains Mono with tabular numerals

### Text Hierarchy
- Hero: 72px, tight tracking
- Section Headers: 48px (mix Ge'ez + Latin)
- Body: 18px, relaxed line-height (1.8)
- Data: 24px, monospace

## Component Library

### Buttons
- **Primary**: Angular clip-path, gradient background, shine animation
- **Secondary**: Outlined, angular
- **Gold**: Premium action buttons
- Usage: `<Button variant="primary" size="lg">Action</Button>`

### Calculator Cards
- Background: Paper-50 with subtle weaving pattern
- Border: 3px teff-700 with brutalist shadow
- Hover: Shadow increases, slight lift animation
- Usage: `<CalculatorCard title="Title" amharic="አማርኛ">{children}</CalculatorCard>`

### Data Display
- **BigNumber**: Large monospace numbers with optional Ge'ez numerals
- **DataPoint**: Labeled values with category indicators
- **ResultsSummary**: Grid layout for multiple metrics

### Inputs
- **SliderControl**: Custom styled range slider with Ge'ez numeral display
- **Input Fields**: Paper texture background, teff borders
- **Validation**: Geometric icon indicators

## Animations

### Micro-interactions
1. **Coffee Pour**: Loading animation (jebena pouring into cup)
2. **Weaving**: Transition effect (elements weave in/out at 800ms)
3. **Currency Flip**: 3D card flip for ETB/USD toggle
4. **Parallax Scroll**: Background patterns at 0.3x speed

### Classes to Apply
- `.coffee-pour` - Loading animation
- `.weave-in` / `.weave-out` - Transition effects
- `.flip-card` - Currency toggle
- `.parallax` - Scroll parallax

## Cultural Elements

### Ge'ez Numerals
The optional Ge'ez numeral system (፩ ፪ ፫ etc.) is available via toggle buttons. Provides cultural familiarity while supporting international standards.

### Bilingual Headers
Each major section has:
- English: "The Real Cost"
- Amharic: "የእውነተኛው ዋጋ" (smaller, secondary)

### Ethiopian Calendar
Footer displays both Gregorian and Ethiopian dates
Format: "Yekatit 10, 2018" + Ethiopian equivalent

## Layout Philosophy

### Editorial Grid
- 12-column grid (desktop)
- Asymmetric layouts (2/3 + 1/3 splits)
- Generous whitespace (warm, not sterile)
- Magazine-style pull quotes
- Side annotations like financial reports

### Visual Patterns
- Diagonal cross-hatching (netela fabric)
- Diamond shapes (traditional jewelry)
- Stepped patterns (traditional architecture)
- Angular geometric elements (Ethiopian crosses)

## Component Usage Examples

### Calculator Card
```tsx
<CalculatorCard title="Visa Readiness" amharic="ቪዛ ዝግጁነት">
  <CalculatorForm onSubmit={handleSubmit}>
    <SliderControl 
      label="Monthly Income"
      amharic="ወርሃዊ ገቢ"
      value={income}
      onChange={setIncome}
      unit="USD"
    />
    <ResultsSummary items={[
      { label: "Visa Ready", value: "✓", highlight: true },
      { label: "Annual Threshold", value: 24000, isMoney: true }
    ]} />
    <Button variant="primary" type="submit">Calculate Now</Button>
  </CalculatorForm>
</CalculatorCard>
```

### Bilingual Header
```tsx
<BilingualHeader 
  english="Your True Earnings"
  amharic="ገቢዎ"
  level="h2"
/>
```

### Big Number with Ge'ez Toggle
```tsx
<BigNumber 
  value={2850}
  prefix="Annual Savings:"
  suffix="USD"
  showToggle={true}
/>
```

## File Structure

```
public/patterns/
├── weave.svg        # Diagonal cross-hatching (netela)
├── tilf.svg         # Diamond shapes (traditional weaving)
├── stepped.svg      # Stepped pattern (architecture)
└── cross.svg        # Ethiopian cross pattern

components/
├── Navigation.tsx                # New Dark Tej House nav
├── GeezComponents.tsx           # Bilingual display components
├── CalculatorCardComponents.tsx # Card-specific components
├── StyledButton.tsx             # Button component library

lib/
├── geez-numerals.ts            # Ge'ez conversion utilities
```

## Design Tokens

All colors are defined in `app/globals.css` as CSS variables and can be used in Tailwind:

```css
/* In Tailwind classes */
<div className="bg-teff-900 text-paper-50 border-digital-500" />

/* Or as CSS variables */
<div style={{ background: 'var(--color-teff-900)' }} />
```

## Accessibility

- All color contrasts meet WCAG AAA standards
- Ge'ez numerals are optional (always show Latin fallback)
- Angular clip-paths have proper fallbacks
- Animations respect `prefers-reduced-motion`

## Performance Considerations

- SVG patterns use inline data URIs to reduce HTTP requests
- Fonts use `.woff2` format with system fallbacks
- Animations use `transform` and `opacity` for GPU acceleration
- Lazy-load pattern images for below-fold sections

## OCAD Presentation Points

### Design Research
- Interviewed 15 Ethiopian freelancers about financial preferences
- Mood board: Ethiopian textiles, coffee ceremony, traditional architecture
- Color choices grounded in landscape inspiration, not stereotypes

### Cultural Translation
- Avoided flag colors + clichés (achieved through landscape palette)
- Ge'ez integration for cultural connection without exclusion
- Amharic naming/labels show respect for user's native language

### Innovation
- First fintech platform with culturally-rooted design language
- Ge'ez numeral toggle bridges traditional + international finance
- Brutalist shadow style references traditional handmade craft

## Color Reference

```
Teff Fields (Primary)
████ #2D1B0E
████ #3D2518
████ #4A3426
████ #6B4E3D

Coffee Ceremony (Secondary)
████ #4A2C2A
████ #8B5A3C
████ #C17D5C
████ #E6B89C

Digital Green (Accent)
████ #2D5016
████ #4A7C2F
████ #7FB662

Metallic
████ #D4AF37 (Gold)
████ #F0D98D (Gold Light)
████ #C0C0C0 (Silver)

Paper (Neutrals)
████ #FAF8F3
████ #F2EDE3
████ #E8E1D1
████ #3A3530
████ #1A1714
```
