---
name: Dainamo FieldDesk
description: A dependable mobile field desk for Dainamo's project quotations and invoices.
colors:
  dainamo-navy: "#071B4A"
  dainamo-blue: "#1259B3"
  safety-gold: "#D69316"
  paper: "#F7F8FA"
  surface: "#FCFDFE"
  ink: "#172033"
  muted: "#667085"
  line: "#D9DEE8"
  success: "#19704A"
  danger: "#B42336"
typography:
  headline:
    fontFamily: "Geist, Segoe UI, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.dainamo-blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
---

# Design System: Dainamo FieldDesk

## 1. Overview

**Creative North Star: "The Site Clipboard"**

The interface should feel as immediate and dependable as a clean project clipboard used by a competent site manager. It is a light, restrained product surface for outdoor and office use, with Dainamo navy providing authority and safety gold reserved for totals or important commercial cues. Familiar controls and direct language keep the software out of the owner's way.

Key characteristics: phone-first structure, crisp hierarchy, visible arithmetic, limited navigation, robust touch targets, and a document preview that clearly connects the app to Dainamo's existing identity.

## 2. Colors

The palette is taken from Dainamo's supplied profile and invoice, calibrated for a high-contrast product interface.

### Primary

- **Dainamo Navy** (#071B4A): navigation, document bands, and high-authority headings.
- **Dainamo Blue** (#1259B3): primary actions, focus, and active navigation only.

### Secondary

- **Safety Gold** (#D69316): restrained use for deposit and grand-total emphasis.

### Neutral

- **Paper** (#F7F8FA), **Surface** (#FCFDFE), **Ink** (#172033), **Muted** (#667085), and **Line** (#D9DEE8) form the working UI.

**The Site Visibility Rule.** Every critical action and figure must remain legible on a phone in bright ambient light.

## 3. Typography

**Display Font:** Geist (Segoe UI fallback)  
**Body Font:** Geist (Segoe UI fallback)

**Character:** Compact, contemporary, and practical. One sans-serif family keeps the product consistent and removes decorative hierarchy.

### Hierarchy

- **Headline** (650, 28px, 1.15): page identity and document totals.
- **Title** (650, 18px, 1.3): sections and rows.
- **Body** (400, 16px, 1.5): form values and explanatory content.
- **Label** (600, 13px, 1.25): field labels, statuses, and metadata.

**The Legibility Rule.** Inputs never use less than 16px text on mobile, preventing browser zoom and keeping on-site entry comfortable.

## 4. Elevation

The product is flat by default. Borders and tonal layers group information; a single soft shadow is reserved for the sticky mobile action bar and temporary overlays.

## 5. Components

### Buttons

- **Shape:** 12px radius with at least 44px height.
- **Primary:** Dainamo blue on a near-white label.
- **Hover / Focus:** darker blue hover and a high-visibility blue focus ring.
- **Secondary / Ghost:** neutral border or transparent treatment using the same geometry.

### Chips

- Status and filter chips use text plus colour, never colour alone. Selected filters have a light blue fill and navy text.

### Cards / Containers

- **Corner Style:** 18px for major mobile panels, 12px for contained rows.
- **Background:** near-white surface over paper.
- **Shadow Strategy:** flat by default.
- **Border:** one-pixel neutral line.
- **Internal Padding:** 16px on phones, 20–24px on wider screens.

### Inputs / Fields

- **Style:** white surface, neutral border, 8px radius, 16px entered text.
- **Focus:** blue border and visible focus outline.
- **Error / Disabled:** inline text and icon/wording; never colour only.

### Navigation

A compact rail supports desktop. Phones use a four-item bottom bar with a prominent New action nearby. Active state uses blue plus a label; icons never stand alone where meaning is ambiguous.

### Document Preview

The preview uses the supplied invoice's navy section bands, gold price emphasis, project-specific categories, and strong grand-total block. It is visually denser than the application because it represents an A4 commercial artifact.

## 6. Do's and Don'ts

### Do:

- **Do** keep New document accessible within one tap.
- **Do** show category totals and the grand total while pricing is edited.
- **Do** collapse editing to one column at phone widths.
- **Do** retain explicit labels for Materials, Labour, Equipment hire, Additional costs, Terms, and Exclusions.
- **Do** use state motion only, between 150 and 220ms, with reduced-motion support.

### Don't:

- **Don't** build a generic analytics dashboard, consumer banking app, flashy construction landing page, or overloaded enterprise accounting suite.
- **Don't** use purple/blue SaaS gradients, glass panels, decorative charts, nested cards, tiny desktop tables on mobile, or jargon-heavy bookkeeping language.
- **Don't** use gold decoratively across the UI; reserve it for commercial emphasis.
- **Don't** hide VAT mode or deposit calculations.
- **Don't** require a desktop-only step to finish or share a document.

