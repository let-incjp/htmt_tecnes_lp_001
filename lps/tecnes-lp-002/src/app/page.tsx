"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   constants
------------------------------------------------------------------ */

// TODO: クライアント確認後、実績値に差し替え
const STATS = {
  inexperienced: { label: "未経験スタート", num: 80, unit: "%", note: "入社時に業界未経験" },
  license: { label: "資格取得支援", num: 100, unit: "%", note: "受験費用を会社負担" },
} as const;

const LINE_URL = "https://lmasters.aigrowthx.pro/r/cmszgyugv000511my7b7cz5z2";
const CTA_MICRO = "履歴書不要・私服OK／質問だけでも大歓迎";

const NAV_LINKS = [
  { href: "#reasons", label: "活躍理由" },
  { href: "#work", label: "仕事内容" },
  { href: "#step", label: "成長ロードマップ" },
  { href: "#join", label: "入社の流れ" },
  { href: "#faq", label: "よくある質問" },
];

const FOOT_LINKS = [
  { href: "#reasons", label: "活躍理由" },
  { href: "#work", label: "仕事内容" },
  { href: "#step", label: "成長ロードマップ" },
  { href: "#join", label: "入社までの流れ" },
  { href: "#faq", label: "よくある質問" },
  { href: "#company", label: "運営会社" },
];

/* ------------------------------------------------------------------
   scroll reveal（ワイプアニメーション発火）
------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-v")
    );
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------
   fixed header: スクロールで影付与
------------------------------------------------------------------ */
function useScrolledHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/* ------------------------------------------------------------------
   mobile sticky CTA（下部固定バー）
------------------------------------------------------------------ */
function useStickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    const entry = document.getElementById("entry");
    if (!hero || !entry || !("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    let heroPassed = false;
    let entryVisible = false;
    const update = () => setShow(heroPassed && !entryVisible);

    const heroIo = new IntersectionObserver(
      ([e]) => {
        heroPassed = !e.isIntersecting;
        update();
      },
      { threshold: 0.05 }
    );
    const entryIo = new IntersectionObserver(
      ([e]) => {
        entryVisible = e.isIntersecting;
        update();
      },
      { threshold: 0.05 }
    );
    heroIo.observe(hero);
    entryIo.observe(entry);
    return () => {
      heroIo.disconnect();
      entryIo.disconnect();
    };
  }, []);
  return show;
}

/* ------------------------------------------------------------------
   セクション見出し（英日2段組）
------------------------------------------------------------------ */
function SecTtl({
  en,
  jp,
  align = "left",
  onDark = false,
}: {
  en: string;
  jp: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <h2
      className={`sec-ttl${align === "left" ? " sec-ttl_left" : " sec-ttl_center"}${
        onDark ? " sec-ttl_on-dark" : ""
      }`}
    >
      <span className="sec-ttl__en en">{en}</span>
      <span className="sec-ttl__jp">
        <span className="sec-ttl__slash">/</span> {jp}
      </span>
    </h2>
  );
}

/* ------------------------------------------------------------------
   NEXT INNING（中間CTA帯・3箇所共通デザイン）
------------------------------------------------------------------ */
function CtaBand() {
  return (
    <section className="band slant-band">
      <div className="inner">
        <p className="band__en en" aria-hidden="true">
          NEXT INNING
        </p>
        <h2 className="band__title reveal">次の本気、はじめよう。</h2>
        <div className="cta-stack">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn_line btn_lg"
          >
            公式LINEでカジュアル面談 ▶
          </a>
          <p className="cta-micro">{CTA_MICRO}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   data
------------------------------------------------------------------ */
const empathy = [
  "「引退」した日から、あの頃ほど本気になれるものに出会えていない。",
  "デスクに1日中座る仕事より、体を動かして汗をかきたい。",
  "一人でコツコツより、仲間とチームで一つの目標を追いたい。",
  "学歴や勉強に自信はない。でも、努力と根性なら誰にも負けない。",
  "上下関係や礼儀は当たり前。それが評価される場所で働きたい。",
  "やった分だけ、ちゃんと結果と給料で返ってくる仕事がいい。",
];

const reasons = [
  {
    no: "01",
    vlabel: "REPETITION.",
    icon: "repeat" as IconName,
    eq: "反復練習 ＝ 技術習得",
    title: "「素振り」できたヤツは、\n現場でも伸びる。",
    highlight: "素振り",
    txt: "毎日の反復で、未経験でも確実に上達する。",
  },
  {
    no: "02",
    vlabel: "TEAMWORK.",
    icon: "team" as IconName,
    eq: "チームプレー ＝ 班の連携",
    title: "現場は、\n9人で守る「チーム戦」。",
    highlight: "チーム戦",
    txt: "一人じゃない。仲間と連携して現場を完成させる。",
  },
  {
    no: "03",
    vlabel: "GUTS.",
    icon: "guts" as IconName,
    eq: "根性・体力 ＝ 現場力",
    title: "鍛えた体と粘りは、\nここで“戦力”になる。",
    highlight: "戦力",
    txt: "鍛えた体力と粘り強さが、現場の武器になる。",
  },
];

const translate = [
  { from: "守備位置・ポジション", to: "担当する工事・役割" },
  { from: "監督・コーチ", to: "現場の先輩・職長" },
  { from: "練習の積み重ね", to: "資格取得・技術習得" },
  { from: "試合・大会", to: "一つひとつの現場・引き渡し" },
  { from: "レギュラー・エース", to: "現場を任される職長・リーダー" },
];

const steps = [
  {
    phase: "1年目",
    no: "01",
    icon: "book" as IconName,
    title: "素振りの年",
    txt: "道具の名前やルールを、先輩と一緒に覚える。",
    tag: "OJT・基礎",
    goal: false,
  },
  {
    phase: "2〜3年目",
    no: "02",
    icon: "badge" as IconName,
    title: "スタメン定着",
    txt: "資格を取得し、任される仕事が増えていく。",
    tag: "資格取得支援",
    goal: false,
  },
  {
    phase: "4〜6年目",
    no: "03",
    icon: "flag" as IconName,
    title: "エース格へ",
    txt: "現場の中心として、班をまとめる存在に。",
    tag: "リーダー候補",
    goal: false,
  },
  {
    phase: "その先",
    no: "04",
    icon: "crown" as IconName,
    title: "監督（職長）",
    txt: "現場全体を指揮し、後輩を育てる立場へ。",
    tag: "職長・管理職",
    goal: true,
  },
];

const joinSteps = [
  {
    no: "01",
    icon: "chat" as IconName,
    title: "エントリー",
    txt: "LINEから30秒で完了。履歴書は不要です。",
    img: "/images/join-01.jpg",
  },
  {
    no: "02",
    icon: "video" as IconName,
    title: "カジュアル面談",
    txt: "私服OK・オンラインOK。気軽に話すだけ。",
    img: "/images/join-02.jpg",
  },
  {
    no: "03",
    icon: "helmet" as IconName,
    title: "現場見学（希望者のみ）",
    txt: "実際の現場と働き方を見てから決められます。",
    img: "/images/join-03.jpg",
  },
  {
    no: "04",
    icon: "star" as IconName,
    title: "内定・入社",
    txt: "最短2週間。入社日は相談OKです。",
    img: "/images/join-04.jpg",
  },
];

const faqs = [
  {
    q: "電気の知識ゼロ、まったくの未経験でも大丈夫ですか？",
    a: "大丈夫です。社員の8割が未経験スタート。先輩が基礎から教えます。",
  },
  {
    q: "体力や上下関係は、正直きついですか？",
    a: "体力は使いますが、厳しい部活経験者なら問題なし。理不尽な指導はありません。",
  },
  {
    q: "頑張りは、ちゃんと評価されますか？",
    a: "はい。資格取得や実力が、給与・昇給に直結します。",
  },
  {
    q: "給与や休みは、実際どうなんですか？",
    a: "カジュアル面談で、年収・休日のリアルをすべてお伝えします。",
  },
  {
    q: "野球経験しかなくても、将来キャリアは築けますか？",
    a: "築けます。未経験から現場を率いる職長になった先輩も多数います。",
  },
];

// 会社概要（出典: TECNES公式HP 会社概要）
const company = [
  { label: "会社名", value: "株式会社TECNES" },
  { label: "代表取締役", value: "田中 義和" },
  { label: "本社所在地", value: "〒577-0063 大阪府東大阪市川俣1-6-10" },
  { label: "会社設立", value: "平成18年（2006年）12月4日" },
  { label: "資本金", value: "1,000万円" },
  { label: "建設業許可番号", value: "国土交通大臣 許可（般-6）第27222号" },
  {
    label: "建設業の種類",
    value:
      "電気通信工事業／電気工事業／土木工事業／舗装工事業／とび・土木工事業／管工事業",
  },
  { label: "従業員数", value: "22名" },
  {
    label: "事業所",
    value:
      "西日本事業本部・大阪工事事務所（大阪府東大阪市川俣1-6-10）／東日本事業本部・千葉営業所（千葉県船橋市若松2-6-1 若松団地211）／仙台営業所（宮城県仙台市若林区種次字中野東36-3）",
  },
  {
    label: "事業内容",
    value: "一般電気工事／通信設備工事／電気土木工事／空調・衛生工事",
  },
];

/* ------------------------------------------------------------------
   見出し内の1語だけを txt-bg でハイライトして描画
------------------------------------------------------------------ */
function highlightLine(line: string, word: string, cls: string) {
  const idx = line.indexOf(word);
  if (idx === -1) return line;
  return (
    <>
      {line.slice(0, idx)}
      <span className={cls}>{word}</span>
      {line.slice(idx + word.length)}
    </>
  );
}

/* ------------------------------------------------------------------
   アイコン（文章の代わりに内容を視覚化するシンプルな線画アイコン）
------------------------------------------------------------------ */
type IconName =
  | "repeat"
  | "team"
  | "guts"
  | "book"
  | "badge"
  | "flag"
  | "crown"
  | "chat"
  | "video"
  | "helmet"
  | "star";

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "repeat":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M17 2l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 22l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 21v-1.5a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5V21" />
          <circle cx="17.5" cy="8.5" r="2.4" />
          <path d="M16 13.3a4 4 0 0 1 5.5 3.7V21" />
        </svg>
      );
    case "guts":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 21c-4-1.2-7-4.4-7-9 0-3 1.8-4.6 3-6.5.2 1.6 1 2.6 2 3.3-.3-2 .2-4 2-6.3 1 2.6 2.4 3.8 3.8 5.2C17.3 9.1 19 10.8 19 13.3 19 17 16 20 12 21Z" />
          <path d="M12 21c1.8-.6 3-2 3-3.8 0-1.5-.8-2.3-1.5-3.2" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 4.8A2.8 2.8 0 0 1 6.8 2H20v17H6.8A2.8 2.8 0 0 0 4 21.8V4.8Z" />
          <path d="M4 19A2.8 2.8 0 0 1 6.8 16.2H20" />
        </svg>
      );
    case "badge":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="8.5" r="5" />
          <path d="M8.3 12.8 6.5 22l5.5-3.2 5.5 3.2-1.8-9.2" />
        </svg>
      );
    case "flag":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M5 21V3" />
          <path d="M5 4h13l-3.2 4.5L18 13H5" />
        </svg>
      );
    case "crown":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M3 18h18l-1.6-9-4.9 4.3L12 6l-2.5 7.3L4.6 9 3 18Z" />
          <path d="M3 21h18" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 9 9 0 0 1-3.6-.7L3 21l1.4-5.1a8.4 8.4 0 0 1 .6-10A8.4 8.4 0 0 1 21 11.5Z" />
        </svg>
      );
    case "video":
      return (
        <svg viewBox="0 0 24 24">
          <rect x="2.5" y="6" width="13" height="12" rx="1.5" />
          <path d="M15.5 10.5 21.5 7v10l-6-3.5" />
        </svg>
      );
    case "helmet":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M3.5 16a8.5 8.5 0 0 1 17 0" />
          <path d="M2 16h20" />
          <path d="M12 16V8" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24">
          <path d="m12 2.5 2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7Z" />
        </svg>
      );
    default:
      return null;
  }
}

function IconChip({
  name,
  onDark = false,
  small = false,
}: {
  name: IconName;
  onDark?: boolean;
  small?: boolean;
}) {
  return (
    <span
      className={`icon-chip${onDark ? " icon-chip_on-dark" : ""}${
        small ? " icon-chip_sm" : ""
      }`}
      aria-hidden="true"
    >
      <Icon name={name} />
    </span>
  );
}


/* ------------------------------------------------------------------
   page
------------------------------------------------------------------ */
export default function Home() {
  useReveal();
  const stickyShow = useStickyCta();
  const scrolled = useScrolledHeader();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="wrap">
      {/* ============ HEADER ============ */}
      <header className={`siteheader${scrolled ? " is-scrolled" : ""}`}>
        <div className="siteheader__inner">
          <div className="siteheader__logo">
            <img src="/images/tecnes_icon.png" width={180} height={80} alt="株式会社TECNES" />
          </div>
          <nav className="siteheader__nav">
            {NAV_LINKS.map((l) => (
              <a href={l.href} key={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="siteheader__actions">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="siteheader__cta en"
            >
              LINEで応募 ▶
            </a>
            <button
              type="button"
              className={`siteheader__burger${menuOpen ? " is-open" : ""}`}
              aria-label="メニュー"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobilemenu${menuOpen ? " is-open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a href={l.href} key={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href={LINE_URL}
          className="btn btn_line mobilemenu__cta"
          onClick={() => setMenuOpen(false)}
          target="_blank"
          rel="noopener noreferrer"
        >
          LINEで応募 ▶
        </a>
      </div>

      {/* ============ 右サイド固定バナー ============ */}
      <aside className="floatbanner" aria-label="お問い合わせ">
        <p className="floatbanner__ttl">公式LINEで相談</p>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floatbanner__btn"
        >
          カジュアル面談へ ▶
        </a>
      </aside>

      {/* ============ HERO ============ */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <img
            src="/images/hero-bg.jpg"
            alt="現場へ向かうTECNESのチーム"
          />
        </div>
        <div className="hero__en-watermark en" aria-hidden="true">
          PLAY BALL
        </div>
        <div className="hero__triangle" aria-hidden="true" />

        {/* 切り抜き人物（斜めフレームで重ね配置） */}
        <div className="hero__cutouts" aria-hidden="true">
          <div className="hero__cutout hero__cutout--1">
            <img src="/images/hero-cutout-1.jpg" alt="" />
          </div>
          <div className="hero__cutout hero__cutout--2">
            <img src="/images/hero-cutout-2.jpg" alt="" />
          </div>
        </div>

        <div className="hero__roundbadge">
          未経験OK
          <br />
          高卒・大卒
          <br />
          既卒
        </div>

        <div className="hero__inner">
          <div className="hero__tag">
            <span>高卒・大卒・既卒OK｜元野球部・体育会系 歓迎</span>
          </div>
          <h1 className="hero__copy">
            甲子園は終わった。
            <br />
            <span className="line2 txt-bg txt-bg_brand">その全力は、まだだ。</span>
          </h1>
          <p className="hero__sub">
            引退したあの日から、本気になれるものを探しているなら。
            次の本気は、この現場にある。チームで戦い、努力が結果になる仕事——TECNES。
          </p>

          <div className="hero__badges">
            <div className="hbadge">
              <p className="hbadge__label">{STATS.inexperienced.label}</p>
              <p className="hbadge__num en">
                {STATS.inexperienced.num}
                <small>{STATS.inexperienced.unit}</small>
              </p>
            </div>
            <div className="hbadge">
              <p className="hbadge__label">資格費用 会社負担</p>
              <p className="hbadge__num en">
                {STATS.license.num}
                <small>{STATS.license.unit}</small>
              </p>
            </div>
          </div>

          <div className="hero__actions">
            <div className="cta-stack">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn_line btn_lg"
              >
                公式LINEでカジュアル面談
                <span className="btn__note">（友だち追加30秒）</span>
              </a>
              <p className="cta-micro">{CTA_MICRO}</p>
            </div>
            <a href="#reasons" className="btn">
              なぜ元野球部なのか
            </a>
          </div>
        </div>

        <div className="scrolldown en" aria-hidden="true">
          SCROLL
        </div>
      </section>

      {/* ============ EMPATHY ============ */}
      <section className="section empathy slant-band" id="empathy">
        <div className="inner">
          <div className="empathy__head reveal">
            <SecTtl en="ARE YOU THE ONE?" jp="あなたに当てはまるか" onDark />
          </div>

          <div className="empathy__body">
            <p className="empathy__title reveal">
              一つでも当てはまるなら、
              <br />
              {highlightLine("きっと、ここが合っている。", "きっと、ここが合っている。", "txt-bg")}
            </p>

            <div className="empathy__list">
              {empathy.map((t, i) => (
                <div
                  className="empathy__item reveal"
                  key={i}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="empathy__check">✓</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <p className="empathy__punch reveal">
              その気持ち、{highlightLine("全部“正解”だ。", "全部“正解”だ。", "txt-bg")}
              <small>
                TECNESは、元野球部の「らしさ」がそのまま強みになる会社。
                <br />
                グラウンドを、現場に変えよう。
              </small>
            </p>
          </div>
        </div>
        <div className="empathy__deco dia-img reveal" aria-hidden="true">
          <img src="/images/empathy-deco.jpg" alt="" />
        </div>
      </section>

      {/* ============ REASONS ============ */}
      <section className="section reasons slant-t-up" id="reasons">
        <div className="reasons__stripwrap reveal">
          <div className="reasons__strip" aria-hidden="true">
            <img src="/images/reasons-01.jpg" alt="" />
            <img src="/images/reasons-02.jpg" alt="" />
            <img src="/images/reasons-03.jpg" alt="" />
            <img src="/images/reasons-04.jpg" alt="" />
            <img src="/images/reasons-05.jpg" alt="" />
          </div>
          <SecTtl en="WHY BASEBALL PLAYERS WIN HERE" jp="なぜ元野球部が活躍できるのか" onDark align="center" />
        </div>
        <div className="inner">
          <h2 className="big-ttl reveal">
            なぜ、元野球部が
            <br />
            <span className="txt-bg txt-bg_brand">現場で活躍</span>できるのか。
          </h2>

          <div className="reasons__grid">
            {reasons.map((r, i) => (
              <div
                className="rblock reveal"
                key={r.no}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <IconChip name={r.icon} />
                <span className="sec-no en">{r.no}</span>
                <p className="rblock__eq">{r.eq}</p>
                <h3 className="rblock__title">
                  {r.title.split("\n").map((l, j) => (
                    <span key={j}>
                      {highlightLine(l, r.highlight, "txt-bg txt-bg_brand")}
                      <br />
                    </span>
                  ))}
                </h3>
                <p className="rblock__txt">{r.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAバンド 1 */}
      <CtaBand />

      {/* ============ WORK ============ */}
      <section className="section work" id="work">
        <div className="inner">
          <div className="work__grid">
            <div className="work__col-l">
              <SecTtl en="OUR FIELD" jp="仕事内容" align="left" />
              <div className="work__bigen">
                <p className="work__bigen-lines en">
                  OUR
                  <br />
                  FIELD
                  <br />
                  WORK
                </p>
                <p className="work__vertical">
                  インフラの
                  <span className="txt-bg-v txt-bg_brand">守備</span>
                </p>
              </div>
              <h3 className="work__title reveal">
                仕事は、電気で社会を動かすこと。
                <br />
                言うなれば、<span className="txt-bg txt-bg_brand">“インフラの守備”</span>だ。
              </h3>
              <p className="work__lead">
                電気の仕事を、野球の“ポジション”に例えると——
              </p>

              <div className="translate">
                {translate.map((row, i) => (
                  <div className="translate__row reveal" key={i}>
                    <span className="translate__from">{row.from}</span>
                    <span className="translate__arrow">▶</span>
                    <span className="translate__to">{row.to}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="work__col-r">
              <div className="dia-img work__photo-a reveal">
                <img src="/images/work-photo-a.jpg" alt="電気設備の施工に取り組む様子" />
              </div>
              <div className="dia-img dia-img_rev work__photo-b reveal">
                <img src="/images/work-photo-b.jpg" alt="現場のチームの様子" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STEP ============ */}
      <section className="section step slant-band" id="step">
        <div className="inner">
          <SecTtl en="GROWTH ROADMAP" jp="成長のロードマップ" align="left" />
          <h2 className="big-ttl reveal">
            素振りから、{highlightLine("監督へ。", "監督", "txt-bg")}
          </h2>
          <p className="lead reveal">
            1年目から監督（職長）まで、一段ずつ確実にレベルアップ。
          </p>

          <div className="step__timeline">
            {steps.map((s, i) => (
              <div
                className={`scol reveal${s.goal ? " scol--goal" : ""}`}
                key={s.no}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="scol__dot" aria-hidden="true" />
                <p className="scol__phase">{s.phase}</p>
                <div className="scol__head">
                  <div className="scol__no en">{s.no}</div>
                  <IconChip name={s.icon} small />
                </div>
                <h3 className="scol__title">{s.title}</h3>
                <p className="scol__txt">{s.txt}</p>
                <span className="scol__tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="step__deco dia-img reveal" aria-hidden="true">
          <img src="/images/step-deco.jpg" alt="" />
        </div>
      </section>

      {/* CTAバンド 2 */}
      <CtaBand />

      {/* ============ HOW TO JOIN ============ */}
      <section className="section join slant-band" id="join">
        <div className="inner">
          <div className="sec-head_center reveal">
            <SecTtl en="HOW TO JOIN" jp="入社までの流れ" align="center" onDark />
            <h2 className="big-ttl big-ttl_on-dark">
              入社までは、たった{highlightLine("4ステップ。", "4ステップ", "txt-bg txt-bg_brand")}
            </h2>
            <p className="lead lead_on-dark">
              選考というより、キャッチボール。まずは気軽に話すところから。
            </p>
          </div>

          <div className="join__grid">
            {joinSteps.map((s, i) => (
              <div
                className="jcard reveal"
                key={s.no}
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,.86), rgba(255,255,255,.86)), url(${s.img})`,
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div className="jcard__head">
                  <p className="jcard__no en">{s.no}</p>
                  <IconChip name={s.icon} small />
                </div>
                <h3 className="jcard__title">{s.title}</h3>
                <p className="jcard__txt">{s.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section faq slant-t-down" id="faq">
        <div className="inner-narrow">
          <SecTtl en="BEFORE YOU STEP UP" jp="よくある質問" align="left" />
          <h2 className="big-ttl reveal">その不安、全部つぶしておく。</h2>

          <div className="faq__list">
            {faqs.map((f, i) => (
              <details className="qa reveal" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                <summary className="qa__q">
                  <i className="qa__badge en">Q</i>
                  <span>{f.q}</span>
                  <span className="qa__icon" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="qa__a">
                  <i className="qa__badge en">A</i>
                  <span>{f.a}</span>
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMPANY ============ */}
      <section className="section company slant-band" id="company">
        <div className="inner-narrow">
          <SecTtl en="COMPANY" jp="運営会社" align="left" />
          <h2 className="big-ttl reveal">運営会社</h2>

          <div className="company__grid">
            <div className="ctable reveal">
              <dl>
                {company.map((row) => (
                  <div key={row.label} style={{ display: "contents" }}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="company__deco dia-img reveal" aria-hidden="true">
              <img src="/images/company-deco.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 最終CTA + 登録フォーム ============ */}
      <section className="cta" id="entry">
        <div className="cta__bg" aria-hidden="true">
          <img src="/images/entry-bg.jpg" alt="" />
        </div>
        <div className="cta__band slant-band_lg">
          <div className="cta__inner inner">
            <p className="cta__lead en reveal" aria-hidden="true">
              PLAY BALL — さあ、次の本気へ。
            </p>
            <h2 className="cta__copy reveal">
              バットを、
              <br />
              {highlightLine("工具に持ち替えろ。", "工具に持ち替えろ。", "txt-bg")}
            </h2>
            <p className="cta__sub reveal">
              未経験でいい。学歴もいらない。必要なのは、まだ本気になりたいという気持ちだけ。
              <br />
              あなたのその全力を、TECNESのチームで待っている。
            </p>
            <div className="cta__entry-row reveal">
              <span className="cta__entry-en en" aria-hidden="true">
                ENTRY
              </span>
              <div className="cta-stack">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn_line btn_lg"
                >
                  公式LINEでカジュアル面談 ▶
                </a>
                <p className="cta-micro">{CTA_MICRO}</p>
              </div>
            </div>

            {/* 公式LINEでのカジュアル面談導線 */}
            <div className="line-card reveal">
              <p className="line-card__title">
                公式LINEで、<span className="txt-bg txt-bg_brand">カジュアル面談</span>へ
              </p>
              <p className="line-card__txt">
                友だち追加後、トーク画面からそのままカジュアル面談の日程調整ができます。
                <br />
                質問だけでも大歓迎。まずは気軽にメッセージしてください。
              </p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn_line line-card__btn"
              >
                公式LINEでカジュアル面談 ▶
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="foot">
        <div className="inner foot__grid">
          <div className="foot__brand">
            <img src="/images/tecnes_icon.png" width={180} height={80} alt="株式会社TECNES" />
            <p className="foot__tagline">元野球部・体育会系のための採用サイト</p>
          </div>
          <nav className="foot__nav">
            {FOOT_LINKS.map((l) => (
              <a href={l.href} key={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="foot__copyright">© 2026 TECNES inc. All rights reserved.</p>
      </footer>

      {/* SP下部固定CTA */}
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`bottombar${stickyShow ? " is-show" : ""}`}
      >
        公式LINEでカジュアル面談 ▶
      </a>
    </main>
  );
}
