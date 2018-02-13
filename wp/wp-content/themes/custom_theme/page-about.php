<?php get_header(); ?>

<div class="main">
  <div id="pjax-container">
    <div class="kv">
      <img class="js-preload" data-src="<?php the_images_uri(); ?>/kv4.jpg" alt=""/>
    </div>
    <div class="kv">
      <img class="js-preload" data-src="<?php the_images_uri(); ?>/kv3.jpg" alt=""/>
    </div>
    
    <script type="text/javascript" charset="utf-8">
      window.preloader.start()
    </script>

    ...Put here the content you wish to change between pages...

    <br/>
    <a href="/">/ link</a>
  </div>
</div>

<?php get_footer(); ?>
