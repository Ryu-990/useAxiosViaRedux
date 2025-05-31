プロジェクト名
[useAxiosViaRedux]

プロジェクト概要
このプロジェクトは、React、Axios、Redux、JSON Server を使用したサンプルアプリケーションです。JSON Server をバックエンドとして使用し、Axios を通じてデータを取得・更新します。Redux を使用してアプリケーションの状態を管理します。

使用技術
React
Axios
@reduxjs/toolkit
JSON Server
動作環境
Node.js (バージョン 14 以降推奨)
npm
インストール手順
リポジトリをクローンします。

Bash

git clone [リポジトリの URL]
プロジェクトのディレクトリに移動します。

Bash

cd [プロジェクトのディレクトリ名]
依存関係をインストールします。

Bash

npm install
# または
yarn install
JSON Server を起動します。

Bash

npm run server
# または
yarn server
アプリケーションを起動します。

Bash

npm start
# または
yarn start
ブラウザで http://localhost:3000 にアクセスします。

JSON Server の設定
JSON Server は restData.json ファイルを使用してデータを管理します。必要に応じて restData.json ファイルを編集してください。

Redux の構成
Redux の状態管理は src/store ディレクトリにあります。

store/slicer.ts: リデューサー
store/.indexts: ストアの設定
Axios の設定
Axios は src/api.js ファイルで設定されています。

ディレクトリ構成<br>
[プロジェクトのディレクトリ]<br>
├── public/<br>
│   └── index.html<br>
├── src/<br>
│   ├── components/<br>
│   │   └── [コンポーネント]<br>
│   ├── redux/<br>
│   │   ├── actions.js<br>
│   │   ├── reducers.js<br>
│   │   └── store.js<br>
│   ├── api.js<br>
│   ├── App.js<br>
│   └── index.js<br>
├── db.json<br>
├── package.json<br>
└── README.md<br>
今後の課題<br>
[課題 1]<br>
[課題 2]<br>
[課題 3]<br>
編集者<br>
[RyuHazako]<br>
