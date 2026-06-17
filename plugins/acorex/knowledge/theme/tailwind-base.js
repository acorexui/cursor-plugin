const plugin = require('tailwindcss/plugin');
const { withAnimations } = require('animated-tailwindcss');
const {
  createBorderSurfaces,
  createOnSurfaces,
  createPalette,
  createSurfaces,
  createColorSurfaces,
  createColoredSurfaces,
} = require('./generators/index');

const childSelector = plugin(function ({ addVariant }) {
  addVariant('child', '& > *');
  addVariant('child-hover', '& > *:hover');
  addVariant('child-focus', '& > *:focus');
  addVariant('child-focus-within', '& > *:focus-within');
});

const SURFACE_BG = {
  DEFAULT: 'rgba(var(--ax-sys-color-lightest-surface), <alpha-value>)',
  default: 'rgba(var(--ax-sys-color-lightest-surface), <alpha-value>)',

  lightest: 'rgba(var(--ax-sys-color-lightest-surface), <alpha-value>)',
  lighter: 'rgba(var(--ax-sys-color-lighter-surface), <alpha-value>)',
  light: 'rgba(var(--ax-sys-color-light-surface), <alpha-value>)',

  surface: 'rgba(var(--ax-sys-color-surface), <alpha-value>)',

  dark: 'rgba(var(--ax-sys-color-dark-surface), <alpha-value>)',
  darker: 'rgba(var(--ax-sys-color-darker-surface), <alpha-value>)',
  darkest: 'rgba(var(--ax-sys-color-darkest-surface), <alpha-value>)',
};

const SURFACES_ON = {
  on: {
    DEFAULT: 'rgba(var(--ax-sys-color-on-lightest-surface), <alpha-value>)',
    default: 'rgba(var(--ax-sys-color-on-lightest-surface), <alpha-value>)',

    lightest: 'rgba(var(--ax-sys-color-on-lightest-surface), <alpha-value>)',
    lighter: 'rgba(var(--ax-sys-color-on-lighter-surface), <alpha-value>)',
    light: 'rgba(var(--ax-sys-color-on-light-surface), <alpha-value>)',

    surface: 'rgba(var(--ax-sys-color-on-surface), <alpha-value>)',

    dark: 'rgba(var(--ax-sys-color-on-dark-surface), <alpha-value>)',
    darker: 'rgba(var(--ax-sys-color-on-darker-surface), <alpha-value>)',
    darkest: 'rgba(var(--ax-sys-color-on-darkest-surface), <alpha-value>)',
  },
};

const SURFACE_BORDER = {
  DEFAULT: 'rgba(var(--ax-sys-color-border-lightest-surface), <alpha-value>)',
  default: 'rgba(var(--ax-sys-color-border-lightest-surface), <alpha-value>)',

  lightest: 'rgba(var(--ax-sys-color-border-lightest-surface), <alpha-value>)',
  lighter: 'rgba(var(--ax-sys-color-border-lighter-surface), <alpha-value>)',
  light: 'rgba(var(--ax-sys-color-border-light-surface), <alpha-value>)',

  surface: 'rgba(var(--ax-sys-color-border-surface), <alpha-value>)',

  dark: 'rgba(var(--ax-sys-color-border-dark-surface), <alpha-value>)',
  darker: 'rgba(var(--ax-sys-color-border-darker-surface), <alpha-value>)',
  darkest: 'rgba(var(--ax-sys-color-border-darkest-surface), <alpha-value>)',
};

const dynamicSurfaceClasses = {
  ...createColoredSurfaces('primary'),
  ...createColoredSurfaces('secondary'),
  ...createColoredSurfaces('success'),
  ...createColoredSurfaces('warning'),
  ...createColoredSurfaces('danger'),
};

const UTILITY_CLASSES = {
  ...dynamicSurfaceClasses,
  '.h1': {
    'font-size': '2.5rem',
    'font-weight': '500',
    'line-height': '2.5rem',
  },
  '.h2': {
    'font-size': '2rem',
    'font-weight': '500',
    'line-height': '2rem',
  },
  '.h3': {
    'font-size': '1.75rem',
    'font-weight': '500',
    'line-height': '1.75rem',
  },
  '.h4': {
    'font-size': '1.5rem',
    'font-weight': '500',
    'line-height': '1.5rem',
  },
  '.h5': {
    'font-size': '1.125rem',
    'font-weight': '500',
    'line-height': '1.125rem',
  },
  '.h6': {
    'font-size': '1rem',
    'font-weight': '500',
    'line-height': '1rem',
  },
  '.heading': {
    width: '100%',
    'border-bottom': '1px solid',
    'border-color': 'rgba(var(--ax-sys-color-border-lightest-surface))',
    'line-height': '0.1em',
    margin: '1rem auto',
  },
  '.heading > span': {
    background: 'rgba(var(--ax-sys-color-surface))',
    padding: '0 0.75rem',
  },
  '.heading-start': {
    'text-align': 'start',
  },
  '.heading-center': {
    'text-align': 'center',
  },
  '.heading-end': {
    'text-align': 'end',
  },
  '.subtitle': {
    opacity: '74%',
    display: 'block',
    'font-size': '1rem',
    'font-weight': '400',
    'line-height': '1.625rem',
  },
  '.links': {
    color: 'rgba(var(--ax-sys-color-primary-surface))',
    cursor: 'pointer',
  },
  '.links:hover': {
    'text-decoration': 'underline',
  },
  '.links:visited': {
    color: 'rgba(var(--ax-sys-color-primary-darker))',
  },
  '.animate-slow': {
    animationDuration: '2s',
  },
  '.animate-slower': {
    animationDuration: '3s',
  },
  '.animate-2xslower': {
    animationDuration: '5s',
  },
  '.animate-fast': {
    animationDuration: '800ms',
  },
  '.animate-faster': {
    animationDuration: '500ms',
  },
  '.animate-2xfaster': {
    animationDuration: '250ms',
  },
  '.card': {
    backgroundColor: 'rgb(var(--ax-sys-color-surface))',
    border: '1px solid',
    borderColor: 'rgb(var(--ax-sys-color-border-lightest-surface))',
    borderRadius: 'var(--ax-sys-border-radius)',
  },
  '.tabs-fit': {
    width: '100%',
  },
  '.xs': {
    '--ax-sys-size-base': '1.5rem',
  },
  '.sm': {
    '--ax-sys-size-base': '2rem',
  },
  '.md': {
    '--ax-sys-size-base': '2.5rem',
  },
  '.lg': {
    '--ax-sys-size-base': '3.375rem',
  },
  '.xl': {
    '--ax-sys-size-base': '4rem',
  },
  '.surface': {
    backgroundColor: 'rgb(var(--ax-sys-color-surface))',
    color: 'rgb(var(--ax-sys-color-on-surface))',
    borderColor: 'rgb(var(--ax-sys-color-border-surface))',
  },
  '.lightest-surface': {
    backgroundColor: 'rgb(var(--ax-sys-color-lightest-surface))',
    color: 'rgb(var(--ax-sys-color-on-lightest-surface))',
    borderColor: 'rgb(var(--ax-sys-color-border-lightest-surface))',
  },
  '.lighter-surface': {
    backgroundColor: 'rgb(var(--ax-sys-color-lighter-surface))',
    color: 'rgb(var(--ax-sys-color-on-lighter-surface))',
    borderColor: 'rgb(var(--ax-sys-color-border-lighter-surface))',
  },
  '.light-surface': {
    backgroundColor: 'rgb(var(--ax-sys-color-light-surface))',
    color: 'rgb(var(--ax-sys-color-on-light-surface))',
    borderColor: 'rgb(var(--ax-sys-color-border-light-surface))',
  },
  '.dark-surface': {
    backgroundColor: 'rgb(var(--ax-sys-color-dark-surface))',
    color: 'rgb(var(--ax-sys-color-on-dark-surface))',
    borderColor: 'rgb(var(--ax-sys-color-border-dark-surface))',
  },
  '.darker-surface': {
    backgroundColor: 'rgb(var(--ax-sys-color-darker-surface))',
    color: 'rgb(var(--ax-sys-color-on-darker-surface))',
    borderColor: 'rgb(var(--ax-sys-color-border-darker-surface))',
  },
  '.darkest-surface': {
    backgroundColor: 'rgb(var(--ax-sys-color-darkest-surface))',
    color: 'rgb(var(--ax-sys-color-on-darkest-surface))',
    borderColor: 'rgb(var(--ax-sys-color-border-darkest-surface))',
  },
};

module.exports = withAnimations({
  content: ['./src/**/*.{html,ts,scss}', './projects/**/*.{html,ts,scss}'],
  darkMode: 'class',
  safelist: [
    {
      pattern: /(?:(?:on|border)-)?(?:lightest|lighter|light|surface|dark|darker|darkest)/,
    },
    {
      pattern:
        /(?:bg|text)(?:-(?:primary|secondary|danger|success|warning))?-(?:50|100|200|300|400|500|600|700|800|900|950)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        ...SURFACE_BG,
        ...SURFACES_ON,
        primary: createPalette('primary'),
        secondary: createPalette('secondary'),
        success: createPalette('success'),
        danger: createPalette('danger'),
        warning: createPalette('warning'),
      },
      textColor: {
        DEFAULT: 'rgba(var(--ax-sys-color-on-lightest-surface), <alpha-value>)',
        default: 'rgba(var(--ax-sys-color-on-lightest-surface), <alpha-value>)',
        primary: createOnSurfaces('primary'),
        secondary: createOnSurfaces('secondary'),
        success: createOnSurfaces('success'),
        danger: createOnSurfaces('danger'),
        warning: createOnSurfaces('warning'),
        ...SURFACES_ON,
      },
      backgroundColor: {
        primary: createSurfaces('primary'),
        secondary: createSurfaces('secondary'),
        success: createSurfaces('success'),
        danger: createSurfaces('danger'),
        warning: createSurfaces('warning'),
        ...SURFACE_BG,
        ...SURFACES_ON,
      },
      borderColor: {
        primary: createBorderSurfaces('primary'),
        secondary: createBorderSurfaces('secondary'),
        success: createBorderSurfaces('success'),
        danger: createBorderSurfaces('danger'),
        warning: createBorderSurfaces('warning'),
        ...SURFACE_BORDER,
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      borderRadius: {
        default: 'var(--ax-sys-border-radius)',
      },
      lineHeight: {
        11: '2.5rem',
        12: '3rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
      },
      spacing: {
        default: 'var(--ax-sys-size-base)',
      },
      minWidth: {
        default: 'var(--ax-sys-size-base)',
      },
      width: {
        default: 'var(--ax-sys-size-base)',
      },
      minHeight: {
        default: 'var(--ax-sys-size-base)',
      },
      height: {
        default: 'var(--ax-sys-size-base)',
      },
      maxHeight: {
        default: 'var(--ax-sys-size-base)',
      },
      keyframes: {
        floating: {
          '0%': { transform: 'translatey(0px)' },
          '50%': { transform: 'translatey(-20px)' },
          '100%': { transform: 'translatey(0px)' },
        },
      },
      animation: {
        floating: 'floating 6s ease-in-out infinite',
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities(UTILITY_CLASSES, ['responsive', 'hover', 'focus']);
    }),
    childSelector,
  ],
});
