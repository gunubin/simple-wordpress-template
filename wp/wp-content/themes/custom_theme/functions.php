<?php
include_once(dirname(__FILE__) . '/lib/base.php');
include_once(dirname(__FILE__) . '/lib/configure.php');
include_once(dirname(__FILE__) . '/lib/permalink.php');
include_once(dirname(__FILE__) . '/lib/paths.php');
include_once(dirname(__FILE__) . '/lib/thumbnail.php');
include_once(dirname(__FILE__) . '/lib/custom_post.php');
include_once(dirname(__FILE__) . '/lib/paginate.php');
include_once(dirname(__FILE__) . '/lib/menus.php');

include_once(dirname(__FILE__) . '/lib/plugins/acf.php');
include_once(dirname(__FILE__) . '/lib/plugins/wpcf7.php');

require_once dirname(__FILE__) . '/lib/vendor/extended-template-parts/extended-template-parts.php';

function get_component($slug, $name = '', array $vars = []) {
  get_extended_template_part($slug, $name, $vars, array(
    'dir' => 'components',
    'cache' => WP_DEBUG ? false : 2,// seconds
  ));
}


add_action('pre_get_posts', function ($query) {
  if (is_admin() || !$query->is_main_query()) {
    return;
  }
  // news
  //  if ($query->is_post_type_archive('news')) {
  //    $query->set('posts_per_page', WP_DEBUG ? 3 : 10);
  //  }
});

