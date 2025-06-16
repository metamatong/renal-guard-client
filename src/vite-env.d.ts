declare module '*.svg?component' {
  import * as React from 'react';
  const C: React.FC<React.SVGProps<SVGSVGElement>>;
  export default C;
}

declare module '*.svg';
declare module '*.png';
declare module '*.css';