<?php get_header(); ?>


<div class="main">

  <div id="pjax-container">

    <div class="kv-row">
      <div class="kv">
        <img class="js-preload" data-src="<?php the_images_uri(); ?>/kv.jpg" alt=""/>
      </div>
      <div class="kv">
        <img class="js-preload" data-src="<?php the_images_uri(); ?>/kv2.jpg" alt=""/>
      </div>
    </div>

    <script type="text/javascript" charset="utf-8">
      window.preloader.start()
    </script>


    <br/>

    <div class="animate">animate <span class="animate-span">span</span></div>

    <div class="foo">foo</div>

    <div class="ob-row">
      <?php for ($i = 0; $i < 40; $i++): ?>
        <div class="ob">
          <div class="ob-inner">
            scroll obseier
          </div>
        </div>
      <?php endfor; ?>
    </div>

  </div>


  <div class="test-container">
    <div class="row">
      <div class="col col-menu">
        <div class="bg">col1</div>
      </div>
      <div class="col col-menu">
        <div class="bg">col2</div>
      </div>
      <div class="col col-menu">
        <div class="bg">col3</div>
      </div>
      <div class="col col-menu">
        <div class="bg">col3</div>
      </div>
    </div>
  </div>


  <div>
    main
    main2
  </div>

</div>
<?php get_footer(); ?>
