import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // モノレポ内の複数lockfile検出による誤ったワークスペースルート推論
  // （と警告）を防ぐため、このプロジェクト自身をルートに固定する
  outputFileTracingRoot: __dirname,
  // /line-thanks/ など末尾スラッシュ付きURLをそのまま正とする
  trailingSlash: true,
};

export default nextConfig;
