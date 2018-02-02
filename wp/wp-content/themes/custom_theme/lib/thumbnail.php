<?php

/***********************************************************************************************************************
 * thumbnail image
 **********************************************************************************************************************/
add_filter( 'jpeg_quality', 'my_jpeg_qualityj');
function my_jpeg_quality( $arg ){ return 100; }
add_theme_support('post-thumbnails');
//add_image_size('poster', 530, 300, true);

/***********************************************************************************************************************
 * thumbnail path
 **********************************************************************************************************************/
function get_blank_image_uri() {
  return get_images_uri() . '/noimage.png';
}
function get_blank_image_dir() {
  return get_template_directory() . '/../../../../images/noimage.png';
}
function get_blank_image() {
  return get_field('noimage', 'site');
}
function get_thumbnail_obj($post_id = null, $size = 'full', $field_name = '') {
  if (!empty($field_name) && get_field($field_name, $post_id)) {
    $image_id = get_field($field_name, $post_id);
    $image = wp_get_attachment_image_src($image_id, $size);
    return $image;
  } else if (has_post_thumbnail($post_id)) {
    $image_id = get_post_thumbnail_id($post_id);
    $image = wp_get_attachment_image_src($image_id, $size);
    return $image;
  } else {
    $image = get_blank_image();
    $r = array();
    $r[] = $image['url'];
    $r[] = $image['width'];
    $r[] = $image['height'];
    return $r;
  }
}

function get_thumbnail_uri($size = 'full', $post_id = null, $field_name = '') {
  if (!empty($field_name) && get_field($field_name, $post_id)) {
    $image_id = get_field($field_name, $post_id);
    $image = wp_get_attachment_image_src($image_id, $size);
    $r = $image[0];
  } else if (has_post_thumbnail($post_id)) {
    $image_id = get_post_thumbnail_id($post_id);
    $image = wp_get_attachment_image_src($image_id, $size);
    $r = $image[0];
  } else {
    $r = get_blank_image_uri();
  }
  return $r;
}

function the_thumbnail($size, $post_id = null, $class = '', $field_name = '') {
  $image = get_thumbnail_obj($post_id, $size, $field_name);
  $url = $image[0];
  $width = $image[1];
  $height = $image[2];
  echo "<img class='$class' src='$url' width='$width' height='$height' />";
}
