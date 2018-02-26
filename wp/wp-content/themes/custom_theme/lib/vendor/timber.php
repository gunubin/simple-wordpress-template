<?php
if (class_exists('Timber')) {

  add_filter('timber/cache/location', function () {
    return get_template_directory() . '/.cache/timber';
  });

  Timber::$cache = true;

  add_filter('timber/twig', function (\Twig_Environment $twig) {
    $twig->addFunction(new Timber\Twig_Function('get_scripts_uri', 'get_scripts_uri'));
    $twig->addFunction(new Timber\Twig_Function('get_styles_uri', 'get_styles_uri'));
    $twig->addFunction(new Timber\Twig_Function('get_images_uri', 'get_images_uri'));
    $twig->addFunction(new Timber\Twig_Function('get_current_class', 'get_current_class'));
    $twig->addFunction(new Timber\Twig_Function('get_thumbnail_uri', 'get_thumbnail_uri'));
    $twig->addFunction(new Timber\Twig_Function('the_thumbnail', 'the_thumbnail'));
    $twig->addFunction(new Timber\Twig_Function('home_url', 'home_url'));
    return $twig;

  });
}

