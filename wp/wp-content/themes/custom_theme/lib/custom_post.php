<?php
/**
 * news
 */
add_action('init', 'news_post', 0);
function news_post() {
  register_post_type('news', array(
      'label' => 'ニュース',
      'public' => true,
      'has_archive' => true,
      'rewrite' => array(
        'slug' => 'news',
        'permastruct' => '/news/%postname%/',
        'with_front' => true,
      ),
      'supports' => array('title', 'editor', 'author', 'thumbnail'),
    )
  );
}

register_taxonomy(
  'news_category',
  'news',
  array(
    'hierarchical' => true,
    'label' => 'NEWSカテゴリ',
    'singular_label' => 'NEWSカテゴリ',
    'public' => true,
    'show_ui' => true,
  )
);

/**
 * attraction
 */
add_action('init', 'attraction_post', 0);
function attraction_post() {
  register_post_type('attraction', array(
      'label' => 'アトラクション',
      'public' => true,
      'has_archive' => true,
      'rewrite' => array(
        'slug' => 'attraction',
        'permastruct' => '/attraction/%postname%/',
        'with_front' => true,
      ),
      'supports' => array('title', 'editor', 'author', 'thumbnail'),
    )
  );
}

/**
 * workshop
 */
add_action('init', 'workshop_post', 0);
function workshop_post() {
  register_post_type('workshop', array(
      'label' => 'ワークショップ',
      'public' => true,
      'has_archive' => true,
      'rewrite' => array(
        'slug' => 'workshop',
        'permastruct' => '/workshop/%postname%/',
        'with_front' => true,
      ),
      'supports' => array('title', 'editor', 'author', 'thumbnail'),
    )
  );
}

/**
 * space
 */
add_action('init', 'space_post', 0);
function space_post() {
  register_post_type('space', array(
      'label' => 'スペース',
      'public' => true,
      'has_archive' => true,
      'rewrite' => array(
        'slug' => 'space',
        'permastruct' => '/space/%postname%/',
        'with_front' => true,
      ),
      'supports' => array('title', 'author', 'thumbnail'),
    )
  );
}

/**
 * portfolio
 */
add_action('init', 'portfolio_post', 0);
function portfolio_post() {
  register_post_type('portfolio', array(
      'label' => 'ポートフォリオ',
      'public' => true,
      'has_archive' => false,
//      'rewrite' => array(
//        'slug' => 'portfolio',
//        'permastruct' => '/portfolio/%postname%/',
//        'with_front' => true,
//      ),
      'supports' => array('title', 'author', 'thumbnail'),
    )
  );
}

/**
 * status
 */
register_taxonomy(
  'status',
  'space',
  array(
    'hierarchical' => true,
    'label' => 'ステータス',
    'singular_label' => 'ステータス',
    'public' => true,
    'show_ui' => true,
  )
);

/**
 * サイトオプション設定
 */
if (function_exists('acf_add_options_page')) {
  $page = acf_add_options_page(array(
    'page_title' => 'サイト設定',
    'post_id' => 'site',
    'menu_title' => 'サイト設定',
    'position' => 20,
    'menu_slug' => 'site-settings',
    'capability' => 'edit_posts',
//    'parent' => 'edit.php?post_type=blog',
    'redirect' => false
  ));
}
