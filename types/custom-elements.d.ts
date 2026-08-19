import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'upm-dac': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'order-config-url'?: string;
          'currency-code'?: string;
        },
        HTMLElement
      >;
    }
  }
}

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'upm-dac': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'order-config-url'?: string;
          'currency-code'?: string;
        },
        HTMLElement
      >;
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      'upm-dac': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'order-config-url'?: string;
          'currency-code'?: string;
        },
        HTMLElement
      >;
    }
  }
}
