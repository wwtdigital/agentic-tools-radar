# Accessibility Audit Report

**Date:** 2025-11-06
**URL:** https://radar.creative-technology.digital/radar
**Standards:** WCAG 2.1 Level AA

---

## Executive Summary

The Agentic Tools Radar has several accessibility strengths but requires improvements to meet WCAG 2.1 Level AA standards. Key issues include missing semantic HTML landmarks, insufficient ARIA labels, lack of keyboard navigation support, and potential color contrast issues with status badges.

**Overall Grade:** C+ (Needs Improvement)

---

## Critical Issues (WCAG Level A)

### 1. Missing Semantic Landmarks
**Severity:** High
**WCAG:** 1.3.1 (Info and Relationships), 2.4.1 (Bypass Blocks)

**Issues:**
- No `<main>` landmark with proper role
- Navigation uses `<nav>` but lacks `aria-label`
- No `role="region"` or `aria-labelledby` for major sections
- Drawer component lacks `role="dialog"` and proper ARIA attributes

**Impact:** Screen reader users cannot quickly navigate between major sections

**Recommendation:**
```tsx
// Navbar
<nav aria-label="Main navigation">

// Main content
<main role="main" aria-label="Radar visualization">

// Drawer
<div role="dialog" aria-modal="true" aria-labelledby="drawer-title">
  <h2 id="drawer-title">Tools & Filters</h2>
```

---

### 2. Missing Form Labels and Descriptions
**Severity:** High
**WCAG:** 1.3.1 (Info and Relationships), 3.3.2 (Labels or Instructions)

**Issues:**
- Checkbox inputs for dimensions lack accessible labels (page.tsx:275-286)
- Filter buttons lack descriptive labels for screen readers
- "Select All" buttons in CompareSelect don't indicate current state

**Current Code (Problematic):**
```tsx
<input
  type="checkbox"
  checked={isChecked}
  disabled={wouldBeUnderMinimum}
  // ❌ No id/aria-label
/>
```

**Recommendation:**
```tsx
<input
  type="checkbox"
  id={`dimension-${dim.replace(/\s+/g, '-').toLowerCase()}`}
  checked={isChecked}
  disabled={wouldBeUnderMinimum}
  aria-describedby={`dimension-${dim.replace(/\s+/g, '-').toLowerCase()}-desc`}
/>
<span id={`dimension-${dim.replace(/\s+/g, '-').toLowerCase()}-desc`} className="sr-only">
  {description}
</span>
```

---

### 3. Insufficient Button Accessibility
**Severity:** High
**WCAG:** 2.4.6 (Headings and Labels), 4.1.2 (Name, Role, Value)

**Issues:**
- Icon-only buttons (reset, export, close) rely solely on `title` attribute
- `title` is not accessible to keyboard users on all browsers
- Category filter buttons lack state announcements
- Tool selection buttons don't indicate selected state

**Recommendation:**
```tsx
// Icon-only buttons need visible labels or aria-label
<button
  onClick={handleExport}
  aria-label="Export radar chart as PNG image"
  aria-disabled={isExporting}
>
  {/* Icon */}
  <span className="sr-only">Export PNG</span>
</button>

// Toggle buttons need state
<button
  onClick={() => setFilters(...)}
  aria-pressed={filters.category === cat}
  aria-label={`Filter by ${cat} category, ${count} tools available`}
>
  {cat} <span className="ml-1 opacity-70">({count})</span>
</button>
```

---

## Serious Issues (WCAG Level AA)

### 4. Keyboard Navigation and Focus Management
**Severity:** Medium-High
**WCAG:** 2.1.1 (Keyboard), 2.4.3 (Focus Order), 2.4.7 (Focus Visible)

**Issues:**
- Drawer backdrop (`onClick` on div) is not keyboard accessible
- No visible focus indicators on many interactive elements
- No focus trap in drawer when open
- Export button disabled state doesn't prevent keyboard focus
- SVG icons in buttons are not properly hidden from screen readers

**Current Code (Problematic):**
```tsx
// page.tsx:146-152
<div
  className="fixed inset-0 bg-black/20 z-20"
  onClick={() => setDrawerOpen(false)}
  aria-label="Close drawer"
/>
```

**Recommendation:**
```tsx
// Replace div with button or handle Escape key
{drawerOpen && (
  <>
    <div
      className="fixed inset-0 bg-black/20 z-20"
      onClick={() => setDrawerOpen(false)}
      role="presentation"
    />
    {/* Add keyboard handler to drawer or close button */}
  </>
)}

// Add focus trap library
import { FocusTrap } from '@headlessui/react' // or similar

<FocusTrap active={drawerOpen}>
  <div className="drawer-content">
    {/* Drawer content */}
  </div>
</FocusTrap>

// Hide decorative SVGs
<svg aria-hidden="true" focusable="false">
  {/* icon paths */}
</svg>
```

---

### 5. Color Contrast Issues
**Severity:** Medium
**WCAG:** 1.4.3 (Contrast Minimum - 4.5:1 for normal text, 3:1 for large text)

**Potential Issues:**
- Status badges may not meet 4.5:1 contrast ratio (needs testing):
  - Yellow background (`bg-yellow-100`) with yellow text (`text-yellow-800`)
  - Amber background with amber text
  - Purple background with purple text
- Gray text on white (`text-slate-500`, `text-slate-400`) may be below 4.5:1
- Mobile warning yellow text on yellow background

**Testing Required:**
Use WebAIM Contrast Checker or browser DevTools to verify:
- Status badge colors in `src/utils/status.ts`
- Secondary text colors (`.text-slate-500`, `.text-slate-400`)
- Button hover states

**Recommendations:**
```tsx
// Ensure minimum contrast ratios
// Yellow badge example - may need darker text
case "Active":
  return "bg-yellow-100 text-yellow-900 border-yellow-300"; // Darker text

// Or use solid backgrounds with white text for better contrast
case "Active":
  return "bg-yellow-600 text-white border-yellow-700";
```

---

### 6. Missing Live Regions for Dynamic Content
**Severity:** Medium
**WCAG:** 4.1.3 (Status Messages)

**Issues:**
- Loading state changes not announced
- Tool selection changes not announced
- Filter application results not announced
- Export status ("Exporting...") not in live region

**Recommendation:**
```tsx
// Add live region for status messages
<div role="status" aria-live="polite" className="sr-only">
  {isLoading && "Loading tools data"}
  {isExporting && "Exporting radar chart to PNG"}
  {selectedTools.length > 0 && `${selectedTools.length} tools selected for comparison`}
</div>

// Add live region for filter results
<div role="status" aria-live="polite" className="sr-only">
  {`Showing ${filtered.length} tools`}
</div>
```

---

## Moderate Issues

### 7. Missing Skip Links
**Severity:** Medium
**WCAG:** 2.4.1 (Bypass Blocks)

**Issue:** No "Skip to main content" link for keyboard users

**Recommendation:**
```tsx
// Add to top of page
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:px-4 focus:py-2">
  Skip to main content
</a>

<main id="main-content">
  {/* Content */}
</main>
```

---

### 8. Chart Accessibility
**Severity:** Medium
**WCAG:** 1.1.1 (Non-text Content), 1.3.1 (Info and Relationships)

**Issues:**
- SVG radar chart has no text alternative
- No data table alternative for non-visual users
- Chart interactions not keyboard accessible

**Recommendation:**
```tsx
<figure aria-labelledby="chart-title" aria-describedby="chart-desc">
  <figcaption id="chart-title" className="sr-only">
    Radar Chart Comparing {selectedTools.map(t => t.tool).join(", ")}
  </figcaption>
  <div id="chart-desc" className="sr-only">
    {/* Generate text description of data */}
    A radar chart showing dimension scores for {selectedTools.length} tools across {5 - hiddenDims.size} dimensions.
  </div>
  <div className="w-full h-full">
    <RadarView tools={filtered} selectedIds={compareIds} hiddenDims={hiddenDims} />
  </div>

  {/* Add data table alternative */}
  <details className="mt-4">
    <summary>View data table</summary>
    <table>
      {/* Accessible table version of chart data */}
    </table>
  </details>
</figure>
```

---

### 9. Form Validation and Error Messages
**Severity:** Low-Medium
**WCAG:** 3.3.1 (Error Identification), 3.3.3 (Error Suggestion)

**Issues:**
- Disabled checkbox state doesn't clearly explain why (tooltip not accessible)
- No error messages for failed export

**Current:**
```tsx
title={wouldBeUnderMinimum ? 'Minimum 3 dimensions required' : ''}
```

**Recommendation:**
```tsx
<input
  type="checkbox"
  aria-describedby={wouldBeUnderMinimum ? "dimension-minimum-error" : undefined}
  aria-invalid={wouldBeUnderMinimum}
/>
{wouldBeUnderMinimum && (
  <span id="dimension-minimum-error" className="text-xs text-red-600" role="alert">
    Minimum 3 dimensions required
  </span>
)}
```

---

### 10. Mobile Warning Accessibility
**Severity:** Low
**WCAG:** 1.3.1 (Info and Relationships)

**Issue:** Mobile warning is visual-only, should be a proper alert

**Recommendation:**
```tsx
<div
  className="md:hidden bg-yellow-50 border-b border-yellow-200 px-4 py-3"
  role="alert"
  aria-live="polite"
>
  <p className="text-sm text-yellow-800 text-center">
    <strong>Desktop Required:</strong> This radar visualization is optimized for desktop viewing.
  </p>
</div>
```

---

## Strengths

✅ **Good:**
- Semantic HTML structure overall
- Proper `<button>` elements for interactions
- Loading states with visual feedback
- Responsive design considerations
- Some ARIA labels present (drawer close, dimension tooltips)

✅ **Very Good:**
- Disabled state management for checkboxes
- Visual hover states on interactive elements
- Logical tab order in most areas
- Good use of `<label>` elements in filters

---

## Priority Recommendations

### Immediate (Ship Blockers for Accessibility Compliance)
1. Add proper ARIA labels to all icon-only buttons
2. Add semantic landmarks (`role="main"`, `aria-label` on nav)
3. Make drawer keyboard accessible with focus trap
4. Add `aria-pressed` states to toggle buttons
5. Fix color contrast issues in status badges

### High Priority (Within 1-2 Sprints)
6. Add skip navigation link
7. Add live regions for dynamic content updates
8. Provide accessible chart alternative (data table)
9. Add visible focus indicators
10. Hide decorative SVGs from screen readers

### Medium Priority (Nice to Have)
11. Improve form validation error messages
12. Add keyboard shortcuts (document them)
13. Consider reduced motion preferences
14. Add proper heading hierarchy

---

## Testing Recommendations

1. **Automated Testing:**
   - Install `eslint-plugin-jsx-a11y`
   - Run Lighthouse accessibility audit
   - Use axe DevTools browser extension

2. **Manual Testing:**
   - Navigate entire site with keyboard only (no mouse)
   - Test with screen reader (NVDA on Windows, VoiceOver on Mac)
   - Test with browser zoom at 200%
   - Verify color contrast with WebAIM Contrast Checker

3. **User Testing:**
   - Test with users who rely on assistive technology
   - Test with keyboard-only users
   - Test with users with low vision

---

## Implementation Priority Matrix

| Priority | Effort | Item |
|----------|--------|------|
| **High** | Low | Add ARIA labels to buttons |
| **High** | Low | Add semantic landmarks |
| **High** | Medium | Fix color contrast in badges |
| **High** | Medium | Add live regions |
| **High** | High | Implement focus trap in drawer |
| **Medium** | Low | Add skip link |
| **Medium** | Medium | Provide chart data table |
| **Medium** | Medium | Add visible focus indicators |
| **Low** | Low | Hide decorative SVGs |
| **Low** | High | Full keyboard navigation |

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

---

*Audit conducted: 2025-11-06*
*Next audit recommended: After implementing high-priority fixes*
