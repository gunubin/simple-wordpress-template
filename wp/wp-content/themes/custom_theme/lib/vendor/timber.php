<?php
/**
 * My custom Twig functionality.
 *
 * @param Twig_Environment $twig
 * @return $twig
 */
add_filter('timber/twig', function (\Twig_Environment $twig) {
  $twig->addFunction(new Timber\Twig_Function('get_scripts_uri', 'get_scripts_uri'));
  $twig->addFunction(new Timber\Twig_Function('get_styles_uri', 'get_styles_uri'));
  $twig->addFunction(new Timber\Twig_Function('get_images_uri', 'get_images_uri'));
  $twig->addFunction(new Timber\Twig_Function('get_current_class', 'get_current_class'));
  $twig->addFunction(new Timber\Twig_Function('get_thumbnail_uri', 'get_thumbnail_uri'));
  $twig->addFunction(new Timber\Twig_Function('the_thumbnail', 'the_thumbnail'));
  return $twig;
});

