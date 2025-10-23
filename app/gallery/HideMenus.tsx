"use client";
import { useEffect } from "react";

export default function HideMenus() {
  useEffect(() => {
    const hideByText = (text: string) => {
      document
        .querySelectorAll<HTMLElement>('button, a, [role="button"]')
        .forEach((el) => {
          const t = el.innerText?.trim().toLowerCase();
          if (t && t.includes(text)) el.style.display = "none";
        });
    };
    hideByText("pay with crypto");
    hideByText("language");
  }, []);

  return null;
}
