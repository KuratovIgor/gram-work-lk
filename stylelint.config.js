module.exports = {
  extends: [
    'stylelint-config-standard-scss', // Configure for SCSS
    'stylelint-config-recommended-vue', // Add overrides for .Vue files
    'stylelint-config-recess-order', // Use the recess order for properties
    'stylelint-config-css-modules', // Configure for CSS Modules methodology
  ],

  plugins: [],

  overrides: [
    { files: ['**/*.scss'], customSyntax: 'postcss-scss' },
    { files: ['**/*.vue'], customSyntax: 'postcss-html' },
  ],

  rules: {
    'order/order': [
      'custom-properties',
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: false,
      },
      'declarations',
      { type: 'rule', selector: '&::before' },
      { type: 'rule', selector: '&::after' },
      'rules',
      { type: 'rule', selector: '&:link' },
      { type: 'rule', selector: '&:visited' },
      { type: 'rule', selector: '&:hover' },
      { type: 'rule', selector: '&:focus' },
      { type: 'rule', selector: '&:active' },
      { type: 'rule', selector: '&:disabled' },
      { type: 'rule', selector: '&:first-child' },
      { type: 'rule', selector: '&:last-child' },
      { type: 'rule', selector: '&:nth-child.+' },
      { type: 'rule', selector: '&\\[[^\\[\\]]+\\]' },
      { type: 'rule', selector: '&\\..+' },
      { type: 'rule', selector: '&--.+' },
      { type: 'rule', selector: '.* &' },
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: true,
      },
    ],

    'order/properties-alphabetical-order': null,
    'order/properties-order': [
      [
        'all',
        'print-color-adjust',
        'appearance',
        'counter-increment',
        'counter-reset',
        'content',
        'quotes',
        'top',
        'left',
        'right',
        'bottom',
        'width',
        'height',
        'min-width',
        'min-height',
        'max-width',
        'max-height',
        'position',
        'display',
        'columns',
        'column-width',
        'column-count',
        'column-fill',
        'column-gap',
        'column-rule',
        'column-rule-style',
        'column-rule-width',
        'column-rule-color',
        'column-span',
        'break-after',
        'break-before',
        'break-inside',
        'page-break-after',
        'page-break-before',
        'page-break-inside',
        'orphans',
        'widows',
        'flex',
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'flex-flow',
        'flex-direction',
        'flex-wrap',
        'place-content',
        'place-items',
        'place-self',
        'align-content',
        'align-items',
        'align-self',
        'justify-content',
        'justify-items',
        'justify-self',
        'order',
        'clear',
        'float',
        'grid',
        'grid-area',
        'grid-auto-columns',
        'grid-auto-flow',
        'grid-auto-rows',
        'grid-column',
        'grid-column-end',
        'grid-column-gap',
        'grid-column-start',
        'grid-gap',
        'grid-row',
        'grid-row-end',
        'grid-row-gap',
        'grid-row-start',
        'grid-template',
        'grid-template-areas',
        'grid-template-columns',
        'grid-template-rows',
        'list-style',
        'list-style-type',
        'list-style-position',
        'list-style-image',
        'caption-side',
        'empty-cells',
        'table-layout',
        'vertical-align',
        'clip-path',
        'mask',
        'mask-clip',
        'mask-composite',
        'mask-image',
        'mask-mode',
        'mask-origin',
        'mask-position',
        'mask-position-x',
        'mask-position-y',
        'mask-repeat',
        'mask-repeat-x',
        'mask-repeat-y',
        'mask-size',
        'mask-type',
        'shape-image-threshold',
        'shape-margin',
        'shape-outside',
        'contain',
        'outline',
        'outline-style',
        'outline-width',
        'outline-color',
        'outline-offset',
        'outline-radius',
        'outline-radius-topleft',
        'outline-radius-topright',
        'outline-radius-bottomright',
        'outline-radius-bottomleft',
        'border',
        'border-style',
        'border-width',
        'border-color',
        'border-top',
        'border-top-style',
        'border-top-width',
        'border-top-color',
        'border-right',
        'border-right-style',
        'border-right-width',
        'border-right-color',
        'border-bottom',
        'border-bottom-style',
        'border-bottom-width',
        'border-bottom-color',
        'border-left',
        'border-left-style',
        'border-left-width',
        'border-left-color',
        'border-before',
        'border-before-style',
        'border-before-width',
        'border-before-color',
        'border-end',
        'border-end-style',
        'border-end-width',
        'border-end-color',
        'border-after',
        'border-after-style',
        'border-after-width',
        'border-after-color',
        'border-start',
        'border-start-style',
        'border-start-width',
        'border-start-color',
        'border-collapse',
        'border-image',
        'border-image-source',
        'border-image-slice',
        'border-image-width',
        'border-image-outset',
        'border-image-repeat',
        'border-radius',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-right-radius',
        'border-bottom-left-radius',
        'border-spacing',
        'box-decoration-break',
        'box-shadow',
        'box-sizing',
        'src',
        'font',
        'font-family',
        'font-weight',
        'font-style',
        'font-display',
        'font-feature-settings',
        'font-kerning',
        'font-smoothing',
        'font-stretch',
        'font-synthesis',
        'font-variant',
        'font-variant-alternates',
        'font-variant-caps',
        'font-variant-east-asian',
        'font-variant-ligatures',
        'font-variant-numeric',
        'font-variant-position',
        'font-size',
        'font-size-adjust',
        'unicode-bidi',
        'unicode-range',
        'line-break',
        'line-height',
        'letter-spacing',
        'word-break',
        'word-spacing',
        'word-wrap',
        'white-space',
        'hyphens',
        'tab-size',
        'text-align',
        'text-align-last',
        'text-combine-upright',
        'text-decoration',
        'text-decoration-style',
        'text-decoration-line',
        'text-decoration-color',
        'text-decoration-skip',
        'text-emphasis',
        'text-emphasis-style',
        'text-emphasis-color',
        'text-emphasis-position',
        'text-fill-color',
        'text-indent',
        'text-justify',
        'text-orientation',
        'text-overflow',
        'text-rendering',
        'text-security',
        'text-shadow',
        'text-size-adjust',
        'text-stroke',
        'text-stroke-width',
        'text-stroke-color',
        'text-transform',
        'text-underline-position',
        'direction',
        'writing-mode',
        'ruby-align',
        'ruby-position',
        'color',
        'caret-color',
        'tap-highlight-color',
        'd',
        'x',
        'y',
        'cx',
        'cy',
        'r',
        'rx',
        'ry',
        'fill',
        'fill-opacity',
        'fill-rule',
        'stroke',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke-width',
        'alignment-baseline',
        'baseline-shift',
        'dominant-baseline',
        'clip-rule',
        'color-interpolation',
        'color-interpolation-filters',
        'color-rendering',
        'flood-color',
        'flood-opacity',
        'lighting-color',
        'marker',
        'marker-end',
        'marker-mid',
        'marker-start',
        'paint-order',
        'shape-rendering',
        'stop-color',
        'stop-opacity',
        'text-anchor',
        'offset',
        'offset-position',
        'offset-path',
        'offset-distance',
        'offset-anchor',
        'offset-rotate',
        'background',
        'background-image',
        'background-position',
        'background-position-x',
        'background-position-y',
        'background-size',
        'background-repeat',
        'background-repeat-x',
        'background-repeat-y',
        'background-origin',
        'background-clip',
        'background-attachment',
        'background-color',
        'background-blend-mode',
        'image-orientation',
        'image-rendering',
        'object-fit',
        'object-position',
        'filter',
        'isolation',
        'mix-blend-mode',
        'zoom',
        'backface-visibility',
        'perspective',
        'perspective-origin',
        'perspective-origin-x',
        'perspective-origin-y',
        'transform',
        'transform-box',
        'transform-origin',
        'transform-origin-x',
        'transform-origin-y',
        'transform-origin-z',
        'transform-style',
        'transition',
        'transition-property',
        'transition-duration',
        'transition-delay',
        'transition-timing-function',
        'animation',
        'animation-name',
        'animation-duration',
        'animation-delay',
        'animation-timing-function',
        'animation-iteration-count',
        'animation-direction',
        'animation-fill-mode',
        'animation-play-state',
        'will-change',
        'cursor',
        'pointer-events',
        'touch-action',
        'user-drag',
        'user-focus',
        'user-select',
        'user-zoom',
        'resize',
        'scroll-behavior',
        'scroll-snap-coordinate',
        'scroll-snap-destination',
        'scroll-snap-type',
        'scroll-snap-type-x',
        'scroll-snap-type-y',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'padding-before',
        'padding-end',
        'padding-after',
        'padding-start',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'margin-before',
        'margin-end',
        'margin-after',
        'margin-start',
        'margin-collapse',
        'margin-top-collapse',
        'margin-bottom-collapse',
        'margin-before-collapse',
        'margin-after-collapse',
        'overflow',
        'overflow-x',
        'overflow-y',
        'overflow-anchor',
        'overflow-wrap',
        'visibility',
        'opacity',
        'z-index',
      ],
      { unspecified: 'bottomAlphabetical' },
    ],

    'unit-no-unknown': true,
    'string-no-newline': true,
    'max-nesting-depth': null,
    'number-max-precision': 5,
    'time-min-milliseconds': 10,
    'length-zero-no-unit': true,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'keyframe-declaration-no-important': true,
    'shorthand-property-no-redundant-values': true,
    'block-no-empty': [true, { severity: 'warning' }],
    'property-no-unknown': null,
    'value-keyword-case': ['lower', { ignoreKeywords: [/Grtsk-Peta.*/] }],
    'rule-empty-line-before': [
      'always-multi-line',
      { except: ['first-nested'], ignore: ['after-comment'] },
    ],

    'unit-disallowed-list': ['ch', 'cm', 'ex', 'in', 'mm', 'pc', 'pt', 'q'],

    'at-rule-disallowed-list': ['extend'],
    'at-rule-name-newline-after': null,
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,

    'no-descending-specificity': null,
    'no-duplicate-selectors': true,
    'no-invalid-double-slash-comments': true,
    'no-missing-end-of-source-newline': null,
    'no-unknown-animations': true,
    'no-empty-source': [true, { severity: 'warning' }],

    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-hex': null,
    'color-no-invalid-hex': true,
    'alpha-value-notation': null,

    'comment-no-empty': true,
    'comment-whitespace-inside': 'always',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],

    'custom-media-pattern': null,
    'custom-property-pattern': null,
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block'],
      },
    ],

    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-single-line-max-declarations': 0,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block'],
      },
    ],
    'declaration-no-important': [true, { severity: 'warning' }],

    'font-family-name-quotes': 'always-unless-keyword',
    'font-family-no-duplicate-names': true,
    'font-weight-notation': 'numeric',

    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-name-case': 'lower',
    'function-url-no-scheme-relative': true,
    'function-url-quotes': 'always',
    'function-whitespace-after': 'always',
    'function-no-unknown': null,

    'media-feature-name-no-unknown': true,
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'selector-max-attribute': null,
    'selector-max-class': null,
    'selector-max-combinators': null,
    'selector-max-compound-selectors': null,
    'selector-max-id': 1,
    'selector-max-specificity': null,
    'selector-max-type': null,
    'selector-max-universal': null,
    'selector-nested-pattern': null,
    'selector-no-qualifying-type': null,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep'] },
    ],
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['input-placeholder'] },
    ],
    'selector-type-case': 'lower',
    'selector-type-no-unknown': true,

    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-function-pattern': null,
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-mixin-pattern': null,
    'scss/at-rule-no-unknown': null,
    'scss/declaration-nested-properties': 'never',
    'scss/declaration-nested-properties-no-divided-groups': null,
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-no-missing-interpolation': null,
    'scss/dollar-variable-pattern': null,
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['between-comments', 'stylelint-commands'],
      },
    ],
    'scss/double-slash-comment-inline': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'scss/media-feature-value-dollar-variable': null,
    'scss/operator-no-newline-after': null,
    'scss/operator-no-newline-before': null,
    'scss/operator-no-unspaced': true,
    'scss/partial-no-import': null,
    'scss/percent-placeholder-pattern': null,
    'scss/selector-no-redundant-nesting-selector': true,
  },
}
