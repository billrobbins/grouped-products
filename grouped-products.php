<?php
/**
 * Plugin Name:       Grouped Products
 * Plugin URI:        https://github.com/billrobbins/
 * Description:       Provides a clean way to group similar products in the store.
 * Version:           0.2
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            Bill Robbins
 * Author URI:        https://justabill.blog
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

// Load REST Endpoint for Options.
require_once plugin_dir_path( __FILE__ ) . '/includes/class-grouped-products-wc-rest-controller.php';

/**
 * Register and enqueue JS and CSS
 * 
 * @return void
 */
function grouped_products_load_scripts(): void {

	// Todo: only load these on product category archives.
	if ( isset( $_GET['page'] ) && ! empty( $_GET['page'] ) && 'rapid-products' !== $_GET['page'] ) {
	//	return;
	}

	$script_path       = '/build/index.js';
	$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
	$script_asset      = file_exists( $script_asset_path )
		? require $script_asset_path
		: array(
			'dependencies' => array(),
			'version'      => filemtime( $script_path ),
		);
	$script_url        = plugins_url( $script_path, __FILE__ );

	wp_register_script(
		'rapid-products',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_register_style(
		'rapid-products',
		plugins_url( '/build/index.css', __FILE__ ),
		array(),
		filemtime( dirname( __FILE__ ) . '/build/index.css' )
	);

	wp_enqueue_script( 'rapid-products' );
	wp_enqueue_style( 'rapid-products' );
}

add_action( 'wp_enqueue_scripts', 'grouped_products_load_scripts' );

/**
 * Adds div to load our React app
 *
 * @return void
 */
function ijab_product_cat_react_hook(): void {
	if ( is_product_category() ) {
		echo '<div class="product-cat-react-hook"></div>';
	}
}
add_action( 'woocommerce_before_shop_loop', 'ijab_product_cat_react_hook' );

/**
 * Removes the products from the product category page
 *
 * @return void
 */
function ijab_remove_products_cat_archive(): void {
	if ( is_product_category() ) {
		add_action(
			'woocommerce_before_shop_loop',
			function() {
				$GLOBALS['woocommerce_loop']['total'] = false;
			}
		);
	}
}
add_action( 'woocommerce_before_main_content', 'ijab_remove_products_cat_archive' );

/**
 * Removes default counting and sorting for products
 *
 * @return void
 */
function remove_product_cat_intro(): void {
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
	remove_action( 'woocommerce_after_shop_loop', 'woocommerce_result_count', 20 );
}
add_action( 'after_setup_theme', 'remove_product_cat_intro' );
