"use client";

import { ReactLenis } from 'lenis/react';
import React from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
