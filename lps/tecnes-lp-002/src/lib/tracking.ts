// 中間ページ(/line-thanks/)でのみ発火させるコンバージョンイベント。
// ピクセルのベースコード読み込みが間に合わない場合に備え、
// 短い間隔で最大約2秒まで ttq の存在確認をリトライしてから発火する。
// このLP(tecnes-lp-002)はMeta Pixelを設置しないため、Metaイベントは発火しない。

declare global {
  interface Window {
    ttq?: {
      track?: (...args: unknown[]) => void;
      [key: string]: unknown;
    };
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

// TikTok: Contact を中間ページ到達時に1回だけ発火する。
export async function fireLineIntermediateConversionEvents() {
  const ttqReady = await waitFor(() => typeof window.ttq?.track === "function");

  if (ttqReady) {
    window.ttq?.track?.("Contact");
  }
}
