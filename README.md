# TimePort 勤怠・給与管理システム

## 概要
TimePortは、従業員の勤怠・給与・控除・人事情報を一元管理できる、Next.js + Supabaseベースのクラウド型業務アプリケーションです。美しいUIと直感的な操作性で、日々の勤怠入力から給与計算・年末調整まで幅広くサポートします。

---

## 主な特徴
- **Next.js 15 + TypeScript** によるモダンなSPA/SSR構成
- **Supabase** を用いたリアルタイムDB・認証・API連携
- **Tailwind CSS** & **Radix UI** による美しいUI/UX
- **従業員管理・CSVインポート/エクスポート・部署管理**
- **勤怠入力・履歴・月次統計・残業管理**
- **給与明細・控除・手当・年末調整**
- **給与確定ワークフロー・承認・エラー検知**
- **レスポンシブ対応・ダークモード**

---

## 画面イメージ・主な機能

- **ダッシュボード**: 勤怠・給与・残業・有給などの統計をグラフィカルに表示
- **勤怠入力**: 出退勤打刻、休憩、月次履歴、月次統計
- **従業員管理**: 一覧・検索・フィルタ・新規登録・編集・CSV入出力・部署管理
- **給与明細**: 月次給与・手当・控除・推移チャート
- **控除/年末調整**: 扶養・配偶者・保険・社会保険・その他控除
- **給与確定/承認**: ワークフロー、エラー検知、承認・出力

---

## セットアップ手順

### 1. 必要要件
- Node.js 18+
- pnpm または npm/yarn
- Supabase プロジェクト（.envにURL/KEYを設定）

### 2. インストール
```bash
pnpm install
# または
npm install
```

### 3. 環境変数設定
`.env.local` に以下を記載:
```
SUPABASE_URL=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### 4. DB初期化
`docs/00_init.sql` をSupabase SQL Editor等で実行し、テーブルを作成してください。

### 5. 開発サーバ起動
```bash
pnpm dev
# または
npm run dev
```

---

## 技術スタック
- Next.js 15 / React 18 / TypeScript
- Supabase (PostgreSQL, Auth, Storage)
- Tailwind CSS / Radix UI / Lucide Icons
- recharts, react-hook-form, zod, date-fns, exceljs, jspdf

---

## ディレクトリ構成
```
app/           # 画面・APIルート
components/    # UI/業務コンポーネント
lib/           # Supabase等ライブラリ
hooks/         # カスタムフック
public/        # 静的ファイル
styles/        # グローバルCSS
types/         # 型定義
```

---

## API例
### POST /api/employees
従業員の新規登録
```json
{
  "personalInfo": { ... },
  "employmentInfo": { ... },
  "salaryInfo": { ... }
}
```

### GET /api/employees
従業員一覧・詳細取得

---

## DB構成（ER図抜粋）
- `employees`（従業員基本）
- `employment_info`（雇用情報）
- `salary_info`（給与情報）
- `departments`（部署）
- `job_positions`（役職）
- `allowances`（手当）
- `deductions`（控除）
- `attendance`（勤怠）
- `payroll_confirm`（給与確定）
- ...他多数

> 詳細は `docs/supabase_erd.mmd` および `docs/00_init.sql` を参照

---

## UI/UX
- Tailwind CSS + Radix UIによる美しいデザイン
- カード・テーブル・ダイアログ・トースト・アコーディオン・タブ等の豊富なUI部品
- レスポンシブ/ダークモード対応

---

## ライセンス
MIT

---

## 作者
- mshrynzw 