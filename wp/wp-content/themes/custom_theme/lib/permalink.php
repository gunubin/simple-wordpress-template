<?php
add_filter('query_vars', function ($vars) {
  $vars[] = "status";
  return $vars;
});

add_filter('rewrite_rules_array', 'add_custom_type_index_rules');
function add_custom_type_index_rules($rules) {
  global $wp_rewrite, $add_custom_post_rules;
  if (!$wp_rewrite->using_permalinks()) {
    return;
  }

  $add_custom_post_rules = array();
  $rule_templates = array(
    '/' => '',
    '/page/([0-9]+)/' => '&paged=$matches[1]',
    '/date/([0-9]{4})/' => '&year=$matches[1]',
    '/category/(.+?)/page/?([0-9]{1,})/' => '&news_category=$matches[1]&paged=$matches[2]',
    '/category/(.+?)/' => '&news_category=$matches[1]',
    '/tag/(.+?)/page/?([0-9]{1,})/' => '&news_tag=$matches[1]&paged=$matches[2]',
    '/tag/(.+?)/' => '&news_tag=$matches[1]',
    '/date/([0-9]{4})/([0-9]{1,2})/page/([0-9]{1,})/' => '&year=$matches[1]&monthnum=$matches[2]&paged=$matches[3]',
    '/date/([0-9]{4})/page/([0-9]{1,})/' => '&year=$matches[1]&paged=$matches[2]',
    '/date/([0-9]{4})/([0-9]{1,2})/' => '&year=$matches[1]&monthnum=$matches[2]',
  );
  $post_types = get_post_types(array('public' => true, 'show_ui' => true, 'has_archive' => true), false);

  if ($post_types) {
    foreach ($post_types as $post_type_slug => $post_type) {
      if (!isset($post_type->_builtin) || !$post_type->_builtin) {
        foreach ($rule_templates as $regex => $rule) {
          $add_custom_post_rules[$post_type_slug . $regex . '?$'] = $wp_rewrite->index . '?post_type=' . $post_type_slug . $rule;
        }
      }
    }
  }

  $rules = array_merge($add_custom_post_rules, $rules);
//    echo '<pre style="margin-left: 170px">';
//    var_dump($rules);
//    echo '</pre>';
  return $rules;
}
