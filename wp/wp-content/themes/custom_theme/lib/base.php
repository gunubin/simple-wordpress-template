<?php
/***********************************************************************************************************************
 * バージョン消す
 **********************************************************************************************************************/
// http://kwski.net/wordpress/1058/
// remove wp version param from any enqueued scripts
function vc_remove_wp_ver_css_js($src) {
  if (strpos($src, 'ver='))
    $src = remove_query_arg('ver', $src);
  return $src;
}

add_filter('style_loader_src', 'vc_remove_wp_ver_css_js', 9999);
add_filter('script_loader_src', 'vc_remove_wp_ver_css_js', 9999);
// http://evm-label.com/2015/01/wordpress_version01/
remove_action('wp_head', 'wp_generator');

function get_anchor($hash) {
  $ret = '?anchor=' . $hash;
  if (_config('is_top')) {
    $ret = '#' . $hash;
  }
  return $ret;
}
