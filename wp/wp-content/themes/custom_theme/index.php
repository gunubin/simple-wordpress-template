<?php get_header(); ?>

<div class="main">


  <div id="barba-wrapper">
    <div class="barba-container">

      <div class="kv-row">
        <div class="kv">
          <img src="http://condesire.com/assets/images/capture/toilet.jpg" alt=""/>
        </div>
        <div class="kv">
          <img src="http://condesire.com/assets/images/capture/reicious.jpg" alt=""/>
        </div>
        <div class="kv">
          <img src="http://condesire.com/assets/images/capture/epoch.jpg" alt=""/>
        </div>
        <div class="kv">
          <img src="http://condesire.com/assets/images/capture/uzuz.jpg" alt=""/>
        </div>
        <div class="kv">
          <img src="http://condesire.com/assets/images/capture/ponos.png" alt=""/>
        </div>
        <div class="kv">
          <img src="http://condesire.com/assets/images/capture/aidma.png" alt=""/>
        </div>
      </div>


      <br/>

      <div class="animate">animate <span class="animate-span">span</span></div>

      <div class="foo">foo</div>
      <a href="/about">about link</a>

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
