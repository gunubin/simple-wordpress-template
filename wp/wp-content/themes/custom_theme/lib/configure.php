<?php

function _config($key, $default=null) {
  global $CONFIG;
  $list = explode('.', $key);
  $value = $CONFIG;
  foreach($list as $name) {
    if (!empty($name) && isset($value[$name])) {
      $value = $value[$name];
    } else {
      $value = $default;
      break;
    }
  }
  return $value;
}
