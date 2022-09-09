<?php

/**
 * Creates REST API endpoint for product groups.
 *
 * @since 0.1
 *
 * @see register_rest_route
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 */
class Grouped_Products_WC_REST_Controller {

	/**
	 * Initialize our namespace and resource name
	 *
	 * @return void
	 */
	public function __construct() {
		$this->namespace = 'grouped-products/v1';
	}

	/**
	 * Register our routes
	 *
	 * @return void
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/group',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'load_fields' ),
					'permission_callback' => array( $this, 'get_options_permissions_check' ),
				),
			)
		);
	}

	/**
	 * Loads product group
	 *
	 * @param WP_REST_Request $request Current request.
	 * @return option content.
	 */
	public function load_fields( $request ) {

		$cat       = $request->get_param( 'cat' );
		$transient = get_transient( 'grouped_products_' . $cat );

		if ( $transient ) {
			return $transient;
		}

		$results  = array();
		$args     = array(
			'category' => array( $cat ),
			'orderby'  => 'id',
			'limit'    => 300,
		);
		$products = wc_get_products( $args );

		foreach ( $products as $product ) {
			$image_url = wp_get_attachment_image_url( $product->get_image_id(), 'medium', false );
			$results[] = array(
				'id'            => $product->get_id(),
				'name'          => $product->get_name(),
				'price'         => $product->get_price(),
				'sale_price'    => $product->get_sale_price(),
				'regular_price' => $product->get_regular_price(),
				'image'         => $image_url,
				'sku'           => $product->get_sku(),
				'type'          => $product->get_attribute( 'cabinet-type' ),
				'width'         => $product->get_attribute( 'width' ),
				'height'        => $product->get_attribute( 'height' ),
			);
		}

		set_transient( 'grouped_products_' . $cat, $results, 30 * DAY_IN_SECONDS );
		return $results;

	}

	/**
	 * Sets up the proper HTTP status code for authorization.
	 *
	 * @return HTTP status code
	 */
	public function authorization_status_code() {

		$status = 401;

		if ( is_user_logged_in() ) {
			$status = 403;
		}

		return $status;
	}

	/**
	 * Check permissions for the options.
	 *
	 * @return boolean for permissions
	 */
	public function get_options_permissions_check() {
		// if ( ! current_user_can( 'edit_posts' ) ) {
		// return new WP_Error( 'rest_forbidden', esc_html__( 'You cannot view these.  Sorry!' ), array( 'status' => $this->authorization_status_code() ) );
		// }
		return true;
	}
}

/**
 * Function to register our new routes from the controller.
 *
 * @return void
 */
function ijab_grouped_products_wc_register_rest_routes() {
	$controller = new Grouped_Products_WC_REST_Controller();
	$controller->register_routes();
}

add_action( 'rest_api_init', 'ijab_grouped_products_wc_register_rest_routes' );
