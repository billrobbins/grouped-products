<?php

/**
 * This script can be used to add dimensions to products based on their title.
 */

class Class_Update_Product_Dimensions_By_Title {

	public static function update_dimensions( $cat ) {
		$args = array(
			'category' => array( $cat ),
			'orderby'  => 'id',
			'limit'    => 800,
		);

		$products = wc_get_products( $args );

		$widths = array(
			'60'   => array(
				'pattern'   => '/ 60"W/i',
				'dimension' => 60,
			),
			'54'   => array(
				'pattern'   => '/ 54"W/i',
				'dimension' => 54,
			),
			'51.5' => array(
				'pattern'   => '/ 51\\s1/2"W/i',
				'dimension' => 51.5,
			),
			'48'   => array(
				'pattern'   => '/ 48"W/i',
				'dimension' => 48,
			),
			'42'   => array(
				'pattern'   => '/ 42"W/i',
				'dimension' => 42,
			),
			'36'   => array(
				'pattern'   => '/ 36"W/i',
				'dimension' => 36,
			),
			'33'   => array(
				'pattern'   => '/ 33"W/i',
				'dimension' => 33,
			),
			'30'   => array(
				'pattern'   => '/ 30"W/i',
				'dimension' => 30,
			),
			'27'   => array(
				'pattern'   => '/ 27"W/i',
				'dimension' => 27,
			),
			'24'   => array(
				'pattern'   => '/ 24"W/i',
				'dimension' => 24,
			),
			'21'   => array(
				'pattern'   => '/ 21"W/i',
				'dimension' => 18,
			),
			'18'   => array(
				'pattern'   => '/ 18"W/i',
				'dimension' => 18,
			),
			'15'   => array(
				'pattern'   => '/ 15"W/i',
				'dimension' => 15,
			),
			'12'   => array(
				'pattern'   => '/ 12"W/i',
				'dimension' => 12,
			),
			'9'    => array(
				'pattern'   => '/ 9"W/i',
				'dimension' => 9,
			),
			'6'    => array(
				'pattern'   => '/ 6"W/i',
				'dimension' => 6,
			),
			'5.5'  => array(
				'pattern'   => '/ 5.5"W/i',
				'dimension' => 5.5,
			),
			'3'    => array(
				'pattern'   => '/ 3"W/i',
				'dimension' => 3,
			),
			'2.5'  => array(
				'pattern'   => '/ 2\\.5"W/i',
				'dimension' => 2.5,
			),
		);

		$heights = array(
			'96'    => array(
				'pattern'   => '/ 96"H/i',
				'dimension' => 96,
			),
			'90.75' => array(
				'pattern'   => '/ 90\\s3/4″H/i',
				'dimension' => 90.75,
			),
			'84.75' => array(
				'pattern'   => '/ 84\\s3/4"H/i',
				'dimension' => 84.75,
			),
			'84'    => array(
				'pattern'   => '/ 84"H/i',
				'dimension' => 84,
			),
			'78.75' => array(
				'pattern'   => '/ 78\\s3/4″H/i',
				'dimension' => 78.75,
			),
			'60'    => array(
				'pattern'   => '/ 60"H/i',
				'dimension' => 60,
			),
			'54'    => array(
				'pattern'   => '/ 54"H/i',
				'dimension' => 54,
			),
			'48'    => array(
				'pattern'   => '/ 48"H/i',
				'dimension' => 48,
			),
			'42'    => array(
				'pattern'   => '/ 42"H/i',
				'dimension' => 42,
			),
			'41.25' => array(
				'pattern'   => '/ 41\\.25"H/i',
				'dimension' => 41.25,
			),
			'36'    => array(
				'pattern'   => '/ 36"H/i',
				'dimension' => 36,
			),
			'35.25' => array(
				'pattern'   => '/ 35\\s1/4″H/i',
				'dimension' => 35.25,
			),
			'34.5'  => array(
				'pattern'   => '/ 34\\s1/2″H/i',
				'dimension' => 34.5,
			),
			'34.5'  => array(
				'pattern'   => '/ 34\\.5"H/i',
				'dimension' => 34.5,
			),
			'30'    => array(
				'pattern'   => '/ 30"H/i',
				'dimension' => 30,
			),
			'29.25' => array(
				'pattern'   => '/ 29\\s1/4″H/i',
				'dimension' => 29.25,
			),
			'24'    => array(
				'pattern'   => '/ 24"H/i',
				'dimension' => 24,
			),
			'18'    => array(
				'pattern'   => '/ 18"H/i',
				'dimension' => 18,
			),
			'15'    => array(
				'pattern'   => '/ 15"H/i',
				'dimension' => 15,
			),
			'12'    => array(
				'pattern'   => '/ 12"H/i',
				'dimension' => 12,
			),
			'7'     => array(
				'pattern'   => '/ 7"H/i',
				'dimension' => 7,
			),
		);

		foreach ( $products as $product ) {

			foreach ( $widths as $width ) {
				if ( self::matches_pattern( $width['pattern'], $product->get_name() ) ) {
					$product->set_width( $width['dimension'] );
					$product->save();
					wc_get_logger()->info( 'width updated: ' . $product->get_name(), array( 'source' => 'Dimension Updated' ) );
				} else {
					wc_get_logger()->info( 'width not updated: ' . $product->get_name(), array( 'source' => 'Dimension Not Updated' ) );
				}
			}

			foreach ( $heights as $height ) {
				if ( self::matches_pattern( $height['pattern'], $product->get_name() ) ) {
					$product->set_height( $height['dimension'] );
					$product->save();
					wc_get_logger()->info( 'height updated: ' . $product->get_name(), array( 'source' => 'Dimension Updated' ) );
				} else {
					wc_get_logger()->info( 'height not updated: ' . $product->get_name(), array( 'source' => 'Dimension Not Updated' ) );
				}
			}
		}
	}

	/**
	 * Takes a regex pattern and string and determines if the string matches the pattern.
	 *
	 * @param string $pattern - the Regex to match.
	 * @param string $string  - the string to compare to the pattern.
	 */
	private function matches_pattern( $pattern, $string ) {
		return preg_match( $pattern, $string );
	}
}
