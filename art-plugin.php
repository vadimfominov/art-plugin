<?php

/**
 * Plugin name: ART PLugin
 * Plugin URI: https://t.me/wordpress_by
 * Description: Плагин с Gutenberg блоками только для этого сайта
 * Author: Вадим Фоминов
 * Author URI: https://t.me/vadimfominov
 * Version: 0.3.3
 */


add_action('enqueue_block_assets', 'fv_block_assets', 1);
function fv_block_assets()
{

	// Подключаем стили Swiper
	wp_enqueue_style(
		'swiper-style',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
		array(),
		'11.0.0'
	);

	// Подключаем скрипт Swiper
	wp_enqueue_script(
		'swiper-script',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
		array(),
		'11.0.0',
		true // Ставим в футер, чтобы не тормозить загрузку страницы [citation:2]
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

	$posts_per_page = get_option('posts_per_page', 10);

	wp_localize_script('main-art', 'wpApiSettings', [
		'root' => rest_url(),
		'nonce' => wp_create_nonce('wp_rest'),
		'restUrl' => rest_url(),
		'postsPerPage' => (int) $posts_per_page
	]);

	if (is_admin()) {
		wp_enqueue_style(
			'header-admin',
			plugin_dir_url(__FILE__) . 'assets/header-admin.css',
			[],
			filemtime(dirname(__FILE__) . '/assets/header-admin.css'),
			'screen'
		);
		wp_enqueue_style(
			'admin-art',
			plugin_dir_url(__FILE__) . 'assets/admin.css',
			[],
			filemtime(dirname(__FILE__) . '/assets/admin.css'),
			'screen'
		);
	}
}


/**
 * Регистрация всех блоков через block.json
 */
add_action('init', function () {
	$blocks_dir = __DIR__ . '/blocks';

	if (is_dir($blocks_dir)) {
		foreach (glob($blocks_dir . '/*', GLOB_ONLYDIR) as $block_folder) {
			register_block_type($block_folder);
		}
	}
});

/**
 * Подключение сборки блоков
 */
// ПРАВИЛЬНО ✅
add_action('enqueue_block_editor_assets', function () {
	$script_path = plugin_dir_path(__FILE__) . 'build/blocks.js';

	if (file_exists($script_path)) {
		wp_enqueue_script(
			'art-blocks',
			plugin_dir_url(__FILE__) . 'build/blocks.js',
			['wp-blocks', 'wp-element', 'wp-editor', 'wp-components'],
			filemtime($script_path),
			true
		);
	}
});

/**
 * Добавляем поддержку стилей блоков
 */
add_theme_support('wp-block-styles');
add_theme_support('align-wide');
add_theme_support('editor-styles');



function custom_excerpt_length($length)
{
	return 15; // 15 слов
}
function custom_excerpt_more($more)
{
	return '...';
}
add_filter('excerpt_more', 'custom_excerpt_more');
add_filter('excerpt_length', 'custom_excerpt_length');

require_once __DIR__ . '/inc/rest-api.php';
require_once __DIR__ . '/inc/send-form.php';

// Подключаем динамический сборщик
require_once plugin_dir_path(__FILE__) . 'dynamic-assets.php';
