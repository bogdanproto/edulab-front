declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const path: string;
  export default path;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}

/// <reference types="vite/client" />
