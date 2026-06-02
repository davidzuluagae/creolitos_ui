export const colorThemes = {
  'creoCont-pink': {
    tabBg: 'bg-creoCont-pink',
    tabHoverBg: 'hover:bg-creoCont-pink/90',
    border: 'border-creoCont-pink',
    panelBorder: 'border-creoCont-pink',
    imageRail: 'bg-creoCont-pink/15',
    ring: 'focus-visible:ring-creoCont-pink',
  },
  'creoCont-purple': {
    tabBg: 'bg-creoCont-purple',
    tabHoverBg: 'hover:bg-creoCont-purple/90',
    border: 'border-creoCont-purple',
    panelBorder: 'border-creoCont-purple',
    imageRail: 'bg-creoCont-purple/15',
    ring: 'focus-visible:ring-creoCont-purple',
  },
  'creoCont-mint': {
    tabBg: 'bg-creoCont-mint',
    tabHoverBg: 'hover:bg-creoCont-mint/90',
    border: 'border-creoCont-mint',
    panelBorder: 'border-creoCont-mint',
    imageRail: 'bg-creoCont-mint/15',
    ring: 'focus-visible:ring-creoCont-mint',
  },
  'creoCont-yellow': {
    tabBg: 'bg-creoCont-yellow',
    tabHoverBg: 'hover:bg-creoCont-yellow/90',
    border: 'border-creoCont-yellow',
    panelBorder: 'border-creoCont-yellow',
    imageRail: 'bg-creoCont-yellow/15',
    ring: 'focus-visible:ring-creoCont-yellow',
  },
  'creoCont-blue': {
    tabBg: 'bg-creoCont-blue',
    tabHoverBg: 'hover:bg-creoCont-blue/90',
    border: 'border-creoCont-blue',
    panelBorder: 'border-creoCont-blue',
    imageRail: 'bg-creoCont-blue/15',
    ring: 'focus-visible:ring-creoCont-blue',
  },
} as const;

export type ThemeKey = keyof typeof colorThemes;

export const serviceThemeList: ThemeKey[] = [
  'creoCont-pink',
  'creoCont-mint',
  'creoCont-yellow',
  'creoCont-purple',
  'creoCont-blue',
];

export function getServiceTheme(index: number) {
  return colorThemes[serviceThemeList[index % serviceThemeList.length]];
}
