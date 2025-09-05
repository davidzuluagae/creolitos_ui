# CREOLITOS WEBSITE

## Color guidelines
**REF:** [tailwind.config.ts](/tailwind.config.ts)

### 1. Hierarchy of Use

#### Primary (`creoPri`)
Calls to action (buttons, links, highlights). This is your “signature” color family.

#### Secondary (`creoSec`)
Surfaces (card backgrounds, section fills, subtle borders). Creates warmth + depth.

#### Limited (`creoLim`)
Typography & small accents. Keeps everything grounded.

#### Contrast (`creoCont`)
Playful splashes. Should never overpower primary, but add energy and friendliness.

### 2. Balancing Warm + Bright

- Stick to 1 Primary + 1 Contrast per screen/section.
- Use Secondary neutrals as the “canvas” for your Primary + Contrast colors.
- Keep Limited tones mainly in text + footer so they don’t drag down the playful feel.

### 3. Accessibility & Readability

- On light Contrast backgrounds (mint, yellow, purple100): use creoLim.400 for text.
- On dark Limited backgrounds: use creoCont.neutral1 or white for text.
- Buttons should use creoPri.100 or creoPri.200 with hover states shifting slightly darker/lighter.