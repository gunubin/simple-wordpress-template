<?php
function remove_menus () {
  global $menu;
//  unset($menu[2]);  // ダッシュボード
//  unset($menu[4]);  // メニューの線1
  unset($menu[5]);  // 投稿
//  unset($menu[10]); // メディア
//  unset($menu[15]); // リンク
//  unset($menu[20]); // ページ
  unset($menu[25]); // コメント
//  unset($menu[59]); // メニューの線2
//  unset($menu[60]); // テーマ
//  unset($menu[65]); // プラグイン
//  unset($menu[70]); // プロフィール
//  unset($menu[75]); // ツール
//  unset($menu[80]); // 設定
//  unset($menu[90]); // メニューの線3
}
add_action('admin_menu', 'remove_menus');
