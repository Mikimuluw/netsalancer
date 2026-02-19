# Numeral System Quick Reference

## Core Principle

Arabic numerals (1, 2, 3, 4, 5...) are ALWAYS the default display.

Ge'ez numerals (፩ ፪ ፫ ፬ ፭...) are always optional and only appear when user explicitly selects the toggle.

---

## Component Numeral Display

### BigNumber
```tsx
// Displays: "2,850" (Arabic - DEFAULT)
// With toggle button, user can switch to: "፪፰፶०"
<BigNumber value={2850} showToggle={true} />

// No toggle = always Arabic
<BigNumber value={2850} showToggle={false} />
```

### DataPoint
```tsx
// Displays: "$1,000" (Arabic - DEFAULT)
// With toggle, user can switch to: "$፩००००"
<DataPoint value={1000} isMoney={true} showGeezToggle={true} />

// No toggle = always Arabic
<DataPoint value={1000} isMoney={true} showGeezToggle={false} />
```

### ResultsSummary
```tsx
// All items displayed as Arabic numerals (DEFAULT)
// Single toggle button lets user see ENTIRE summary in Ge'ez
<ResultsSummary 
  items={[
    { label: "Income", value: 2500 },  // Shows: 2,500
    { label: "Tax", value: 500 }       // Shows: 500
  ]}
  allowGeezToggle={true}  // One button switches all to Ge'ez
/>
```

### SliderControl
```tsx
// Always shows Arabic numerals
// NO Ge'ez toggle available (inputs only show Arabic)
<SliderControl
  label="Amount"
  value={5000}  // Displays: "5,000" (always Arabic)
  min={0}
  max={10000}
/>
```

---

## Implementation Checklist

For any number display in Netsalancer:

- [PASS] Does it show Arabic numerals by default? YES
- [PASS] If Ge'ez is available, is it opt-in only? YES
- [PASS] Are both numbers always readable? YES
- [PASS] Is the toggle button clear and easy to find? YES

---

## Do Not

- Avoid: Force Ge'ez numerals on users
- Avoid: Hide Arabic numerals
- Avoid: Make Ge'ez the default
- Avoid: Auto-switch based on locale

## Required

- Always: Show Arabic numerals first
- Always: Provide clear toggle button (if enabled)
- Always: Let user choose their preference
- Note: Cultural preference, not requirement  

---

## Testing

To verify numeral display is correct:

```tsx
// Test: Arabic should display first
<DataPoint value={2500} showGeezToggle={false} />
// Should display: "2,500" [PASS]

// Test: Toggle should work
<DataPoint value={2500} showGeezToggle={true} />
// Click toggle → Should display: "፪፶००" [PASS]
// Click toggle again → Should display: "2,500" [PASS]

// Test: ResultsSummary toggle
<ResultsSummary items={[...]} allowGeezToggle={true} />
// All numbers show Arabic [PASS]
// Click toggle → All show Ge'ez [PASS]
```

---

## Ge'ez Numeral Conversion Reference

| Arabic | Ge'ez | Component |
|--------|-------|-----------|
| 1 | ፩ | Single digit |
| 10 | ፲ | Tens |
| 100 | ፻ | Hundreds |
| 1,234 | ፩፪፴፬ | Full number |
| 2,500 | ፪፶००ወ | Currency (optional) |

Used by: `toGeezNumerals()` from `lib/geez-numerals.ts`

---

## Questions?

- **"Should I show Ge'ez by default?"** → NO. Always Arabic first.
- **"Can I remove the Arabic numeral option?"** → NO. Always keep Arabic available.
- **"Should I auto-switch based on device language?"** → NO. User controls it.
- **"What if my number is non-integer?"** → Use Arabic numerals only (Ge'ez decimals are complex).

---

**Version:** 2026-02-18  
**Policy:** Arabic numerals default, Ge'ez optional  
**Status:** Active across all Netsalancer components
