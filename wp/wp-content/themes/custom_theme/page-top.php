<?php
$context = Timber::get_context();
$context['paths'] = array(
  'image' => get_images_uri(),
);
$context['posts'] = new Timber\PostQuery();
Timber::render('pages/top.twig', $context);
?>






