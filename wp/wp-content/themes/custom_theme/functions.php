<?php
//foreach (glob(get_template_directory() . "/lib/**/*.php")  as $file) {
//  require $file;
//}
require_once(dirname(__FILE__) . '/lib/base.php');
require_once(dirname(__FILE__) . '/lib/configure.php');
require_once(dirname(__FILE__) . '/lib/permalink.php');
require_once(dirname(__FILE__) . '/lib/paths.php');
require_once(dirname(__FILE__) . '/lib/thumbnail.php');
require_once(dirname(__FILE__) . '/lib/custom_post.php');
require_once(dirname(__FILE__) . '/lib/paginate.php');
require_once(dirname(__FILE__) . '/lib/menus.php');

require_once(dirname(__FILE__) . '/lib/vendor/acf.php');
require_once(dirname(__FILE__) . '/lib/vendor/wpcf7.php');
require_once(dirname(__FILE__) . '/lib/vendor/timber.php');

require_once dirname(__FILE__) . '/lib/vendor/extended-template-parts/extended-template-parts.php';

function get_component($slug, $name = '', array $vars = []) {
  get_extended_template_part($slug, $name, $vars, array(
    'dir' => 'components',
    'cache' => WP_DEBUG ? false : 2,// seconds
  ));
}


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

