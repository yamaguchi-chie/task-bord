# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Vite + React で構築したシンプルなタスクボードアプリ。

## よく使うコマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 本番ビルド (dist/ に出力)
npm run preview  # ビルド結果をローカルで確認
npm run lint     # ESLint 実行
```

## 技術スタック

| 用途 | ライブラリ／ツール |
|------|------------------|
| UI フレームワーク | React 18 |
| ビルドツール | Vite 4 |
| スタイリング | Plain CSS（`src/App.css`） |
| 状態永続化 | localStorage（ブラウザ標準API） |
| Lint | ESLint 8 + eslint-plugin-react |
| CI/CD | GitHub Actions |

## アーキテクチャ

単一コンポーネント構成。状態管理はすべて `src/App.jsx` 内の `useState` で完結している。

- `tasks`: `{ id, text, completed }` の配列
- `inputText`: 入力フォームの一時値

スタイルは `src/App.css` にフラットに記述。CSS Modules や外部ライブラリは使用していない。

## コンポーネント命名規約

- コンポーネントファイル・関数名は **PascalCase**（例: `App`, `TaskItem`）
- ファイル拡張子は **`.jsx`**
- props / state / ローカル変数は **camelCase**（例: `inputText`, `addTask`）
- CSS クラス名は **kebab-case**（例: `.task-item`, `.delete-btn`）

## デプロイ先

https://yamaguchi-chie.github.io/task-bord/

`main` ブランチへのプッシュで GitHub Actions が自動的にビルド・デプロイする。
ワークフロー定義: `.github/workflows/deploy.yml`

## Git 運用ルール

コードを変更するたびに、必ず以下の手順でGitHubにプッシュすること。

```bash
git add <変更ファイル>
git commit -m "コミットメッセージ"
git push origin main
```

- コミットは変更の単位ごとに細かく行う
- プッシュはコミット後、毎回必ず実施する
- コミットメッセージは変更内容を簡潔に日本語または英語で記述する
