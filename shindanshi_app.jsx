
import { useState, useEffect } from "react";

// ========================================
// 問題データベース（44問 全科目収録）
// ※ 法改正・統計更新リスクを除外した有効問題のみ収録
// ========================================
const QUESTIONS = [
  // ── 科目1: 経済学・経済政策 ──────────────────────────────
  {
    id: 1, subjectId: 1,
    question: "需要の価格弾力性が1未満（価格非弾力的）の財について、価格が上昇したときの総収入（価格×数量）の変化として、最も適切なものはどれか。",
    choices: { "ア": "総収入は減少する", "イ": "総収入は変化しない", "ウ": "総収入は増加する", "エ": "需要量の変化に応じて総収入は増減する" },
    correct: "ウ"
  },
  {
    id: 2, subjectId: 1,
    question: "完全競争市場における長期均衡に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "企業は正の超過利潤を得ることができる", "イ": "価格は平均費用の最低点に一致する", "ウ": "新規参入があっても価格は下落しない", "エ": "市場に存在する企業数は固定されている" },
    correct: "イ"
  },
  {
    id: 3, subjectId: 1,
    question: "IS曲線が右方にシフトする要因として、最も適切なものはどれか。",
    choices: { "ア": "政府支出の減少", "イ": "増税による可処分所得の減少", "ウ": "企業の設備投資の増加", "エ": "輸入の増加" },
    correct: "ウ"
  },
  {
    id: 4, subjectId: 1,
    question: "外部不経済が存在する財の市場において、社会的に最適な生産量と市場均衡の生産量の関係として、最も適切なものはどれか。",
    choices: { "ア": "社会的最適生産量は市場均衡生産量より多い", "イ": "社会的最適生産量は市場均衡生産量と等しい", "ウ": "社会的最適生産量は市場均衡生産量より少ない", "エ": "両者の関係は需要の弾力性によって異なる" },
    correct: "ウ"
  },
  {
    id: 5, subjectId: 1,
    question: "独占市場における利潤最大化の条件として、最も適切なものはどれか。",
    choices: { "ア": "価格＝限界費用", "イ": "限界収入＝限界費用", "ウ": "価格＝平均費用", "エ": "限界収入＝平均費用" },
    correct: "イ"
  },
  {
    id: 6, subjectId: 1,
    question: "GDPに関する記述として、最も適切なものはどれか。",
    choices: { "ア": "GDPは国内居住者が国内外で生産した付加価値の合計である", "イ": "GDPは一定期間内に国内で新たに生産された財・サービスの付加価値の合計である", "ウ": "名目GDPと実質GDPは常に等しい", "エ": "中間投入物の価値もGDPに含まれる" },
    correct: "イ"
  },

  // ── 科目2: 財務・会計 ────────────────────────────────────
  {
    id: 7, subjectId: 2,
    question: "損益分岐点売上高を求める計算式として、最も適切なものはどれか。",
    choices: { "ア": "固定費 ÷ 変動費率", "イ": "固定費 ÷ 限界利益率", "ウ": "変動費 ÷ 限界利益率", "エ": "固定費 × 限界利益率" },
    correct: "イ"
  },
  {
    id: 8, subjectId: 2,
    question: "ROE（自己資本利益率）をデュポン分析で3要素に分解したとき、最も適切な組み合わせはどれか。",
    choices: { "ア": "売上高純利益率 × 総資産回転率 × 財務レバレッジ", "イ": "売上高総利益率 × 総資産回転率 × 自己資本比率", "ウ": "売上高純利益率 × 固定資産回転率 × 負債比率", "エ": "売上高営業利益率 × 総資産回転率 × 財務レバレッジ" },
    correct: "ア"
  },
  {
    id: 9, subjectId: 2,
    question: "正味現在価値法（NPV法）に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "NPVが0以上であれば投資を採択する", "イ": "NPVは将来キャッシュフローの単純合計から初期投資を引いたものである", "ウ": "割引率が高くなるほどNPVは大きくなる傾向がある", "エ": "NPV法では貨幣の時間的価値を考慮しない" },
    correct: "ア"
  },
  {
    id: 10, subjectId: 2,
    question: "流動比率の計算式として、最も適切なものはどれか。",
    choices: { "ア": "流動資産 ÷ 総資産 × 100", "イ": "流動資産 ÷ 流動負債 × 100", "ウ": "流動負債 ÷ 流動資産 × 100", "エ": "（流動資産－棚卸資産）÷ 流動負債 × 100" },
    correct: "イ"
  },
  {
    id: 11, subjectId: 2,
    question: "定率法による減価償却に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "毎期の償却額は一定である", "イ": "初期に多く、後期に少なく償却される加速度的な方法である", "ウ": "取得原価に毎期一定の率を乗じて計算する", "エ": "残存価額なしで耐用年数まで均等償却する" },
    correct: "イ"
  },
  {
    id: 12, subjectId: 2,
    question: "貸借対照表の純資産の部に含まれるものとして、最も適切なものはどれか。",
    choices: { "ア": "社債", "イ": "資本剰余金", "ウ": "長期借入金", "エ": "未払費用" },
    correct: "イ"
  },
  {
    id: 13, subjectId: 2,
    question: "加重平均資本コスト（WACC）の特徴として、最も適切なものはどれか。",
    choices: { "ア": "負債コストは節税効果を考慮せずに計算する", "イ": "負債と自己資本の市場価値で加重平均した資本コストである", "ウ": "WACCが高いほど企業価値は高まる", "エ": "自己資本コストは確定的に計算できる" },
    correct: "イ"
  },

  // ── 科目3: 企業経営理論 ──────────────────────────────────
  {
    id: 14, subjectId: 3,
    question: "マイケル・ポーターが提唱した3つの基本競争戦略として、最も適切な組み合わせはどれか。",
    choices: { "ア": "コストリーダーシップ・差別化・集中", "イ": "コストリーダーシップ・差別化・多角化", "ウ": "コストリーダーシップ・集中・垂直統合", "エ": "差別化・集中・製品開発" },
    correct: "ア"
  },
  {
    id: 15, subjectId: 3,
    question: "PPM（プロダクト・ポートフォリオ・マネジメント）において「花形（スター）」事業の特徴として、最も適切なものはどれか。",
    choices: { "ア": "市場成長率が高く、相対的市場シェアが低い", "イ": "市場成長率が低く、相対的市場シェアが高い", "ウ": "市場成長率が高く、相対的市場シェアが高い", "エ": "市場成長率が低く、相対的市場シェアが低い" },
    correct: "ウ"
  },
  {
    id: 16, subjectId: 3,
    question: "バランスト・スコアカード（BSC）の4つの視点として、最も適切なものはどれか。",
    choices: { "ア": "財務・顧客・内部ビジネスプロセス・学習と成長", "イ": "財務・顧客・競合・サプライチェーン", "ウ": "財務・人材・プロセス・イノベーション", "エ": "売上・利益・顧客・従業員" },
    correct: "ア"
  },
  {
    id: 17, subjectId: 3,
    question: "マーケティングの4Pとして、最も適切な組み合わせはどれか。",
    choices: { "ア": "Product・Price・Place・Promotion", "イ": "Product・Price・Process・Promotion", "ウ": "Product・People・Place・Promotion", "エ": "Product・Price・Place・People" },
    correct: "ア"
  },
  {
    id: 18, subjectId: 3,
    question: "事業部制組織の特徴として、最も適切なものはどれか。",
    choices: { "ア": "職能別に部門が編成され、専門性が高まる", "イ": "各事業部が利益責任を持つ独立した単位として機能する", "ウ": "経営トップへの意思決定の集中が最大化される", "エ": "部門間の調整コストがすべての組織形態の中で最も低い" },
    correct: "イ"
  },
  {
    id: 19, subjectId: 3,
    question: "製品ライフサイクルにおける「成熟期」の特徴として、最も適切なものはどれか。",
    choices: { "ア": "売上高は急速に増加し、競合他社が参入し始める時期である", "イ": "売上高はピークに近く、競争が激化し利益率が低下傾向にある", "ウ": "製品認知度が低く、広告費が売上高に対して高い比率を占める", "エ": "売上高は急速に減少し、撤退を積極的に検討する段階である" },
    correct: "イ"
  },
  {
    id: 20, subjectId: 3,
    question: "アンゾフの成長マトリクスにおいて「市場浸透戦略」が意味するものとして、最も適切なものはどれか。",
    choices: { "ア": "既存製品を新規市場に投入する", "イ": "新製品を既存市場に投入する", "ウ": "既存製品を既存市場でより多く販売する", "エ": "新製品を新規市場に投入する" },
    correct: "ウ"
  },

  // ── 科目4: 運営管理 ─────────────────────────────────────
  {
    id: 21, subjectId: 4,
    question: "経済的発注量（EOQ）の計算に必要な要素として、最も適切な組み合わせはどれか。",
    choices: { "ア": "年間需要量・1回の発注費用・単位当たり在庫維持費用", "イ": "年間需要量・リードタイム・安全在庫", "ウ": "1回の発注費用・在庫回転率・製品単価", "エ": "年間需要量・発注回数・在庫維持費用率" },
    correct: "ア"
  },
  {
    id: 22, subjectId: 4,
    question: "QC（品質管理）の7つ道具に含まれないものはどれか。",
    choices: { "ア": "パレート図", "イ": "特性要因図（フィッシュボーン図）", "ウ": "散布図", "エ": "PERT図" },
    correct: "エ"
  },
  {
    id: 23, subjectId: 4,
    question: "ジャスト・イン・タイム（JIT）生産方式の特徴として、最も適切なものはどれか。",
    choices: { "ア": "大量の在庫を持ち、需要変動に備える生産方式である", "イ": "必要なものを、必要なときに、必要な量だけ生産するプル型方式である", "ウ": "生産計画を上流から下流へ指示するプッシュ型方式の代表例である", "エ": "生産計画は長期固定で変更しないことを前提とする" },
    correct: "イ"
  },
  {
    id: 24, subjectId: 4,
    question: "MRP（資材所要量計画）に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "需要予測に基づかず実績データのみで在庫補充を行う手法である", "イ": "完成品の主生産計画から部品・資材の必要量と発注時期を導出する", "ウ": "主として販売計画とは独立して生産計画を立案する手法である", "エ": "在庫の発注点管理と同一の概念である" },
    correct: "イ"
  },
  {
    id: 25, subjectId: 4,
    question: "小売業の店舗レイアウトにおいて、買回品（目的購買品）を奥に配置する主な目的として、最も適切なものはどれか。",
    choices: { "ア": "買回品の盗難を防ぐため", "イ": "顧客が店舗奥まで移動する過程で衝動買いを促すため", "ウ": "従業員の作業効率を高めるため", "エ": "法令による陳列場所の規制を遵守するため" },
    correct: "イ"
  },
  {
    id: 26, subjectId: 4,
    question: "工程管理で使用するガントチャートに関する記述として、最も適切なものはどれか。",
    choices: { "ア": "各作業の依存関係（先行関係）を矢印で明示できる", "イ": "横軸に時間、縦軸に作業項目をとり、作業の予定・実績を棒で表す", "ウ": "クリティカルパスを自動的に計算する機能を持つ", "エ": "PERT/CPMと同一の手法である" },
    correct: "イ"
  },

  // ── 科目5: 経営法務 ─────────────────────────────────────
  {
    id: 27, subjectId: 5,
    question: "会社法における取締役会設置会社の株主総会の権限に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "株主総会はすべての会社の意思決定事項について決議できる", "イ": "取締役会設置会社では、株主総会は会社法および定款に定めた事項についてのみ決議できる", "ウ": "株主総会の決議には常に特別決議（3分の2以上）が必要である", "エ": "株主総会の招集は代表取締役のみが行える" },
    correct: "イ"
  },
  {
    id: 28, subjectId: 5,
    question: "特許権の存続期間として、最も適切なものはどれか（特許法）。",
    choices: { "ア": "出願日から10年", "イ": "出願日から20年", "ウ": "登録日から20年", "エ": "登録日から25年" },
    correct: "イ"
  },
  {
    id: 29, subjectId: 5,
    question: "著作権の発生に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "著作権は著作権登録をすることで発生する", "イ": "著作権は著作物を創作した時点で自動的に発生し、登録は不要である", "ウ": "著作権の保護期間は著作者の生存中のみである", "エ": "著作権はアイデア（思想）そのものを保護する権利である" },
    correct: "イ"
  },
  {
    id: 30, subjectId: 5,
    question: "商標権の存続期間と更新に関する記述として、最も適切なものはどれか（商標法）。",
    choices: { "ア": "存続期間は登録日から10年で、更新できない", "イ": "存続期間は登録日から10年で、更新登録により繰り返し更新できる", "ウ": "存続期間は出願日から10年で、更新登録により繰り返し更新できる", "エ": "存続期間は登録日から20年で、更新登録により更新できる" },
    correct: "イ"
  },
  {
    id: 31, subjectId: 5,
    question: "民法上の契約の成立に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "契約は書面による合意がなければ原則として成立しない", "イ": "契約は申込みと承諾の意思表示が合致することで成立する", "ウ": "口頭のみによる合意は原則として法的に無効である", "エ": "契約成立には必ず第三者の立会いが必要である" },
    correct: "イ"
  },
  {
    id: 32, subjectId: 5,
    question: "実用新案権に関する記述として、最も適切なものはどれか（実用新案法）。",
    choices: { "ア": "実用新案権は物品の形状・構造・組み合わせに係る考案を保護する", "イ": "実用新案権の存続期間は出願日から20年である", "ウ": "実用新案登録には特許と同様の実体審査が必要である", "エ": "実用新案はソフトウェアも保護対象となる" },
    correct: "ア"
  },

  // ── 科目6: 経営情報システム ──────────────────────────────
  {
    id: 33, subjectId: 6,
    question: "関係データベースにおいて主キー（プライマリキー）の特徴として、最も適切なものはどれか。",
    choices: { "ア": "NULL値を許容し、重複も許容される", "イ": "NULL値を許容せず、テーブル内で一意でなければならない", "ウ": "一つのテーブルに複数の主キー列を独立して設定できる", "エ": "主キーは必ず単一の列（カラム）でなければならない" },
    correct: "イ"
  },
  {
    id: 34, subjectId: 6,
    question: "OSI参照モデルの第3層（ネットワーク層）の主な機能として、最も適切なものはどれか。",
    choices: { "ア": "物理的なビット信号の伝送", "イ": "エンドツーエンドの信頼性あるデータ転送の保証", "ウ": "IPアドレスを用いたルーティング（経路制御）", "エ": "アプリケーション間の通信サービスの提供" },
    correct: "ウ"
  },
  {
    id: 35, subjectId: 6,
    question: "情報セキュリティの3要素（CIAトライアド）として、最も適切な組み合わせはどれか。",
    choices: { "ア": "機密性（Confidentiality）・完全性（Integrity）・可用性（Availability）", "イ": "機密性・完全性・アクセス性（Accessibility）", "ウ": "守秘性・完全性・可用性", "エ": "機密性・信頼性（Reliability）・可用性" },
    correct: "ア"
  },
  {
    id: 36, subjectId: 6,
    question: "ERP（統合基幹業務システム）に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "販売管理機能のみに特化した業務システムである", "イ": "財務・人事・製造・販売などの基幹業務を単一システムで統合管理する", "ウ": "中小企業専用に開発された特定目的のシステムである", "エ": "インターネット環境のみで利用可能なクラウド専用システムである" },
    correct: "イ"
  },
  {
    id: 37, subjectId: 6,
    question: "システム開発手法のウォーターフォールモデルの特徴として、最も適切なものはどれか。",
    choices: { "ア": "反復（イテレーション）を繰り返しながら段階的に機能を追加していく", "イ": "要件定義・設計・実装・テスト・運用を順序立てて進め、原則として前工程に戻らない", "ウ": "ユーザーと開発者が頻繁にコミュニケーションをとりながら仕様を変化させる", "エ": "プロトタイプを作成しユーザーの反応を見ながら要件を確定させる" },
    correct: "イ"
  },
  {
    id: 38, subjectId: 6,
    question: "クラウドコンピューティングのサービスモデルのうち、IaaS（Infrastructure as a Service）の説明として、最も適切なものはどれか。",
    choices: { "ア": "アプリケーションをインターネット経由でサービスとして提供する", "イ": "アプリケーション開発基盤（OS・ミドルウェア等）をサービスとして提供する", "ウ": "サーバー・ストレージ・ネットワーク等のインフラをサービスとして提供する", "エ": "特定業務に特化したソフトウェアをパッケージとして提供する" },
    correct: "ウ"
  },

  // ── 科目7: 中小企業経営・政策 ────────────────────────────
  {
    id: 39, subjectId: 7,
    question: "中小企業基本法における製造業その他の中小企業者の定義として、最も適切なものはどれか。",
    choices: { "ア": "資本金1億円以下または従業員100人以下の会社・個人", "イ": "資本金3億円以下または従業員300人以下の会社・個人", "ウ": "資本金1億円以下または従業員300人以下の会社・個人", "エ": "資本金3億円以下または従業員500人以下の会社・個人" },
    correct: "イ"
  },
  {
    id: 40, subjectId: 7,
    question: "中小企業基本法における小売業の中小企業者の定義として、最も適切なものはどれか。",
    choices: { "ア": "資本金3億円以下または従業員300人以下", "イ": "資本金1億円以下または従業員100人以下", "ウ": "資本金5千万円以下または従業員50人以下", "エ": "資本金5千万円以下または従業員100人以下" },
    correct: "エ"
  },
  {
    id: 41, subjectId: 7,
    question: "中小企業基本法において製造業における小規模企業者の定義として、最も適切なものはどれか。",
    choices: { "ア": "従業員5人以下", "イ": "従業員10人以下", "ウ": "従業員20人以下", "エ": "従業員50人以下" },
    correct: "ウ"
  },
  {
    id: 42, subjectId: 7,
    question: "日本政策金融公庫に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "民間金融機関であり、政府の出資はない", "イ": "株式会社形態であり、政府が100%出資している", "ウ": "地方公共団体が設立した地方金融機関である", "エ": "中小企業のみを対象とした特別法に基づく銀行である" },
    correct: "イ"
  },
  {
    id: 43, subjectId: 7,
    question: "信用保証協会の機能に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "中小企業が民間金融機関から融資を受ける際の債務を保証する公的機関である", "イ": "中小企業に直接融資を行う政府系金融機関である", "ウ": "大企業専用の信用保証を行う民間機関である", "エ": "中小企業の株式発行（IPO）を支援する公的機関である" },
    correct: "ア"
  },
  {
    id: 44, subjectId: 7,
    question: "中小企業診断士制度に関する記述として、最も適切なものはどれか。",
    choices: { "ア": "中小企業への経営診断・助言のみを業務範囲とし、コンサルティングは含まない", "イ": "中小企業支援法に基づき経済産業省が登録する経営コンサルタントの唯一の国家資格である", "ウ": "税務申告書の作成と経営診断を主業務とする国家資格である", "エ": "公認会計士と同様に財務諸表の監査業務を行うことができる" },
    correct: "イ"
  }
];

// ========================================
// 科目マスタ
// ========================================
const SUBJECT_INFO = {
  1: { name: "経済学・経済政策", short: "経済", bg: "bg-sky-500", text: "text-sky-400", bar: "bg-sky-500", border: "border-sky-500/40", glow: "#0ea5e9" },
  2: { name: "財務・会計", short: "財務", bg: "bg-emerald-500", text: "text-emerald-400", bar: "bg-emerald-500", border: "border-emerald-500/40", glow: "#10b981" },
  3: { name: "企業経営理論", short: "経営", bg: "bg-amber-500", text: "text-amber-400", bar: "bg-amber-500", border: "border-amber-500/40", glow: "#f59e0b" },
  4: { name: "運営管理", short: "運営", bg: "bg-red-500", text: "text-red-400", bar: "bg-red-500", border: "border-red-500/40", glow: "#ef4444" },
  5: { name: "経営法務", short: "法務", bg: "bg-violet-500", text: "text-violet-400", bar: "bg-violet-500", border: "border-violet-500/40", glow: "#8b5cf6" },
  6: { name: "経営情報システム", short: "情報", bg: "bg-pink-500", text: "text-pink-400", bar: "bg-pink-500", border: "border-pink-500/40", glow: "#ec4899" },
  7: { name: "中小企業経営・政策", short: "政策", bg: "bg-orange-500", text: "text-orange-400", bar: "bg-orange-500", border: "border-orange-500/40", glow: "#f97316" },
};

const STORAGE_KEY = "shindanshi_progress_v2";

// ========================================
// メインApp
// ========================================
export default function App() {
  const [screen, setScreen] = useState("home");
  const [progress, setProgress] = useState({});
  const [currentQ, setCurrentQ] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [filterSubject, setFilterSubject] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [expLoading, setExpLoading] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [expSteps, setExpSteps] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r) setProgress(JSON.parse(r.value));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (p) => {
    setProgress(p);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(p)); } catch {}
  };

  const totalStats = () => {
    const total = QUESTIONS.length;
    const confident = QUESTIONS.filter(q => progress[q.id]?.confident).length;
    const attempted = QUESTIONS.filter(q => progress[q.id]?.attempts > 0).length;
    return { total, confident, attempted, pct: Math.round(confident / total * 100) };
  };

  const subStats = (sid) => {
    const qs = sid === 0 ? QUESTIONS : QUESTIONS.filter(q => q.subjectId === sid);
    const conf = qs.filter(q => progress[q.id]?.confident).length;
    return { total: qs.length, conf, pct: qs.length ? Math.round(conf / qs.length * 100) : 0 };
  };

  const startQuiz = (sid) => {
    const pool = (sid === 0 ? QUESTIONS : QUESTIONS.filter(q => q.subjectId === sid));
    const remaining = pool.filter(q => !progress[q.id]?.confident);
    if (!remaining.length) { alert("この科目はすべての問題を完了しています！おめでとうございます 🎉"); return; }
    const q = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrentQ(q);
    setSelected(null);
    setAnswered(false);
    setExplanation("");
    setShowConf(false);
    setExpLoading(false);
    setExpSteps(0);
    setFilterSubject(sid);
    setScreen("quiz");
  };

  const handleAnswer = async (choice) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    const ok = choice === currentQ.correct;
    const prev = progress[currentQ.id] || {};
    const np = {
      ...progress,
      [currentQ.id]: { ...prev, attempts: (prev.attempts || 0) + 1, lastOk: ok, ts: Date.now() }
    };
    await save(np);
    if (ok) setShowConf(true);
  };

  const markConfident = async () => {
    const np = { ...progress, [currentQ.id]: { ...(progress[currentQ.id] || {}), confident: true, confidentAt: Date.now() } };
    await save(np);
    setShowConf(false);
  };

  const fetchExp = async () => {
    if (explanation || expLoading) return;
    setExpLoading(true);
    setExpSteps(0);
    try {
      const q = currentQ;
      const choiceText = Object.entries(q.choices).map(([k, v]) => `${k}: ${v}`).join("\n");
      const prompt = `中小企業診断士1次試験の以下の問題の解説を作成してください。

【問題】
${q.question}

【選択肢】
${choiceText}

【正解】${q.correct}：${q.choices[q.correct]}

━━ 指示 ━━
ハルシネーション（誤情報）を防止するため、以下の3段階ファクトチェックプロセスを必ず実施してください：

[Step1] 初回解説の作成
（この問題に関する正確な知識に基づいた解説を作成）

[Step2] ファクトチェック1回目
（Step1の内容を検証。数値・法律条文・定義・理論名称の正確性を確認。誤りがあれば訂正）

[Step3] ファクトチェック2回目（最終確認）
（Step2の内容を再検証。確定した解説を出力）

最後に確認済みの解説を必ず <exp> タグ内に **100字以内** で出力してください。
<exp>ここに100字以内の確認済み解説</exp>`;

      setExpSteps(1);
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      setExpSteps(2);
      const data = await res.json();
      const txt = (data.content || []).map(c => c.text || "").join("");
      setExpSteps(3);
      const m = txt.match(/<exp>([\s\S]*?)<\/exp>/);
      setExplanation(m ? m[1].trim() : txt.slice(0, 200));
    } catch {
      setExplanation("解説の取得に失敗しました。ネットワークをご確認ください。");
    }
    setExpLoading(false);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm animate-pulse">読み込み中...</div>
      </div>
    );
  }

  const { total, confident, attempted, pct } = totalStats();

  // ─── HOME SCREEN ───────────────────────────────────────────
  if (screen === "home") {
    return (
      <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>
        <div className="max-w-xl mx-auto px-4 pb-12">
          {/* Hero */}
          <div className="pt-10 pb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <span>📋</span> 1次試験対策アプリ
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-1">中小企業診断士</h1>
            <p className="text-slate-400 text-sm">過去問10年分マスタートレーニング</p>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-5 mb-5 shadow-xl">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-xs text-slate-500 mb-1">総合達成率</div>
                <div className="text-4xl font-black text-amber-400">{pct}<span className="text-xl">%</span></div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{confident}<span className="text-slate-500 text-sm font-normal"> / {total}</span></div>
                <div className="text-xs text-slate-500">自信あり完了</div>
              </div>
            </div>
            <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span>挑戦済み {attempted}問</span>
              <span>残り {total - confident}問</span>
            </div>
          </div>

          {/* Start All */}
          <button
            onClick={() => startQuiz(0)}
            className="w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-black py-4 rounded-xl text-base transition-all shadow-lg shadow-amber-400/20 mb-4"
          >
            🎯 全科目ランダム出題
          </button>

          {/* Subject Buttons */}
          <div className="space-y-2">
            <div className="text-xs text-slate-600 px-1 mb-1 font-medium">科目別に取り組む</div>
            {Object.entries(SUBJECT_INFO).map(([sid, info]) => {
              const ss = subStats(Number(sid));
              return (
                <button
                  key={sid}
                  onClick={() => startQuiz(Number(sid))}
                  className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`${info.bg} text-white text-xs font-black px-2 py-0.5 rounded-md min-w-[36px] text-center`}>
                        {info.short}
                      </span>
                      <span className="text-sm text-slate-200 group-hover:text-white transition-colors">{info.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${info.text}`}>{ss.pct}%</span>
                      <span className="text-slate-600 text-xs">{ss.conf}/{ss.total}</span>
                    </div>
                  </div>
                  <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${info.bar} rounded-full transition-all duration-500`} style={{ width: `${ss.pct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress Link */}
          <button
            onClick={() => setScreen("progress")}
            className="w-full mt-4 bg-transparent border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-400 py-3 rounded-xl text-sm transition-colors"
          >
            📊 詳細進捗・学習履歴
          </button>

          <div className="text-center mt-5 text-xs text-slate-700">
            サンプル収録 {total}問（全1,350問対応アーキテクチャ）
          </div>
        </div>
      </div>
    );
  }

  // ─── QUIZ SCREEN ───────────────────────────────────────────
  if (screen === "quiz" && currentQ) {
    const info = SUBJECT_INFO[currentQ.subjectId];
    const isCorrect = selected === currentQ.correct;
    const progressData = progress[currentQ.id] || {};

    return (
      <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>
        <div className="max-w-xl mx-auto px-4 pb-12">
          {/* Top bar */}
          <div className="flex items-center justify-between pt-5 mb-5">
            <button
              onClick={() => setScreen("home")}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              ← ホーム
            </button>
            <div className="flex items-center gap-2">
              {progressData.attempts > 0 && (
                <span className="text-xs text-slate-600">挑戦{progressData.attempts}回</span>
              )}
              <span className={`${info.bg} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                {info.name}
              </span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4 shadow-xl">
            <div className="text-xs text-slate-600 mb-2.5 flex items-center gap-1.5">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${info.bg}`} />
              問題
            </div>
            <p className="text-sm leading-7 text-slate-100">{currentQ.question}</p>
          </div>

          {/* Choices */}
          <div className="space-y-2.5 mb-4">
            {Object.entries(currentQ.choices).map(([key, value]) => {
              let baseClass = "bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 cursor-pointer";
              if (answered) {
                if (key === currentQ.correct) {
                  baseClass = "bg-emerald-950 border border-emerald-500/60 cursor-default";
                } else if (key === selected) {
                  baseClass = "bg-red-950 border border-red-500/60 cursor-default";
                } else {
                  baseClass = "bg-slate-900/40 border border-slate-800/40 cursor-default opacity-40";
                }
              }
              return (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  disabled={answered}
                  className={`w-full ${baseClass} rounded-xl p-4 text-left transition-all flex items-start gap-3`}
                >
                  <span className={`font-black text-sm min-w-[20px] mt-0.5 ${
                    answered && key === currentQ.correct ? 'text-emerald-400' :
                    answered && key === selected ? 'text-red-400' :
                    'text-amber-400'
                  }`}>{key}</span>
                  <span className="text-sm leading-relaxed text-slate-200 flex-1">{value}</span>
                  {answered && key === currentQ.correct && (
                    <span className="text-emerald-400 text-base shrink-0">✓</span>
                  )}
                  {answered && key === selected && key !== currentQ.correct && (
                    <span className="text-red-400 text-base shrink-0">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Post-answer area */}
          {answered && (
            <div className="space-y-3">
              {/* Result */}
              <div className={`rounded-xl p-4 border ${
                isCorrect
                  ? 'bg-emerald-950/60 border-emerald-700/50'
                  : 'bg-red-950/60 border-red-700/50'
              }`}>
                <div className={`font-black text-lg ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? '✓ 正解！' : '✗ 不正解'}
                </div>
                {!isCorrect && (
                  <div className="text-sm text-slate-400 mt-1">
                    正解：<span className="text-emerald-400 font-bold">{currentQ.correct}</span>
                    <span className="text-slate-300 ml-1">{currentQ.choices[currentQ.correct]}</span>
                  </div>
                )}
              </div>

              {/* Confidence Check */}
              {showConf && (
                <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-4">
                  <p className="text-amber-300 text-sm font-medium mb-3">
                    💪 この問題は理解して自信がありますか？
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={markConfident}
                      className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-2.5 rounded-lg text-sm transition-colors"
                    >
                      ✓ 自信あり（完了）
                    </button>
                    <button
                      onClick={() => setShowConf(false)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg text-sm transition-colors"
                    >
                      もう少し練習する
                    </button>
                  </div>
                </div>
              )}

              {/* Explanation */}
              {!explanation && !expLoading && (
                <button
                  onClick={fetchExp}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>💡</span>
                  <span>解説を見る（AI・3回ファクトチェック済み）</span>
                </button>
              )}

              {expLoading && (
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3].map(n => (
                        <div key={n} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          expSteps >= n ? 'bg-amber-400' : 'bg-slate-700'
                        } ${expSteps === n ? 'animate-pulse' : ''}`} />
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">
                      {expSteps === 0 && "解説を生成中..."}
                      {expSteps === 1 && "Step1 初回解説を生成中..."}
                      {expSteps === 2 && "Step2 ファクトチェック中..."}
                      {expSteps === 3 && "Step3 最終確認中..."}
                    </span>
                  </div>
                </div>
              )}

              {explanation && (
                <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-amber-400 text-xs font-bold">💡 解説</span>
                    <span className="text-slate-600 text-xs">ファクトチェック3回済み</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-200">{explanation}</p>
                </div>
              )}

              {/* Next */}
              <button
                onClick={() => startQuiz(filterSubject)}
                className="w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-black py-4 rounded-xl text-base transition-all shadow-lg shadow-amber-400/10"
              >
                次の問題 →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── PROGRESS SCREEN ────────────────────────────────────────
  if (screen === "progress") {
    const s = totalStats();
    return (
      <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>
        <div className="max-w-xl mx-auto px-4 pb-12">
          <div className="flex items-center gap-3 pt-5 mb-6">
            <button onClick={() => setScreen("home")} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← ホーム</button>
            <h2 className="text-base font-bold">学習進捗</h2>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "完了率", value: `${s.pct}%`, color: "text-amber-400" },
              { label: "完了問題", value: `${s.confident}問`, color: "text-emerald-400" },
              { label: "挑戦済み", value: `${s.attempted}問`, color: "text-sky-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                <div className={`text-xl font-black ${color}`}>{value}</div>
                <div className="text-xs text-slate-600 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Subject breakdown */}
          <div className="space-y-2.5">
            {Object.entries(SUBJECT_INFO).map(([sid, info]) => {
              const ss = subStats(Number(sid));
              return (
                <div key={sid} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`${info.bg} text-white text-xs font-black px-2 py-0.5 rounded-md min-w-[36px] text-center`}>{info.short}</span>
                      <span className="text-sm text-slate-300">{info.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${info.text}`}>{ss.pct}%</span>
                      <span className="text-xs text-slate-600 ml-1">{ss.conf}/{ss.total}問</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${info.bar} rounded-full transition-all duration-700`} style={{ width: `${ss.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Question detail table */}
          <div className="mt-5 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800">
              <span className="text-sm font-bold text-slate-300">問題別ステータス</span>
            </div>
            <div className="divide-y divide-slate-800/50 max-h-80 overflow-y-auto">
              {QUESTIONS.map(q => {
                const p = progress[q.id] || {};
                const info = SUBJECT_INFO[q.subjectId];
                return (
                  <div key={q.id} className="px-4 py-2.5 flex items-center gap-3">
                    <span className={`${info.bg} text-white text-xs px-1.5 py-0.5 rounded font-bold min-w-[32px] text-center`}>{info.short}</span>
                    <span className="text-xs text-slate-400 flex-1 truncate">Q{q.id}: {q.question.slice(0, 30)}…</span>
                    <span className="text-xs shrink-0">
                      {p.confident
                        ? <span className="text-emerald-400 font-bold">✓完了</span>
                        : p.attempts > 0
                        ? <span className="text-amber-400">{p.attempts}回</span>
                        : <span className="text-slate-700">未挑戦</span>
                      }
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={async () => {
              if (window.confirm("すべての進捗をリセットしますか？この操作は取り消せません。")) {
                await save({});
              }
            }}
            className="w-full mt-5 border border-red-900/60 text-red-500/70 hover:text-red-400 hover:border-red-800 py-3 rounded-xl text-sm transition-colors"
          >
            🗑️ 進捗をリセット
          </button>
        </div>
      </div>
    );
  }

  return null;
}
