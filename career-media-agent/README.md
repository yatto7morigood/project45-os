# 逆転キャリア運用AI v1

Threads / Instagram / note を使い、転職領域の一次体験をコンテンツ化し、afb等のアフィリエイト案件へつなぐための運用AIです。

## 目的

- 既存Threadsの月間閲覧実績を転職ジャンルへ段階的にピボットする
- 実体験を中心に、誇張・架空体験・規約違反を避けた投稿を継続生成する
- Threads = 発見、Instagram = 保存・コメント、note = 深掘り・CVハブとして役割分担する
- ASP案件は「報酬単価」だけでなく、成果条件・承認条件・ターゲット適合度で選定する
- 有料施策は自動実行しない。費用発生前に必ず人間承認を要求する

## ブランド仮称

**逆転キャリア研究所**

### 基本ポジション

学歴・職歴・空白期間に自信がなくても、転職でキャリアは再設計できる。
地方企業から大手・外資系への転職、キャリア断絶後の再就職など、本人の実体験を起点に発信する。

## 媒体の役割

| 媒体 | 役割 | 主KPI |
|---|---|---|
| Threads | 発見・共感・コメント獲得 | views / profile visits / comments |
| Instagram | 保存・コメント・DM導線 | reach / saves / comments / profile visits |
| note | 深掘り・比較・CVハブ | PV / read-through / ASP clicks / CV |

## 収益導線

Threads / Instagram
→ コメントキーワード or プロフィール
→ 無料note
→ 読者属性で案件を分岐
→ ASP
→ CV

想定キーワード例: `職歴` `面接` `年収` `転職` `求人`

## 重要ルール

1. 本人が経験していないサービスを「使った」と書かない。
2. 実測値、公式情報、推定値を混在させない。
3. PR/広告表記を必ず行う。
4. ASP・広告主の掲載条件、NGワード、SNS事前確認条件を優先する。
5. 逮捕・出所などセンシティブな実体験は、媒体審査・広告主ブランドセーフティを考慮し、初期の収益記事では前面に出さない。
6. 競合投稿は文章をコピーせず、構造・フック・CTA・テーマだけを抽出する。
7. 費用が発生するAPI、広告、外注、SaaSは自動契約しない。

## ディレクトリ

```text
career-media-agent/
├── README.md
├── AGENTS.md
├── config/
│   ├── brand.yaml
│   ├── platforms.yaml
│   └── compliance.yaml
├── knowledge/
│   ├── experience_facts.md
│   └── offer_matrix.csv
├── prompts/
│   ├── strategist.md
│   ├── threads_writer.md
│   ├── instagram_writer.md
│   ├── note_writer.md
│   ├── compliance_reviewer.md
│   └── analyst.md
├── templates/
│   ├── daily_brief.md
│   └── content_batch.md
└── scripts/
    ├── validate_content.py
    └── score_offers.py
```

## Codexの使い方

Codexにはまず `career-media-agent/AGENTS.md` を読ませ、次に以下のように依頼します。

```text
career-media-agent/AGENTS.md に従って、今日の転職コンテンツを生成してください。
Threads 3本、Instagramカルーセル1本、note記事案1本。
本人の一次体験を優先し、未確認情報は断定しないこと。
出力は career-media-agent/output/YYYY-MM-DD/ に保存してください。
```

## 自動化レベル

### v1
- Codexが企画・投稿文・記事下書き・分析案を生成
- 人間がThreads / Instagram / noteへ投稿
- ASP案件の申請・投稿承認・入出金は人間が担当

### v2
- Meta公式APIの利用条件を満たした後、Threads / Instagram投稿を自動化
- noteは公式公開APIがないため、原則として人間投稿を維持

### v3
- KPI取得 → 勝ちテーマ判定 → 次回投稿案生成まで自動化

