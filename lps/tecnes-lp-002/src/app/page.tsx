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
    eq: "反復練習 ＝ 技術習得",
    title: "「素振り」できたヤツは、\n現場でも伸びる。",
    highlight: "素振り",
    txt: "電気設備の技術は、才能ではなく反復で身につく。毎日の素振りでスイングを固めたように、一つひとつの作業を繰り返して“体で覚える”。コツコツ続けられる元野球部は、未経験からでも確実にレベルアップしていく。",
  },
  {
    no: "02",
    vlabel: "TEAMWORK.",
    eq: "チームプレー ＝ 班の連携",
    title: "現場は、\n9人で守る「チーム戦」。",
    highlight: "チーム戦",
    txt: "TECNESの現場は一人では回らない。役割を分担し、声を掛け合い、班（チーム）で一つの工事を完成させる。ポジションを守り、カバーし合う——グラウンドで培った連携力が、そのまま武器になる。",
  },
  {
    no: "03",
    vlabel: "GUTS.",
    eq: "根性・体力 ＝ 現場力",
    title: "鍛えた体と粘りは、\nここで“戦力”になる。",
    highlight: "戦力",
    txt: "暑さ寒さ、最後まで走り切る粘り強さ。厳しい練習を耐え抜いた経験は、現場で必ず活きる。頑張りが「気合」で終わらず、資格・技術・給与という結果に変わっていく場所だ。",
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
    title: "素振りの年",
    txt: "先輩について現場の基本を覚える。道具の名前、安全のルール、体の使い方。分からなくて当たり前。まずは全力でついていく。",
    tag: "OJT・基礎",
    goal: false,
  },
  {
    phase: "2〜3年目",
    no: "02",
    title: "スタメン定着",
    txt: "任される作業が増え、資格も取得。自分のポジションを守れるように。後輩も入ってきて、教える側の一歩を踏み出す。",
    tag: "資格取得支援",
    goal: false,
  },
  {
    phase: "4〜6年目",
    no: "03",
    title: "エース格へ",
    txt: "現場の中心として判断を任される。班のメンバーをまとめ、段取りを組む。努力が役職・給与にはっきり反映される。",
    tag: "リーダー候補",
    goal: false,
  },
  {
    phase: "その先",
    no: "04",
    title: "監督（職長）",
    txt: "現場全体を指揮する職長・管理者へ。後進を育て、会社を背負う存在に。第二の野球人生の“優勝”を、ここで掴む。",
    tag: "職長・管理職",
    goal: true,
  },
];

const joinSteps = [
  {
    no: "01",
    title: "エントリー",
    txt: "フォームから30秒で完了。履歴書はまだ不要です。",
    img: "/images/join-01.jpg",
  },
  {
    no: "02",
    title: "カジュアル面談",
    txt: "私服OK・オンラインOK。仕事内容や給与のリアルを全部話します。",
    img: "/images/join-02.jpg",
  },
  {
    no: "03",
    title: "現場見学（希望者のみ）",
    txt: "実際の現場と先輩の働き方を見てから決められます。",
    img: "/images/join-03.jpg",
  },
  {
    no: "04",
    title: "内定・入社",
    txt: "最短2週間。入社日は相談OK。野球で言う“入団”です。",
    img: "/images/join-04.jpg",
  },
];

const faqs = [
  {
    q: "電気の知識ゼロ、まったくの未経験でも大丈夫ですか？",
    a: "問題ありません。社員の約8割が未経験スタートです。野球でいう“素振り”のように、先輩がマンツーマンで基礎から教えます。学歴も不問。大切なのは、素直さと最後までやり切る姿勢です。",
  },
  {
    q: "体力や上下関係は、正直きついですか？",
    a: "現場仕事なので体力は使いますが、厳しい部活を経験した皆さんなら心配いりません。むしろ体力・礼儀・根性は大きな武器になります。理不尽なシゴキではなく、成長のための指導です。",
  },
  {
    q: "頑張りは、ちゃんと評価されますか？",
    a: "はい。資格取得で手当が増え、現場での実力が役職・昇給に直結します。年功序列だけでなく、「やった分だけ返ってくる」評価制度。試合で結果を出せば認められる——それと同じです。",
  },
  {
    q: "給与や休みは、実際どうなんですか？",
    a: "カジュアル面談で、モデル年収・残業・休日の実データをすべてお見せします。入ってから「聞いてない」が一番不幸なので、先に全部話すのがTECNESのルールです。",
  },
  {
    q: "野球経験しかなくても、将来キャリアは築けますか？",
    a: "築けます。1年目の“素振り”から、スタメン、エース、そして現場を率いる職長（監督）へ。多くの先輩が未経験から現場のリーダーになっています。第二のキャリアの主役はあなたです。",
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
                TECNESの仕事は、建物や設備の電気工事・保守。
                スイッチひとつで明かりが点き、機械が動く——その当たり前を、
                現場でつくっているのが私たちだ。専門用語は入社後に覚えればいい。
                まずは、野球で言うところの“各ポジション”をイメージしてほしい。
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
            入社1年目の“素振り”から、現場を率いる“監督（職長）”まで。
            一段ずつ、確実に。あなたの第二の野球人生の道筋です。
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
                <div className="scol__no en">{s.no}</div>
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
                <p className="jcard__no en">{s.no}</p>
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
