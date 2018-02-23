<?php
function the_home_url($path = '') {
  if (empty($path)) {
    echo esc_url(get_home_url());
  } else {
    $path = trim( $path, "/" );
    echo esc_url(get_home_url() . '/' . $path . '/' );
  }
}

function get_assets_uri() {
  $result = get_template_directory_uri() . '/assets';
  return $result;
}

function get_styles_uri() {
  $result = get_assets_uri() . '/css';
  return $result;
}
function the_styles_uri() {
  echo get_styles_uri();
}

function get_scripts_uri() {
  $result = get_assets_uri() . '/js';
  return $result;
}
function the_scripts_uri() {
  echo get_scripts_uri();
}

function get_images_uri() {
  $result = get_assets_uri() . '/images';
  return $result;
}

function the_images_uri() {
  echo get_images_uri();
}

function _is_current( $uri = "", $full = false ) {
  $uri = trim( $uri, "/" );
  $request_uri = $_SERVER['REQUEST_URI'];
  $r = false;
  if ($full) {
    $r =$uri && ($request_uri == '/'.$uri.'/');
  } else {
    $pos = strpos($request_uri, '/'.$uri.'/');
    $r = $uri && ($pos !== false);
  }
  if( $r ) {
    return true;
  }
  if( !$uri && (is_home() || is_front_page())) {
    return true;
  }
  return false;
}

function is_current( $uri = array(), $full = false ) {
  $list = array();
  if (is_string($uri)) {
    $list[] = $uri;
  } else {
    $list = $uri;
  }
  $r = false;
  foreach($list as $path) {
    if (_is_current($path, $full)) {
      $r = true;
      break;
    }
  }
  return $r;
}

function get_current_class( $uri, $full = false ) {
  $ret = '';
  if(is_current( $uri, $full )) {
    $ret = 'active';
  };
  return $ret;
}
