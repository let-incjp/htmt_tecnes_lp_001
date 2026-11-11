// 中間ページ(/line-thanks/)でのみ発火させるコンバージョンイベント。
// ピクセルのベースコード読み込みが間に合わない場合に備え、
// 短い間隔で最大約2秒まで ttq / fbq の存在確認をリトライしてから発火する。

declare global {
  interface Window {
    ttq?: {
      track?: (...args: unknown[]) => void;
      [key: string]: unknown;
    };
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

// TikTok: Contact / Meta: Lead を中間ページ到達時に1回だけ発火する。
export async function fireLineIntermediateConversionEvents() {
  const [ttqReady, fbqReady] = await Promise.all([
    waitFor(() => typeof window.ttq?.track === "function"),
    waitFor(() => typeof window.fbq === "function"),
  ]);

  if (ttqReady) {
    window.ttq?.track?.("Contact");
  }
  if (fbqReady) {
    window.fbq?.("track", "Lead");
  }
}
