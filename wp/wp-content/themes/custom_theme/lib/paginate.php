<?php
/***********************************************************************************************************************
 * paginate
 **********************************************************************************************************************/
function the_paginate($query_ = null) {

  if (is_singular())
    return;

  global $wp_query;

  $query = $wp_query;
  if ($query) {
    $query = $query_;
  }

  /** Stop execution if there's only 1 page */
  if (!$query || $query->max_num_pages <= 1)
    return;

  $paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
  $max = intval($query->max_num_pages);

  /**  Add current page to the array */
  if ($paged >= 1)
    $links[] = $paged;

  /**  Add the pages around the current page to the array */
  if ($paged >= 3) {
    $links[] = $paged - 1;
    $links[] = $paged - 2;
  }

  if (($paged + 2) <= $max) {
    $links[] = $paged + 2;
    $links[] = $paged + 1;
  }

  echo '<ul>' . "\n";

  /**  Previous Post Link */
  if (get_previous_posts_link())
    printf('<li class="paginate-prev"><a href="%s"><span>&lt;</span></a></li>' . "\n", get_previous_posts_page_link());

  /**  Link to first page, plus ellipses if necessary */
  if (!in_array(1, $links)) {
    $class = 1 == $paged ? ' class="paginate-num-active"' : '';

    printf('<li%s><a href="%s"><span>%s</span></a></li>' . "\n", $class, esc_url(get_pagenum_link(1)), '1');

    if (!in_array(2, $links))
      printf( '<li class="paginate-dot"><span>・・・</span></li>' . "\n");
  }

  /**  Link to current page, plus 2 pages in either direction if necessary */
  sort($links);
  foreach ((array)$links as $link) {
    $class = $paged == $link ? ' class="paginate-active"' : '';
    printf('<li><a href="%s" %s><span>%s</span></a></li>' . "\n", esc_url(get_pagenum_link($link)), $class, $link);
  }

  /**  Link to last page, plus ellipses if necessary */
  if (!in_array($max, $links)) {
    if (!in_array($max - 1, $links))
      printf(
        '<li class="paginate-dot"><span>・・・</span></li>' . "\n");

    $class = $paged == $max ? ' class="paginate-active"' : '';
    printf('<li%s><a href="%s"><span>%s</span></a></li>' . "\n", $class, esc_url(get_pagenum_link($max)), $max);
  }

  /**  Next Post Link */
  if (get_next_posts_link())
    printf('<li class="paginate-next"><a href="%s"><span>&gt;</span></a></li>' . "\n", get_next_posts_page_link());

  echo '</ul>' . "\n";

}
