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
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', // Используйте актуальную версию [citation:6]
		array(),
		'11.0.0'
	);

	// Подключаем скрипт Swiper
	wp_enqueue_script(
		'swiper-script',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
		array(), // Уберите 'jquery', если он не нужен, чтобы не создавать зависимостей [citation:6]
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
	}

	// Проверяем, включен ли мультисайт
	$is_multisite = function_exists('is_multisite') && is_multisite();

	if ($is_multisite) {
		// Если мультисайт включен - получаем ID текущего сайта
		$blog_id = get_current_blog_id();
		$msk_id = 2;

		if (($blog_id == $msk_id && is_front_page()) || is_page('test-page')) {
			wp_enqueue_style(
				'main-art',
				plugin_dir_url(__FILE__) . 'assets/main-msk.css',
				[],
				filemtime(dirname(__FILE__) . '/assets/main-msk.css'),
				'screen'
			);
		} else {
			wp_enqueue_style(
				'main-art',
				plugin_dir_url(__FILE__) . 'assets/main.css',
				[],
				filemtime(dirname(__FILE__) . '/assets/main.css'),
				'screen'
			);
		}
	} else {

		if (is_page('professions-msc')) {
			wp_enqueue_style(
				'main-art',
				plugin_dir_url(__FILE__) . 'assets/main-msk.css',
				[],
				filemtime(dirname(__FILE__) . '/assets/main-msk.css'),
				'screen'
			);
		} else {
			wp_enqueue_style(
				'main-art',
				plugin_dir_url(__FILE__) . 'assets/main.css',
				[],
				filemtime(dirname(__FILE__) . '/assets/main.css'),
				'screen'
			);
		}
	}

	if (!wp_is_mobile()) {
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

// 1. Для админки (редактор блоков)
add_action('enqueue_block_editor_assets', 'fv_block_editor_assets');
function fv_block_editor_assets()
{
	wp_enqueue_script(
		'vadimfominov',
		plugin_dir_url(__FILE__) . 'assets/block.js',
		['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-api-fetch'],
		filemtime(dirname(__FILE__) . '/assets/block.js')
	);
}


function my_block_init()
{
	register_block_type('fv/header-block', [
		'render_callback' => 'my_render_block',
	]);
}
add_action('init', 'my_block_init');

function my_render_block($attributes, $content)
{
	$menu_id = isset($attributes['selectedMenu']) ? (int) $attributes['selectedMenu'] : 0;
	$menu_html = wp_nav_menu([
		'menu' => $menu_id,
		'echo' => false,
	]);

	// Заменяем плейсхолдер меню на отрендеренное меню
	$content = str_replace('<div data-placeholder="menu-placeholder"></div>', $menu_html, $content);

	return $content;
}

function my_menus_init()
{
	register_block_type('fv/footer-block', [
		'render_callback' => 'my_render_menus',
	]);
}
add_action('init', 'my_menus_init');

function my_render_menus($attributes, $content)
{
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
