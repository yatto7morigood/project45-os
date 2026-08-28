# Jimoty Resale Hunter

福岡県内のジモティー新着出品から、せどり候補を抽出して日次レポートにまとめる専用エージェントです。v1 は安全な手動インポートで動作し、未確定の型番・状態でも根拠があれば「推論ベースの価値あり候補」に分けて残します。

## 実行方法

Python 3.12 を用意して、次を実行します。

```powershell
cd jimoty-resale-agent
python -m pip install -r requirements.txt
python -m src.main --mode manual_import --input examples/listings.json
```

当日のレポートは `reports/YYYY-MM-DD.md`、重複判定の状態は `data/state.db` に保存されます。JSON は配列、CSV はヘッダー行つきで、少なくとも `title,price,location,url,listed_at,condition,description` を指定してください。JSON の `market_evidence` には `source,evidence_type,title,price,url,observed_at,notes` を登録できます（`sold / buyback / used_retail / asking`）。

地域・利益閾値・費用は `config/settings.yaml` で変更できます。v1 が自動化するのはインポート後の正規化、証拠整理、計算、重複除外、レポート出力までです。取得は手動で行い、出品者連絡・購入・出品は行いません。

GitHub Actions は Actions タブの **Jimoty resale daily report** から手動実行できます。定刻は毎日 06:30 JST（cron は 21:30 UTC）です。

## 目的
毎日、福岡県内の新規出品を確認し、仕入価格と市場価格の差から「利益が出そうな商品だけ」を絞り込みます。

評価対象は主に次の5項目です。

- 名称・仕入価格
- 型番・製造年または発売年
- 買取市場での相場
- ヤフオク等のオークション相場
- 売却益の星5段階評価

加えて、想定売却価格、手数料、送料、純利益、ROI、売れやすさ、リスク、根拠URLも記録します。

## 初期せどり基準
原則として以下を候補にします。

- 想定純利益 3,000円以上 かつ ROI 30%以上
- 0円仕入れで、再販需要が確認できる商品
- ROIが30%未満でも、想定純利益5,000円以上

利益1,500円未満は原則見送りです。

## 安全設計
ジモティーへの大量アクセス、CAPTCHA回避、ログイン回避、プロキシ回転などは実装しません。

v1では必ず `manual_import` モードを完成させます。公開ページの自動取得が利用規約やアクセス制限上問題なく行える場合だけ、低頻度の `public_fetch` を追加できます。

## Codexにやってもらう方法
Codexでこのリポジトリを開き、次の一文をそのまま入力してください。

`jimoty-resale-agent/CODEX_TASK.md と jimoty-resale-agent/AGENTS.md を最初に読み、記載された受入条件をすべて満たすまで Jimoty Resale Hunter v1 を実装してください。既存の project45-os と career-media-agent には影響を与えず、jimoty-resale-agent/ 配下を中心に作業してください。テストまで実行し、最後に変更ファイル・実行方法・残課題を報告してください。`

## 想定フォルダ構成

```text
jimoty-resale-agent/
├─ AGENTS.md
├─ CODEX_TASK.md
├─ README.md
├─ config/
│  └─ settings.yaml
├─ src/
│  ├─ collector.py
│  ├─ normalizer.py
│  ├─ market_research.py
│  ├─ scoring.py
│  ├─ storage.py
│  ├─ report.py
│  └─ main.py
├─ examples/
│  └─ listings.json
├─ tests/
├─ reports/
└─ data/
```

## 日次レポートの例

```text
本日の仕入れ候補 TOP 5

1. NEC Aterm WX3600HP
仕入: 0円
想定売却: 5,000〜7,000円
想定純利益: xxxx円
評価: ★★★★★
信頼度: 高/中/低
根拠: URL...

2. Aladdin AMG-G1300A(G)
仕入: 2,000円
状態: 新品
想定売却: xxxx円
想定純利益: xxxx円
評価: ★★★★★
```

※ 上記の価格欄は例です。ライブ相場を捏造しないことを最優先とします。

## 自動実行
Codex実装後は GitHub Actions で毎日 06:30 JST に実行する設計です。

自動化するもの:
- 新規出品の取り込み
- 重複除外
- 市場データの整理
- 利益計算
- ★評価
- 日次レポート作成

自動化しないもの:
- 出品者への連絡
- 購入
- 値下げ交渉
- 転売先への出品

最終的な購入判断は人間が行います。
