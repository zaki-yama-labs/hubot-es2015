hubot-es2015
============

ES2015 で書いた Hubot のサンプル。
Heroku にデプロイし、Slack Bot として利用することを想定しています。

## 機能一覧

- Slack のメンバーからランダムで一人選び、メンションをとばす機能 ([#1](https://github.com/zaki-yama/hubot-es2015/pull/1))
    - チャンネルに bot を招待する
    - bot に向かって `@hubot random` や `@hubot 抽選` とメンションすると、抽選で一人選んでメンションを返してくれる

## インストール＆起動方法

事前に Node.js と [Heroku Toolbelt](https://toolbelt.heroku.com/) をインストールしておく必要があります。

### パッケージのインストールとビルド

以下のコマンドを実行します。

```zsh
$ npm install

# ES2015 のトランスパイル
$ npm run build
```

### ローカルで起動

`.env` ファイルを作成し、Slack の Hubot 設定ページからコピーした `HUBOT_SLACK_TOKEN` を記述します。

```
HUBOT_SLACK_TOKEN=XXX
```

以下のコマンドを実行すると、ローカルで Hubot が起動します。そのまま Slack 上で動作を確認することもできます。

```
$ heroku local web
```


### Heroku にデプロイ

Heroku アプリケーションを作成し、デプロイします。

```zsh
$ heroku create my-hubot-app
Creating ⬢ my-hubot-app... done
https://my-hubot-app.herokuapp.com/ | https://git.heroku.com/my-hubot-app.git

$ git push heroku master
Counting objects: 58, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (46/46), done.
Writing objects: 100% (58/58), 11.20 KiB | 0 bytes/s, done.
...
remote: Verifying deploy... done.
To https://git.heroku.com/my-hubot-app.git
 * [new branch]      master -> master
```

デプロイ環境の環境変数として、`HUBOT_SLACK_TOKEN` に加え、[hubot-heroku-keepalive](https://github.com/hubot-scripts/hubot-heroku-keepalive) 用に `HUBOT_HEROKU_KEEPALIVE_URL` と `TZ` を設定します。

```zsh
$ heroku config:add HUBOT_SLACK_TOKEN=XXX
# 'my-hubot-app' 部分は自分のアプリケーション名に置き換え
$ heroku config:add HUBOT_HEROKU_KEEPALIVE_URL=https://my-hubot-app.herokuapp.com
$ heroku config:add TZ=Asia/Tokyo
```
