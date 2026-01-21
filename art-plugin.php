<?php
/*
 * Plugin name: ART PLugin
 * Author: Vadim Fominov
 * Author URI: https://t.me/vadimfominov
 * Version: 0.2.8
 */

add_action('enqueue_block_assets', 'fv_block_assets', 1);
function fv_block_assets()
{
	wp_enqueue_script(
		'vadimfominov',
		plugin_dir_url(__FILE__) . 'assets/block.js',
		['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-api-fetch'],
		filemtime(dirname(__FILE__) . '/assets/block.js')
	);
	wp_enqueue_script(
		'main-art',
		plugin_dir_url(__FILE__) . 'assets/main.js',
		[],
		filemtime(dirname(__FILE__) . '/assets/main.js'),
		[
			'in_footer' => false,
			'strategy' => 'async'
		]
	);

	wp_localize_script('main-art', 'wpApiSettings', [
		'root' => esc_url_raw(rest_url()),
		'nonce' => wp_create_nonce('wp_rest')
  	]);

	wp_enqueue_style(
		'main-art',
		plugin_dir_url(__FILE__) . 'assets/main.css',
		[],
		filemtime(dirname(__FILE__) . '/assets/main.css'),
		'screen'
	);

	if(!wp_is_mobile()) {
		wp_enqueue_style(
			'main-1025',
			plugin_dir_url(__FILE__) . 'assets/main-1025.css',
			[],
			filemtime(dirname(__FILE__) . '/assets/main-1025.css'),
			'screen'
		);
	}
	
	if (is_admin()) {
		wp_enqueue_style(
			'admin-art',
			plugin_dir_url(__FILE__) . 'assets/admin.css',
			[],
			filemtime(dirname(__FILE__) . '/assets/admin.css'),
			'screen'
		);
	}
	
}


function my_block_init() {
	register_block_type( 'fv/header-block', [
		'render_callback' => 'my_render_block',
	]);
}
add_action( 'init', 'my_block_init' );

function my_render_block( $attributes, $content ) {
	$menu_id = isset( $attributes['selectedMenu'] ) ? (int) $attributes['selectedMenu'] : 0;
	$menu_html = wp_nav_menu( [
		'menu' => $menu_id,
		'echo' => false,
	]);

	// Заменяем плейсхолдер меню на отрендеренное меню
	$content = str_replace('<div data-placeholder="menu-placeholder"></div>', $menu_html, $content);

	return $content;
}

function my_menus_init() {
	register_block_type( 'fv/footer-block', [
		'render_callback' => 'my_render_menus',
	]);
}
add_action( 'init', 'my_menus_init' );

function my_render_menus($attributes, $content) {
	// Обрабатываем первое меню
	if (isset($attributes['selectedFooterMenu'])) {
		$menu_id = (int) $attributes['selectedFooterMenu'];
		$menu_html = wp_nav_menu([
			'menu' => $menu_id,
			'echo' => false,
		]);
		$content = str_replace(
			'<div data-footerplaceholder="footer-menu-placeholder"></div>', 
			$menu_html, 
			$content
		);
	}

	// Обрабатываем второе меню
	if (isset($attributes['selectedDirections'])) {
		$menu_id = (int) $attributes['selectedDirections'];
		$menu_html = wp_nav_menu([
			'menu' => $menu_id,
			'echo' => false,
		]);
		$content = str_replace(
			'<div data-directionsplaceholder="directions-menu-placeholder"></div>', 
			$menu_html, 
			$content
		);
	}

	// Обрабатываем третье меню
	if (isset($attributes['selectedDocuments'])) {
		$menu_id = (int) $attributes['selectedDocuments'];
		$menu_html = wp_nav_menu([
			'menu' => $menu_id,
			'echo' => false,
		]);
		$content = str_replace(
			'<div data-documentsplaceholder="documents-menu-placeholder"></div>', 
			$menu_html, 
			$content
		);
	}

	return $content ?: '';
}

require_once __DIR__ . '/inc/rest-api.php';
require_once __DIR__ . '/inc/send-form.php';
