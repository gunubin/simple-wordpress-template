<?php
$context = Timber::get_context();
$context['posts'] = new Timber\PostQuery();
Timber::render('pages/about.twig', $context);
?>
