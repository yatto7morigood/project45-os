# Project45 OS v1.0

サッカー指導者になるための個人用ダッシュボードです。黒を基調に青をアクセントにした、PC・スマートフォン対応の Next.js アプリケーションです。

## 実装計画

1. **基盤（完了）** — Next.js / TypeScript / Tailwind / shadcn 互換の設定、ダークテーマ、レスポンシブな共通レイアウトを整備する。
2. **画面の骨格（完了）** — Dashboard と 11 の機能画面、モバイル対応ナビゲーション、ダミーデータを実装する。
3. **機能単位のCRUD（次）** — Training、Notebook、Journal、Goals から作成・編集・完了操作を追加する。
4. **永続化（次）** — Prisma + PostgreSQL などを導入し、`src/features/*/repository.ts` 経由でダミーデータを置き換える。
5. **分析・最適化（次）** — 試合タグ付け、選手比較、トレーニング負荷と週次レビューを実装する。

## 構成提案

```
src/
├─ app/                 # ルーティングとページ組み立て
├─ components/
│  ├─ ui/               # shadcn/ui ベースの汎用部品
│  ├─ layout/           # Sidebar / AppShell
│  ├─ dashboard/        # Dashboard 専用部品
│  └─ pages/            # 画面共通の表示部品
├─ features/            # 将来: 機能ごとの model / service / repository
└─ lib/                 # 定数、ダミーデータ、ユーティリティ
```

`src/lib/navigation.ts` をナビゲーション定義の唯一の情報源にしており、サイドバーと各画面の見出しを同期しています。各機能が成長したら `src/features/{feature}` にデータ操作・型・専用コンポーネントを移します。

## 起動

```bash
npm install
npm run dev
```
