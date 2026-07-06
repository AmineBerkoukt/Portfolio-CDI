"use client";

import { useState } from "react";

export default function useRestoredScroll() {
  const [restoredScroll] = useState(() => typeof window !== "undefined" && window.scrollY > 0);

  return restoredScroll;
}