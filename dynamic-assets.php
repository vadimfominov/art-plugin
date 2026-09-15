<?php

/**
 * Динамическая сборка JS и CSS только для блоков на странице
 * С оптимизациями: кеширование, GZIP, минификация
 */

// ============================================
// КОНСТАНТЫ ДЛЯ НАСТРОЙКИ
// ============================================

// define('FV_CACHE_TIME', HOUR_IN_SECONDS); // Время кеширования (1 час)
define('FV_CACHE_TIME', 1); // Время кеширования (1 час)
define('FV_USE_GZIP', true); // Использовать gzip сжатие

// ============================================
// ДИНАМИЧЕСКАЯ СБОРКА JS
// ============================================

// 1. Регистрируем endpoint для получения собранного JS
add_action('rest_api_init', function () {
	register_rest_route('fv/v1', '/dynamic-js', [
		'methods' => 'GET',
		'callback' => 'fv_get_dynamic_js',
		'permission_callback' => '__return_true',
	]);
});

// 2. Функция, которая собирает JS на лету
function fv_get_dynamic_js()
{
	$blocks_hash = isset($_GET['blocks']) ? sanitize_text_field($_GET['blocks']) : '';

	if (empty($blocks_hash)) {
		return new WP_REST_Response('No blocks specified', 400);
	}

	$block_list = json_decode(base64_decode($blocks_hash), true);

	if (!is_array($block_list) || empty($block_list)) {
		return new WP_REST_Response('Invalid blocks list', 400);
	}

	// Сортируем для консистентности кеша
	sort($block_list);
	$cache_key = 'fv_dynamic_js_' . md5(implode('_', $block_list));

	// Проверяем кеш
	$cached_js = get_transient($cache_key);
	if ($cached_js !== false) {
		header('Content-Type: application/javascript');
		header('Cache-Control: public, max-age=' . FV_CACHE_TIME);
		header('X-Cache: HIT');

		if (FV_USE_GZIP && extension_loaded('zlib')) {
			header('Content-Encoding: gzip');
			echo gzencode($cached_js, 6);
		} else {
			echo $cached_js;
		}
		exit;
	}

	$combined_js = "// ============================================\n";
	$combined_js .= "// Dynamic Combined Scripts\n";
	$combined_js .= "// Blocks: " . implode(', ', $block_list) . "\n";
	$combined_js .= "// Generated: " . date('Y-m-d H:i:s') . "\n";
	$combined_js .= "// ============================================\n\n";

	$plugin_dir = plugin_dir_path(__FILE__);
	$files_found = 0;

	foreach ($block_list as $block_name) {
		$block_folder = $plugin_dir . 'blocks/' . $block_name . '/';
		$js_file = $block_folder . 'view.js';

		if (file_exists($js_file)) {
			$combined_js .= "// ========== BLOCK: {$block_name} ==========\n";
			$combined_js .= file_get_contents($js_file);
			$combined_js .= "\n\n";
			$files_found++;
		}
	}



	// Минификация (только если не режим отладки)
	// if (defined('WP_DEBUG') && !WP_DEBUG) {

	// }

	// $combined_js = fv_minify_js($combined_js); // эта строка для минифицирования JS

	// Сохраняем в кеш
	set_transient($cache_key, $combined_js, FV_CACHE_TIME);


	// Логирование для мониторинга
	error_log(sprintf(
		'FV Dynamic JS: Blocks: %d | Files: %d | Size: %dKB | Cache: MISS',
		count($block_list),
		$files_found,
		strlen($combined_js) / 1024
	));

	header('Content-Type: application/javascript');
	header('Cache-Control: public, max-age=' . FV_CACHE_TIME);
	header('X-Cache: MISS');
	header('X-Files: ' . $files_found);

	if (FV_USE_GZIP && extension_loaded('zlib')) {
		header('Content-Encoding: gzip');
		echo gzencode($combined_js, 6);
	} else {
		echo $combined_js;
	}
	exit;
}

// ============================================
// ДИНАМИЧЕСКАЯ СБОРКА CSS
// ============================================

// 1. Регистрируем endpoint для получения собранного CSS
add_action('rest_api_init', function () {
	register_rest_route('fv/v1', '/dynamic-css', [
		'methods' => 'GET',
		'callback' => 'fv_get_dynamic_css',
		'permission_callback' => '__return_true',
	]);
});

// 2. Функция, которая собирает CSS на лету
function fv_get_dynamic_css()
{
	$blocks_hash = isset($_GET['blocks']) ? sanitize_text_field($_GET['blocks']) : '';

	if (empty($blocks_hash)) {
		return new WP_REST_Response('No blocks specified', 400);
	}

	$block_list = json_decode(base64_decode($blocks_hash), true);

	if (!is_array($block_list) || empty($block_list)) {
		return new WP_REST_Response('Invalid blocks list', 400);
	}

	// Сортируем для консистентности кеша
	sort($block_list);
	$cache_key = 'fv_dynamic_css_' . md5(implode('_', $block_list));

	// Проверяем кеш
	// $cached_css = get_transient($cache_key);
	// if ($cached_css !== false) {
	// 	header('Content-Type: text/css');
	// 	header('Cache-Control: public, max-age=' . FV_CACHE_TIME);
	// 	header('X-Cache: HIT');

	// 	if (FV_USE_GZIP && extension_loaded('zlib')) {
	// 		header('Content-Encoding: gzip');
	// 		echo gzencode($cached_css, 6);
	// 	} else {
	// 		echo $cached_css;
	// 	}
	// 	exit;
	// }

	$combined_css = "/* ============================================ */\n";
	$combined_css .= "/* Dynamic Combined Styles */\n";
	$combined_css .= "/* Blocks: " . implode(', ', $block_list) . " */\n";
	$combined_css .= "/* Generated: " . date('Y-m-d H:i:s') . " */\n";
	$combined_css .= "/* ============================================ */\n\n";

	$plugin_dir = plugin_dir_path(__FILE__);
	$files_found = 0;

	foreach ($block_list as $block_name) {
		$block_folder = $plugin_dir . 'blocks/' . $block_name . '/';
		$css_file = $block_folder . 'style.css';

		if (file_exists($css_file)) {
			$combined_css .= "/* ========== BLOCK: {$block_name} ========== */\n";
			$combined_css .= file_get_contents($css_file);
			$combined_css .= "\n\n";
			$files_found++;
		}
	}

	// Минификация CSS (только если не режим отладки)
	// if (defined('WP_DEBUG') && !WP_DEBUG) {

	// }

	// $combined_css = fv_minify_css($combined_css);

	// Сохраняем в кеш на 1 час
	set_transient($cache_key, $combined_css, FV_CACHE_TIME);

	// Логирование для мониторинга
	error_log(sprintf(
		'FV Dynamic CSS: Blocks: %d | Files: %d | Size: %dKB | Cache: MISS',
		count($block_list),
		$files_found,
		strlen($combined_css) / 1024
	));

	header('Content-Type: text/css');
	header('Cache-Control: public, max-age=' . FV_CACHE_TIME);
	header('X-Cache: MISS');
	header('X-Files: ' . $files_found);

	if (FV_USE_GZIP && extension_loaded('zlib')) {
		header('Content-Encoding: gzip');
		echo gzencode($combined_css, 6);
	} else {
		echo $combined_css;
	}
	exit;
}

// ============================================
// ВНЕДРЕНИЕ НА СТРАНИЦУ
// ============================================

// 3. Функция для регистрации скрипта-загрузчика JS
// function fv_register_dynamic_script()
// {
// 	wp_register_script(
// 		'fv-dynamic-script',
// 		'',
// 		[],
// 		null,
// 		true
// 	);

// 	add_action('wp_footer', 'fv_inject_dynamic_js_loader', 1);
// }
// add_action('wp_enqueue_scripts', 'fv_register_dynamic_script');

// 4. Функция для внедрения загрузчика JS
// function fv_inject_dynamic_js_loader()
// {
// 	$blocks_on_page = fv_get_blocks_on_page();

// 	if (empty($blocks_on_page)) {
// 		return;
// 	}

// 	$blocks_encoded = base64_encode(json_encode($blocks_on_page));
// 	$dynamic_js_url = home_url('/wp-json/fv/v1/dynamic-js?blocks=' . $blocks_encoded);

// 	echo '<script id="fv-dynamic-loader" data-blocks="' . esc_attr($blocks_encoded) . '" src="' . esc_url($dynamic_js_url) . '"></script>' . "\n";
// }

// 5. Функция для внедрения загрузчика CSS
function fv_inject_dynamic_css_loader()
{
	$blocks_on_page = fv_get_blocks_on_page();

	if (empty($blocks_on_page)) {
		return;
	}

	$blocks_encoded = base64_encode(json_encode($blocks_on_page));
	$dynamic_css_url = home_url('/wp-json/fv/v1/dynamic-css?blocks=' . $blocks_encoded);

	echo '<link id="fv-dynamic-css" rel="stylesheet" href="' . esc_url($dynamic_css_url) . '" />' . "\n";
}

// Добавляем CSS в head (до JS)
add_action('wp_head', 'fv_inject_dynamic_css_loader', 1);

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

// 6. Основная функция для получения блоков на странице
function fv_get_blocks_on_page()
{
	global $post;

	if (!is_singular() || !$post) {
		return [];
	}

	$block_names = [];

	// Метод 1: Получаем блоки из контента через parse_blocks
	$blocks = parse_blocks($post->post_content);
	fv_extract_block_names_recursive($blocks, $block_names);

	// Метод 2: Дополнительный поиск через HTML (для динамических блоков)
	$rendered_content = apply_filters('the_content', $post->post_content);

	// Ищем класс, где wp-block-fv-* является первым классом
	preg_match_all('/class="wp-block-fv-([a-zA-Z0-9\-_]+)(?:\s|"|$)/', $rendered_content, $matches);

	if (!empty($matches[1])) {
		foreach ($matches[1] as $block_name) {
			$block_names[$block_name] = true;
		}
	}

	return array_keys($block_names);
}

// 7. Рекурсивная функция для извлечения имен блоков
function fv_extract_block_names_recursive($blocks, &$names)
{
	foreach ($blocks as $block) {
		if (!empty($block['blockName'])) {
			if (strpos($block['blockName'], 'fv/') === 0) {
				$block_name = str_replace('fv/', '', $block['blockName']);
				$names[$block_name] = true;
			}
		}

		if (!empty($block['innerBlocks'])) {
			fv_extract_block_names_recursive($block['innerBlocks'], $names);
		}
	}
}

// ============================================
// ФУНКЦИИ МИНИФИКАЦИИ
// ============================================

/**
 * Простая минификация JavaScript
 * Удаляет комментарии и лишние пробелы
 */
// ============================================
// ФУНКЦИИ МИНИФИКАЦИИ (ИСПРАВЛЕНЫ)
// ============================================

/**
 * Простая минификация JavaScript
 * Удаляет комментарии и лишние пробелы
 */
function fv_minify_js($js)
{
	if (empty($js)) {
		return '';
	}

	// Удаляем многострочные комментарии
	$js = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $js);

	// Удаляем однострочные комментарии (кроме тех, что в строках)
	$js = preg_replace('~//[^\n\r]*~', '', $js);

	// Удаляем лишние пробелы и переносы строк
	$js = preg_replace('/\s+/', ' ', $js);
	$js = preg_replace('/\s*([{}();,:])\s*/', '$1', $js);

	// Удаляем пробелы вокруг операторов (ИСПРАВЛЕНО: экранируем спецсимволы)
	$js = preg_replace('/\s*([=!<>+*\/%&|^])\s*/', '$1', $js);

	return trim($js);
}

/**
 * Простая минификация CSS
 * Удаляет комментарии и лишние пробелы
 */
function fv_minify_css($css)
{
	if (empty($css)) {
		return '';
	}

	// Удаляем многострочные комментарии
	$css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);

	// Удаляем лишние пробелы и переносы строк
	$css = preg_replace('/\s+/', ' ', $css);
	$css = preg_replace('/\s*([{}:;,])\s*/', '$1', $css);

	// Удаляем последний ; в блоках
	$css = preg_replace('/;}/', '}', $css);

	// Удаляем пробелы вокруг селекторов
	$css = preg_replace('/\s*,\s*/', ',', $css);

	return trim($css);
}

// ============================================
// ОЧИСТКА КЕША ПРИ ОБНОВЛЕНИИ
// ============================================

/**
 * Очищает все transient кеши при обновлении поста
 */
add_action('save_post', function ($post_id) {
	// Не очищаем при автосохранении
	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}

	// Очищаем все transient кеши с префиксом fv_dynamic_
	global $wpdb;
	$wpdb->query(
		"DELETE FROM {$wpdb->options} 
		 WHERE option_name LIKE '_transient_fv_dynamic_%' 
		 OR option_name LIKE '_transient_timeout_fv_dynamic_%'"
	);

	error_log('FV Dynamic: Cache cleared for post ID: ' . $post_id);
}, 10, 1);

/**
 * Очищает кеш при обновлении или активации плагина
 */
register_activation_hook(__FILE__, function () {
	global $wpdb;
	$wpdb->query(
		"DELETE FROM {$wpdb->options} 
		 WHERE option_name LIKE '_transient_fv_dynamic_%' 
		 OR option_name LIKE '_transient_timeout_fv_dynamic_%'"
	);
});
