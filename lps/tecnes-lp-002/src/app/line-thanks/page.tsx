"use client";

import { useEffect, useRef } from "react";
import { LINE_URL } from "@/lib/constants";
import { fireLineIntermediateConversionEvents } from "@/lib/tracking";

const REDIRECT_DELAY_MS = 4000;

export default function LineThanksPage() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    fireLineIntermediateConversionEvents();

    const timer = setTimeout(() => {
      window.location.replace(LINE_URL);
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="line-thanks">
      <div className="line-thanks__card">
        <img
          src="/images/tecnes_icon.png"
          width={160}
          height={70}
          alt="株式会社TECNES"
          className="line-thanks__logo"
        />
        <div className="line-thanks__spinner" aria-hidden="true" />
        <h1 className="line-thanks__ttl">LINEを開いています…</h1>
        <p className="line-thanks__note">
          自動で切り替わらない場合は、下のボタンを押してください
        </p>
        <a href={LINE_URL} className="btn btn_line btn_lg line-thanks__btn">
          公式LINEを開く（友だち追加）
        </a>
      </div>
    </main>
  );
}
