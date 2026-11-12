// 中間ページ(/line-thanks/)でのみ発火させるコンバージョンイベント。
// ピクセルのベースコード読み込みが間に合わない場合に備え、
// 短い間隔で最大約2秒まで fbq の存在確認をリトライしてから発火する。
// このLP(tecnes-lp-004-meta)はMeta広告専用のため、TikTokイベントは発火しない。

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function waitFor(
  check: () => boolean,
  { timeoutMs = 2000, intervalMs = 100 } = {}
): Promise<boolean> {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (check()) {
        resolve(true);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        resolve(false);
        return;
      }
      setTimeout(tick, intervalMs);
    };
    tick();
  });
}

// Meta: Lead を中間ページ到達時に1回だけ発火する。
export async function fireLineIntermediateConversionEvents() {
  const fbqReady = await waitFor(() => typeof window.fbq === "function");

  if (fbqReady) {
    window.fbq?.("track", "Lead");
  }
}
