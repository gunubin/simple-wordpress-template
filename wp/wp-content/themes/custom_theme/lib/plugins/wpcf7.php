<?php
/***********************************************************************************************************************
* contact form 7
**********************************************************************************************************************/
// safari対応
add_filter('wpcf7_support_html5_fallback', '__return_true');

// pタグを消す
function acf_wysiwyg_remove_wpautop() {
    remove_filter('acf_the_content', 'wpautop' );
}
add_action('acf/init', 'acf_wysiwyg_remove_wpautop', 15);
