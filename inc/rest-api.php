<?php

function register_programs_filter_endpoint()
{
	register_rest_route('programs-filter/v1', '/posts', array(
		'methods' => 'GET',
		'callback' => 'get_filtered_programs',
		'permission_callback' => '__return_true',
		'args' => array(
			'post_types' => array(
				'required' => false,
				'type' => 'array',
				'sanitize_callback' => 'sanitize_text_field',
				'description' => 'Типы постов для фильтрации'
			),
			'search' => array(
				'required' => false,
				'type' => 'string',
				'sanitize_callback' => 'sanitize_text_field',
				'description' => 'Поисковый запрос'
			),
			'ages' => array(
				'required' => false,
				'type' => 'array',
				'description' => 'Фильтр по возрастам'
			),
			'city' => array(
				'required' => false,
				'type' => 'array',
				'description' => 'Фильтр по городу'
			),
			'place' => array(
				'required' => false,
				'type' => 'array',
				'description' => 'Фильтр по местам проведения'
			),
			'season' => array(
				'required' => false,
				'type' => 'array',
				'description' => 'Фильтр по сезонам'
			),
			'days' => array(
				'required' => false,
				'type' => 'array',
				'description' => 'Фильтр по длительности'
			),
			'shift' => array(
				'required' => false,
				'type' => 'array',
				'description' => 'Фильтр по сменам'
			),
			'certificate' => array(
				'required' => false,
				'type' => 'array',
				'description' => 'Фильтр по сертификатам'
			)
		)
	));
}
add_action('rest_api_init', 'register_programs_filter_endpoint');

function get_all_custom_posts($request)
{
	// Параметры для каждого типа записей
	$filter = $request->get_param('filter');
	// $sales = $request->get_param('sales');
	$sales = 'test';
	$post_types = array();

	if ($filter === 'cources') {
		$post_types = ['skills-courses', 'psychologist'];
	} else if ($filter === 'camp') {
		$post_types = ['career-camp', 'skills-academy', 'art-community', 'travel-by-city'];
	} else if ($filter === 'merch') {
		$post_types = ['merch-camp'];
	} else {
		$post_types = ['proficiency-testing'];
	}

	$response = array();

	// Получаем данные для каждого типа записей
	foreach ($post_types as $type) {
		$args = array(
			'post_type' => $type,
			'posts_per_page' => 50,
			'post_status' => 'publish',
			'orderby'        => 'menu_order', // сортировка по порядку из админки
			'order'          => 'ASC', // по возрастанию (как в плагине)
		);

		$posts = get_posts($args);

		// Добавляем данные в ответ

		$response[$type] = array_map(function ($post) use ($filter, $sales) {
			$post_id = $post->ID;

			// Ищем блок fv/item-card среди блоков контента
			$blocks = parse_blocks($post->post_content);
			$card_block = '';

			if ($filter === 'cources') {
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills'
				);
			} elseif ($filter === 'camp') {
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card'
				);
			} elseif ($filter === 'merch') {
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-merch'
				);
			} else {
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills'
				);
			}

			if (empty($card_block)) {
				return null;
			}


			
			// Получаем атрибуты первого найденного блока
			$attrs = current($card_block)['attrs'];
			$inActiveOld = isset($attrs['inActiveOld']) && $attrs['inActiveOld'] && is_user_logged_in();
			$inActive = $sales === 'access' || $attrs['inActive'] || $inActiveOld;

			if (!$inActive) {
				return null;
			}

			$bgImage = '';
			$rendermerch = '';
			if ($filter === 'merch') {
				$bgImage = isset($attrs['gallery']) ? $attrs['gallery'] : '';
				$rendermerch = rendermerch($bgImage, clearText($attrs['title']), $attrs['price'], $post_id);
			}

			$update_selected_place = [];
			// $filter === 'cources' ? formatSchedule($attrs['selectedShift'] ?? '', $attrs['selectedTime'] ?? '') : (isset($attrs['newPlace']) ? $attrs['newPlace'] : (!empty($attrs['place']) ? $attrs['place'] : '')),

			if ($filter === 'cources') {
				$update_selected_place = formatSchedule($attrs['selectedShift'] ?? '', $attrs['selectedTime'] ?? '');
			} else if ($filter === 'camp') {
				// $update_selected_place = (isset($attrs['newPlace']) ? $attrs['newPlace'] : (isset($attrs['place']) ? $attrs['place'] : 'Не указан PLACE'));
				$update_selected_place = ($attrs['place']    ?? null) ?: 'Не указан PLACE';
			} else {
				$update_selected_place = [];
			}

			$data = [
				'id' => $post_id,
				'content' => [
					'postTypeName' => isset($attrs['postTypeName']) ? $attrs['postTypeName'] : '',
					'dateRange' => $filter === 'cources' ? 'Старт — ' . formatDateRange($attrs['startDate']) : ($attrs['dateRange'] ?? ''),
					'selectedAges' => formatAgeRange($attrs['selectedAges'] ?? []),
					'daysCount' => $attrs['daysCount'] ?? '',
					'price' => !empty($attrs['price']) ? clearText($attrs['price']) : '',
					'rendered' => current($card_block)['innerHTML'],
					'rendermerch' => $rendermerch,
				],
				'title' => !empty($attrs['newTitle']) ? clearText($attrs['newTitle']) : clearText($attrs['title']),
				'search' => clearText($attrs['title']) . ' ' . clearText(isset($attrs['postTypeName']) ? $attrs['postTypeName'] : ''),
				'inPlace' => $attrs['inPlace'] ?? false,
				'inCard' => $filter === 'cources' && $attrs['postTypeName'] === 'Курсы навыков',
				'placeTitle' => $attrs['placeTitle'] ?? '',
				'type' => $post->post_type,
				'selected_ages' => $attrs['selectedAges'] ?? [],
				'selected_city' => $attrs['city'] ?? [],
				'selected_place' => $update_selected_place,
				'selected_season' => $filter === 'camp' ? get_season_from_date($attrs['startDate'] ?? '') : '',
				'selected_days' => $filter === 'camp' ? diffDays($attrs['startDate'] ?? '', $attrs['endDate'] ?? '') : '',
				'selected_shift' => $filter === 'camp' ? ($attrs['selectedShift'] ?? '') : '',
				'selected_certificate' => $filter === 'camp' ? (isset($attrs['inSertific']) ? 'Да' : 'Нет') : '',
				'titleCount' => $attrs['titleCount'] ?? '',
				'filter' => $filter,
				'sales' => $sales,
				'bgImage' => $bgImage,
			];

			return $data;
		}, $posts);

		// Удаляем null значения из массива
		$response[$type] = array_values(array_filter($response[$type]));
	}

	return rest_ensure_response($response);
}

// Регистрируем кастомный маршрут
add_action('rest_api_init', function () {
	register_rest_route('custom/v1', '/all-posts', array(
		'methods' => 'GET',
		'callback' => 'get_all_custom_posts',
		'permission_callback' => '__return_true',
	));
});

/**
 * Получает и фильтрует программы по заданным параметрам
 *
 * @since 1.0.0
 * @param WP_REST_Request $request Объект запроса REST API
 * @return WP_REST_Response|WP_Error Отфильтрованные программы или ошибка
 */

function get_filtered_programs($request)
{

	try {

		$post_types = $request->get_param('post_types');
		$valid_post_types = [];
		if (is_string($post_types)) {
			$valid_post_types = array_filter(array_map('trim', explode(',', $post_types)));
		}

		$filter = $request->get_param('filter');
		// $sales = $request->get_param('sales');
		$sales = 'test';

		if ($filter === 'merch') {
			$valid_post_types = ['merch-camp'];
		}

		$args = array(
			'post_type' => $valid_post_types,
			'posts_per_page' => -1,
			'post_status' => 'publish',
			'no_found_rows' => true,
			'fields' => 'ids', // Получаем только ID постов
			'orderby'        => 'menu_order', // сортировка по порядку из админки
			'order'          => 'ASC', // по возрастанию (как в плагине)
		);

		$query = new WP_Query($args);
		$posts = [];

		if (!$query->have_posts()) {
			return;
		}

		while ($query->have_posts()) {
			$query->the_post();
			$post_id = get_the_ID();
			// Ищем блок fv/item-card среди блоков контента
			$blocks = parse_blocks(get_post_field('post_content', $post_id));
			$card_block = '';

			if ($filter === 'cources') {
				// Ищем блок fv/item-card-skills среди блоков контента
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills'
				);
				// Получаем атрибуты первого найденного блока
				$attrs = current($card_block)['attrs'];
				$inActiveOld = isset($attrs['inActiveOld']) && $attrs['inActiveOld'] && is_user_logged_in();
				$inActive = $sales === 'access' || $attrs['inActive'] || $inActiveOld;
				$selected_season = isset($attrs['selectedShift']) ? $attrs['selectedShift'] : '';
				$selectedTime = isset($attrs['selectedTime']) ? $attrs['selectedTime'] : '';
				$daysCount = isset($attrs['titleCount']) ? $attrs['titleCount'] : '';
				$selected_place = formatSchedule($selected_season, $selectedTime);
				$selected_size = '';
				$dateRange = 'Старт — ' . formatDateRange($attrs['startDate']);
				$startDate = isset($attrs['startDate']) ? $attrs['startDate'] : '';
				$price =  isset($attrs['price']) ? clearText($attrs['price']) : '';
				$titleCount =  isset($attrs['titleCount']) ? $attrs['titleCount'] : '';
				$placeTitle =  isset($attrs['placeTitle']) ? $attrs['placeTitle'] : '';
				$inPlace =  isset($attrs['inPlace']) ? $attrs['inPlace'] : '';
				$inCard =  $attrs['postTypeName'] === 'Курсы навыков';
				$selected_days = '';
				$selected_shift = '';
				$selected_certificate = '';
				$innerHTML = current($card_block)['innerHTML'];
			} else if ($filter === 'camp') {
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card'
				);
				// Получаем атрибуты первого найденного блока
				$attrs = current($card_block)['attrs'];
				$inActiveOld = isset($attrs['inActiveOld']) && $attrs['inActiveOld'] && is_user_logged_in();
				$inActive = $sales === 'access' || $attrs['inActive'] || $inActiveOld;
				$selected_place = $attrs['place'];
				$selected_city = $attrs['city'] ?? '';
				$selected_size = '';
				$dateRange =  isset($attrs['dateRange']) ? $attrs['dateRange'] : '';
				$startDate = isset($attrs['startDate']) ? $attrs['startDate'] : '';
				$price =  isset($attrs['price']) ? clearText($attrs['price']) : '';
				$placeTitle =  '';
				$titleCount =  '';
				$inPlace =  isset($attrs['inPlace']) ? $attrs['inPlace'] : '';
				$inCard =  false;
				$daysCount =  isset($attrs['daysCount']) ? $attrs['daysCount'] : '';
				$selected_season = isset($attrs['startDate']) ? get_season_from_date($attrs['startDate']) : '';
				$selected_days = isset($attrs['startDate']) ? diffDays($attrs['startDate'], $attrs['endDate']) : '';
				$selected_shift = isset($attrs['selectedShift']) ? $attrs['selectedShift'] : '';
				$selected_certificate = isset($attrs['inSertific']) ? 'Да' : 'Нет';
				$innerHTML = current($card_block)['innerHTML'];

				if ($attrs['postTypeName'] === "Узнай город") {
					$selected_shift = '';
				} else {
					$selected_shift = isset($attrs['selectedShift']) ? $attrs['selectedShift'] : '';
				}
			} else if ($filter === 'merch') {
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-merch'
				);
				// Получаем атрибуты первого найденного блока
				$attrs = current($card_block)['attrs'];
				$inActiveOld = isset($attrs['inActiveOld']) && $attrs['inActiveOld'] && is_user_logged_in();
				$inActive = $sales === 'access' || $attrs['inActive'] || $inActiveOld;
				$selected_place = $attrs['place'] ?: '';
				$selected_size = isset($attrs['selectedSize']) ? $attrs['selectedSize'] : '';
				$dateRange =  isset($attrs['dateRange']) ? $attrs['dateRange'] : '';
				$startDate = isset($attrs['startDate']) ? $attrs['startDate'] : '';
				$price =  isset($attrs['price']) ? clearText($attrs['price']) : '';
				$placeTitle =  '';
				$titleCount =  '';
				$inPlace =  isset($attrs['inPlace']) ? $attrs['inPlace'] : '';
				$inCard =  false;
				$daysCount =  isset($attrs['daysCount']) ? $attrs['daysCount'] : '';
				$selected_season = isset($attrs['startDate']) ? get_season_from_date($attrs['startDate']) : '';
				$selected_days = isset($attrs['startDate']) ? diffDays($attrs['startDate'], $attrs['endDate']) : '';
				$selected_shift = isset($attrs['selectedShift']) ? $attrs['selectedShift'] : '';
				$selected_certificate = isset($attrs['inSertific']) ? 'Да' : 'Нет';
				$innerHTML = current($card_block)['innerHTML'];

				if (isset($attrs['postTypeName']) && $attrs['postTypeName'] === "Узнай город") {
					$selected_shift = '';
				} else {
					$selected_shift = isset($attrs['selectedShift']) ? $attrs['selectedShift'] : '';
				}
			} else {
				$posts = [];
			}

			// error_log(print_r(clearText($attrs['title']) . ' - ' . $attrs['inActiveOld'], true));
			// error_log(print_r(clearText($attrs['title']) . ' - ' . is_user_logged_in(), true));

			if ($inActive) {
				$posts[] = [
					'id' => $post_id,
					'title' => !empty($attrs['newTitle']) ? clearText($attrs['newTitle']) : clearText($attrs['title']),
					'search' => clearText($attrs['title']) . ' ' . clearText(isset($attrs['postTypeName']) ? $attrs['postTypeName'] : ''),
					'inPlace' => $inPlace,
					'inCard' => $inCard,
					'placeTitle' => $placeTitle,
					'type' => get_post_type(),
					'content' => [
						'postTypeName' => isset($attrs['postTypeName']) ? $attrs['postTypeName'] : '',
						'dateRange' => $dateRange,
						'selectedAges' => isset($attrs['selectedAges']) && formatAgeRange($attrs['selectedAges']),
						'daysCount' => $daysCount,
						'price' => $price,
					],
					'modal' => $innerHTML,
					'startDate' => $startDate,
					'selected_ages' => $attrs['selectedAges'] ?? [],
					'selected_place' => $selected_place,
					'selected_city' => $selected_city,
					'selected_size' => $selected_size,
					'selected_season' => $selected_season,
					'selected_days' => $selected_days,
					'selected_shift' => $selected_shift,
					'selected_certificate' => $selected_certificate,
					'titleCount' => $titleCount,
					'filter' => $filter
				];
			}
		}

		wp_reset_postdata();

		$ages = $request->get_param('ages');

		error_log(print_r($request->get_param('place'), true));
		error_log(print_r($posts, true));

		// Применяем фильтр по возрастам
		if ($request->get_param('ages')) {
			$posts = filter_posts_by_ages($posts, $request->get_param('ages'));
		}
		if ($request->get_param('city')) {
			$posts = filter_posts_by_city($posts, $request->get_param('city'));
		}
		if ($request->get_param('size')) {
			$posts = filter_posts_by_size($posts, $request->get_param('size'));
		}
		if ($request->get_param('place')) {
			$posts = filter_posts_by_places($posts, $request->get_param('place'));
		}
		if ($request->get_param('season')) {
			$posts = filter_posts_by_season($posts, $request->get_param('season'));
		}
		if ($request->get_param('days')) {
			$posts = filter_posts_by_days($posts, $request->get_param('days'));
		}
		if ($request->get_param('shift')) {
			$posts = filter_posts_by_shift($posts, $request->get_param('shift'));
		}
		if ($request->get_param('certificate')) {
			$posts = filter_posts_by_certificate($posts, $request->get_param('certificate'));
		}
		if ($request->get_param('search')) {
			$posts = filter_posts_by_search($posts, $request->get_param('search'));
		}

		// Определяем порядок сортировки
		$order = [
			'career-camp',
			'skills-academy',
			'art-community',
			'travel-by-city',
			'skills-courses',
			'psychologist',
			'proficiency-testing'
		];
		usort($posts, function ($a, $b) use ($order, $attrs) {
			// Сначала сортируем по типу
			$indexA = array_search($a['type'], $order);
			$indexB = array_search($b['type'], $order);
			if ($indexA != $indexB) {
				return $indexA - $indexB;
			}

			// // Если типы совпадают, сортируем по inPlace
			// if ($a['inPlace'] != $b['inPlace']) {
			// 	return ($a['inPlace'] > $b['inPlace']) ? -1 : 1;
			// }

			// // Если inPlace совпадают, сортируем по возрасту
			// $ageA = isset($a['selected_ages']) ? $a['selected_ages'][0] : '';
			// $ageB = isset($b['selected_ages']) ? $b['selected_ages'][0] : '';
			// return $ageA - $ageB;
		});

		// if ($filter !== 'merch') {

		// 	$order = [
		// 		'career-camp',
		// 		'skills-academy',
		// 		'art-community',
		// 		'travel-by-city',
		// 		'skills-courses',
		// 		'psychologist',
		// 		'proficiency-testing'
		// 	];
		// 	if (isset($ages) && $ages[0] !== 'all') {
		// 		// Функция для сравнения элементов массива
		// 		usort($posts, function ($a, $b) use ($order, $attrs) {
		// 			// Сначала сортируем по типу
		// 			$indexA = array_search($a['type'], $order);
		// 			$indexB = array_search($b['type'], $order);
		// 			if ($indexA != $indexB) {
		// 				return $indexA - $indexB;
		// 			}

		// 			// Если типы совпадают, сортируем по inPlace
		// 			if ($a['inPlace'] != $b['inPlace']) {
		// 				return ($a['inPlace'] > $b['inPlace']) ? -1 : 1;
		// 			}

		// 			// Если inPlace совпадают, сортируем по возрасту
		// 			$ageA = isset($a['selected_ages']) ? $a['selected_ages'][0] : '';
		// 			$ageB = isset($b['selected_ages']) ? $b['selected_ages'][0] : '';
		// 			return $ageA - $ageB;
		// 		});
		// 	} else {
		// 		usort($posts, function ($a, $b) use ($order) {
		// 			// Сначала сортируем по типу
		// 			$indexA = array_search($a['type'], $order);
		// 			$indexB = array_search($b['type'], $order);
		// 			if ($indexA != $indexB) {
		// 				return $indexA - $indexB;
		// 			}

		// 			// Если типы совпадают, сортируем по inPlace
		// 			if ($a['inPlace'] != $b['inPlace']) {
		// 				return ($a['inPlace'] > $b['inPlace']) ? -1 : 1;
		// 			}

		// 			// Если inPlace совпадают, сортируем по startDate
		// 			$startDateA = strtotime($a['startDate']);
		// 			$startDateB = strtotime($b['startDate']);
		// 			return $startDateA - $startDateB;
		// 		});
		// 	}
		// }

		$ids = array_column($posts, 'id');

		// error_log(print_r($ids, true));
		// error_log(print_r($inPlaces, true));



		return new WP_REST_Response($ids, 200);
	} catch (Exception $e) {
		return new WP_Error(
			'filter_error',
			$e->getMessage(),
			array('status' => 500)
		);
	}
}

/**
 * Очищает кэш фильтра программ при обновлении постов
 * 
 * @param int $post_id ID поста
 * @param WP_Post $post Объект поста
 */
function clear_programs_filter_cache($post_id, $post)
{
	if (in_array($post->post_type, ['career-camp', 'skills-academy', 'art-community', 'travel-by-city'])) {
		global $wpdb;
		$wpdb->query("DELETE FROM $wpdb->options WHERE option_name LIKE '_transient_programs_filter_%'");
	}
}

add_action('save_post', 'clear_programs_filter_cache', 10, 2);
add_action('delete_post', 'clear_programs_filter_cache', 10, 2);

/**
 * Фильтрует посты по возрастам
 *
 * @since 1.0.0
 * @param array $posts Массив постов для фильтрации
 * @param array|string $ages Возраста для фильтрации
 * @return array Отфильтрованный массив постов
 */
function filter_posts_by_ages($posts, $ages)
{
	if (empty($ages)) {
		return $posts;
	}

	$valid_ages = is_string($ages)
		? array_filter(array_map('trim', explode(',', $ages)))
		: $ages;

	if (empty($valid_ages)) {
		return $posts;
	}

	if ($valid_ages[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_ages) {
		return array_intersect($valid_ages, $post['selected_ages']);
	}));
}

/**
 * Фильтрует посты по SIZE
 *
 * @since 1.0.0
 * @param array $posts Массив постов для фильтрации
 * @param array|string $value Места для фильтрации
 * @return array Отфильтрованный массив постов
 */
function filter_posts_by_size($posts, $size)
{
	if (empty($size)) {
		return $posts;
	}

	$valid_size = is_string($size)
		? array_filter(array_map('trim', explode(',', $size)))
		: $size;

	if (empty($valid_size)) {
		return $posts;
	}

	if ($valid_size[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_size) {
		return array_intersect($valid_size, $post['selected_size']);
	}));
}

function filter_posts_by_city($posts, $value)
{
	if (empty($value)) {
		return $posts;
	}

	$valid_value = is_string($value)
		? array_filter(array_map('trim', explode(',', $value)))
		: $value;

	if (empty($valid_value)) {
		return $posts;
	}

	if ($valid_value[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_value) {
		return in_array($post['selected_city'], $valid_value);
	}));
}

function filter_posts_by_places($posts, $value)
{

	if (empty($value)) {
		return $posts;
	}

	$value = array_map(function ($item) {
		return str_replace('+', ' ', $item);
	}, $value);

	$valid_value = is_string($value)
		? array_filter(array_map('trim', explode(',', $value)))
		: $value;

	if (empty($valid_value)) {
		return $posts;
	}

	if ($valid_value[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_value) {
		return in_array($post['selected_place'], $valid_value);
	}));
}

function filter_posts_by_season($posts, $value)
{
	if (empty($value)) {
		return $posts;
	}

	$valid_value = is_string($value)
		? array_filter(array_map('trim', explode(',', $value)))
		: $value;

	if (empty($valid_value)) {
		return $posts;
	}

	if ($valid_value[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_value) {
		return in_array($post['selected_season'], $valid_value);
	}));
}

function filter_posts_by_days($posts, $value)
{
	if (empty($value)) {
		return $posts;
	}

	$valid_value = is_string($value)
		? array_filter(array_map('trim', explode(',', $value)))
		: $value;

	if (empty($valid_value)) {
		return $posts;
	}

	if ($valid_value[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_value) {
		return in_array($post['selected_days'], $valid_value);
	}));
}

function filter_posts_by_shift($posts, $value)
{
	if (empty($value)) {
		return $posts;
	}

	$value = array_map(function ($item) {
		return str_replace('+', ' ', $item);
	}, $value);

	$valid_value = is_string($value)
		? array_filter(array_map('trim', explode(',', $value)))
		: $value;

	if (empty($valid_value)) {
		return $posts;
	}

	if ($valid_value[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_value) {
		return in_array($post['selected_shift'], $valid_value);
	}));
}

function filter_posts_by_certificate($posts, $value)
{
	if (empty($value)) {
		return $posts;
	}

	$valid_value = is_string($value)
		? array_filter(array_map('trim', explode(',', $value)))
		: $value;

	if (empty($valid_value)) {
		return $posts;
	}

	if ($valid_value[0] === 'all') {
		return $posts;
	}

	return array_values(array_filter($posts, function ($post) use ($valid_value) {
		return in_array($post['selected_certificate'], $valid_value);
	}));
}

function filter_posts_by_search($posts, $search)
{
	if (empty($search)) {
		return $posts;
	}

	$search = mb_strtolower(trim($search));

	return array_values(array_filter($posts, function ($post) use ($search) {
		$haystack = mb_strtolower($post['search']);
		return str_contains($haystack, $search);
	}));
}

// Регистрируем поле с возрастами для REST API

// Для поиска
add_action('rest_api_init', function () {
	register_rest_field(
		['career-camp', 'skills-academy', 'art-community', 'travel-by-city'], // укажите все нужные типы постов
		'selected_search',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						$title = isset($block['attrs']['title']) ? $block['attrs']['title'] : '';
						$postTypeName = isset($block['attrs']['postTypeName']) ? $block['attrs']['postTypeName'] : '';
						return clearText($title) . ' ' . clearText($postTypeName);
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'Для поиска',
				'type'        => 'string'
			),
		)
	);
});
// Массив дат
// selected_ages
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'selected_ages',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['selectedAges']) ? $block['attrs']['selectedAges'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'Возрасты для карточки',
				'type'        => 'array',
				'items'       => array(
					'type' => 'number'
				)
			),
		)
	);
});
// selected_city
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp'), // укажите все нужные типы постов
		'selected_city',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['city']) ? $block['attrs']['city'] : '';
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Выбор города',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// selected_place
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'selected_place',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['place']) ? $block['attrs']['place'] : 'Золотая Долина';
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Выбор площадки',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// selected_season
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'),
		'selected_season',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						if (isset($block['attrs']['startDate'])) {
							return get_season_from_date($block['attrs']['startDate']);
						}
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Сезон',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// selected_days
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'),
		'selected_days',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						if (isset($block['attrs']['startDate']) && isset($block['attrs']['endDate'])) {
							return diffDays($block['attrs']['startDate'], $block['attrs']['endDate']);
						}
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Дней в смене',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// selected_shift
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community'),
		'selected_shift',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						if (isset($block['attrs']['selectedShift'])) {
							return $block['attrs']['selectedShift'];
						}
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Смена',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// selected_certificate
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'),
		'selected_certificate',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['subdescription']) ? 'Да' : 'Нет';
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Возможность использовать сертификат',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// postTypeName
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'postTypeName',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['postTypeName']) ? $block['attrs']['postTypeName'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'Post Type Name',
				'type'        => 'string',
			),
		)
	);
});
// dateRange
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'dateRange',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['dateRange']) ? $block['attrs']['dateRange'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'dateRange Name',
				'type'        => 'string',
			),
		)
	);
});
// selectedAges
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'selectedAges',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['selectedAges']) ? formatAgeRange($block['attrs']['selectedAges']) : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'selectedAges Name',
				'type'        => 'string',
			),
		)
	);
});
// daysCount
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'daysCount',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['daysCount']) ? $block['attrs']['daysCount'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'daysCount Name',
				'type'        => 'string',
			),
		)
	);
});
// price
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'price',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['price']) ? $block['attrs']['price'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'price Name',
				'type'        => 'string',
			),
		)
	);
});
// inPlace
add_action('rest_api_init', function () {
	register_rest_field(
		array('career-camp', 'skills-academy', 'art-community', 'travel-by-city'), // укажите все нужные типы постов
		'inPlace',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card') {
						return isset($block['attrs']['inPlace']) ? $block['attrs']['inPlace'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'inPlace Name',
				'type'        => 'string',
			),
		)
	);
});

// FOR COURCES
// selected_shift
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'),
		'selected_shift',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						if (isset($block['attrs']['selectedShift'])) {
							return $block['attrs']['selectedShift'];
						}
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Смена',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// inPlace
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'), // укажите все нужные типы постов
		'inPlace',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['inPlace']) ? $block['attrs']['inPlace'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'inPlace Name',
				'type'        => 'string',
			),
		)
	);
});
// price
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'), // укажите все нужные типы постов
		'price',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['price']) ? $block['attrs']['price'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'price Name',
				'type'        => 'string',
			),
		)
	);
});
// titleCount
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'), // укажите все нужные типы постов
		'titleCount',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['titleCount']) ? $block['attrs']['titleCount'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'titleCount Name',
				'type'        => 'string',
			),
		)
	);
});
// selectedAges
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'), // укажите все нужные типы постов
		'selectedAges',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['selectedAges']) ? formatAgeRange($block['attrs']['selectedAges']) : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'selectedAges Name',
				'type'        => 'string',
			),
		)
	);
});
// postTypeName
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'), // укажите все нужные типы постов
		'postTypeName',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['postTypeName']) ? $block['attrs']['postTypeName'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'Post Type Name',
				'type'        => 'string',
			),
		)
	);
});
// selected_season
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'),
		'selected_season',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						if (isset($block['attrs']['selectedShift'])) {
							return isset($block['attrs']['selectedShift']) ? $block['attrs']['selectedShift'] : [];
						}
					}
				}

				return [];
			},
			'schema' => array(
				'description' => 'Сезон',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// selected_place
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'), // укажите все нужные типы постов
		'selected_place',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills' && $block['attrs']['inActive']
				);
				$attrs = current($card_block)['attrs'];
				$selected_season = isset($attrs['selectedShift']) ? $attrs['selectedShift'] : '';
				$selectedTime = isset($attrs['selectedTime']) ? $attrs['selectedTime'] : '';
				$selected_place = formatSchedule($selected_season, $selectedTime);

				return $selected_place;
			},
			'schema' => array(
				'description' => 'Выбор площадки',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// dateRange
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses'), // укажите все нужные типы постов
		'dateRange',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills' && $block['attrs']['inActive']
				);
				$attrs = current($card_block)['attrs'];
				$dateRange = 'Старт — ' . formatDateRange($attrs['startDate']);
				return $dateRange;
			},
			'schema' => array(
				'description' => 'dateRange Name',
				'type'        => 'string',
			),
		)
	);
});
// placeTitle
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'placeTitle',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills' && $block['attrs']['inActive']
				);
				$attrs = current($card_block)['attrs'];
				$placeTitle = isset($attrs['placeTitle']) ? $attrs['placeTitle'] : '';
				return $placeTitle;
			},
			'schema' => array(
				'description' => 'placeTitle Name',
				'type'        => 'string',
			),
		)
	);
});
// inCard
add_action('rest_api_init', function () {
	register_rest_field(
		array('skills-courses', 'psychologist'), // укажите все нужные типы постов
		'inCard',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills' && $block['attrs']['inActive']
				);
				$attrs = current($card_block)['attrs'];
				$inType = isset($attrs['postTypeName']) ? $attrs['postTypeName'] : '';
				$inCard = $inType === 'Курсы навыков';
				return $inCard;
			},
			'schema' => array(
				'description' => 'inCard Name',
				'type'        => 'string',
			),
		)
	);
});

// FOR psychologist
// selected_shift
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'),
		'selected_shift',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						if (isset($block['attrs']['selectedShift'])) {
							return $block['attrs']['selectedShift'];
						}
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Смена',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// inPlace
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'inPlace',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['inPlace']) ? $block['attrs']['inPlace'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'inPlace Name',
				'type'        => 'string',
			),
		)
	);
});
// price
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'price',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['price']) ? $block['attrs']['price'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'price Name',
				'type'        => 'string',
			),
		)
	);
});
// titleCount
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'titleCount',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['titleCount']) ? $block['attrs']['titleCount'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'titleCount Name',
				'type'        => 'string',
			),
		)
	);
});
// selectedAges
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'selectedAges',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['selectedAges']) ? formatAgeRange($block['attrs']['selectedAges']) : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'selectedAges Name',
				'type'        => 'string',
			),
		)
	);
});
// postTypeName
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'postTypeName',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				// Ищем блок карточки и получаем выбранные возрасты
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						return isset($block['attrs']['postTypeName']) ? $block['attrs']['postTypeName'] : [];
					}
				}
				return array();
			},
			'schema' => array(
				'description' => 'Post Type Name',
				'type'        => 'string',
			),
		)
	);
});
// selected_season
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'),
		'selected_season',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));

				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-card-skills') {
						if (isset($block['attrs']['selectedShift'])) {
							return isset($block['attrs']['selectedShift']) ? $block['attrs']['selectedShift'] : [];
						}
					}
				}

				return [];
			},
			'schema' => array(
				'description' => 'Сезон',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// selected_place
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'selected_place',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills' && $block['attrs']['inActive']
				);
				$attrs = current($card_block)['attrs'];
				$selected_season = isset($attrs['selectedShift']) ? $attrs['selectedShift'] : '';
				$selectedTime = isset($attrs['selectedTime']) ? $attrs['selectedTime'] : '';
				$selected_place = formatSchedule($selected_season, $selectedTime);

				return $selected_place;
			},
			'schema' => array(
				'description' => 'Выбор площадки',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// dateRange
add_action('rest_api_init', function () {
	register_rest_field(
		array('psychologist'), // укажите все нужные типы постов
		'dateRange',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				$card_block = array_filter(
					$blocks,
					fn($block) =>
					$block['blockName'] === 'fv/item-card-skills' && $block['attrs']['inActive']
				);
				$attrs = current($card_block)['attrs'];
				$dateRange = 'Старт — ' . formatDateRange($attrs['startDate']);

				return $dateRange;
			},
			'schema' => array(
				'description' => 'dateRange Name',
				'type'        => 'string',
			),
		)
	);
});

// FOR merch
// selected_size
add_action('rest_api_init', function () {
	register_rest_field(
		array('merch-camp'),
		'selected_size',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-merch') {
						if (isset($block['attrs']['selectedSize'])) {
							return $block['attrs']['selectedSize'];
						}
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Merch',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});
// Thumbnail
add_action('rest_api_init', function () {
	register_rest_field(
		array('merch-camp'),
		'merch_image',
		array(
			'get_callback' => function ($post) {
				// Получаем содержимое блока
				$blocks = parse_blocks(get_post_field('post_content', $post['id']));
				foreach ($blocks as $block) {
					if ($block['blockName'] === 'fv/item-merch') {
						if (isset($block['attrs']['desktopBackground'])) {
							return $block['attrs']['desktopBackground'];
						}
					}
				}
				return [];
			},
			'schema' => array(
				'description' => 'Merch',
				'type'        => 'array',
				'items'       => ['type' => 'string']
			),
		)
	);
});

/**
 * Определяет сезон по дате с учётом местных правил начала сезонов
 *
 * @since 1.0.0
 * @param string $date Дата в формате Y-m-d
 * @return string Название сезона (Зима, Весна, Лето, Осень)
 */
function get_season_from_date($date)
{
	// Преобразуем входную дату в timestamp
	$timestamp = strtotime($date);

	// Получаем год для корректного определения сезонов
	$year = date('Y', $timestamp);

	// Определяем даты начала сезонов
	$winter_start = strtotime("{$year}-12-01") - 3 * 24 * 60 * 60; // Зима начинается 1 декабря
	$spring_start = strtotime("{$year}-03-01") - 3 * 24 * 60 * 60; // Весна начинается 1 марта
	$summer_start = strtotime("{$year}-06-01") - 3 * 24 * 60 * 60; // Лето начинается 1 июня
	$autumn_start = strtotime("{$year}-09-01") - 3 * 24 * 60 * 60; // Осень начинается 1 сентября

	// Если дата раньше 1 марта текущего года или после 1 декабря предыдущего года
	if ($timestamp >= $winter_start || $timestamp < $spring_start) {
		return 'Зима';
	}

	// Если дата между 1 марта и 1 июня
	if ($timestamp >= $spring_start && $timestamp < $summer_start) {
		return 'Весна';
	}

	// Если дата между 1 июня и 1 сентября
	if ($timestamp >= $summer_start && $timestamp < $autumn_start) {
		return 'Лето';
	}

	// Остальное время — это осень
	return 'Осень';
}

/**
 * Вычисляет разницу между датами и возвращает категорию длительности
 * 
 * @since 1.0.0
 * @param string $start Начальная дата в формате Y-m-d
 * @param string $end   Конечная дата в формате Y-m-d
 * @return string|false Категория длительности ('7<', '7-14', '>14') или false в случае ошибки
 */
function diffDays($start, $end)
{
	try {
		$startDay = new DateTime($start);
		$endDay = new DateTime($end);

		$diff = $startDay->diff($endDay);
		$days = $diff->days + 1;

		// Определяем период
		if ($days < 7) {
			return '7<';
		} elseif ($days <= 14) {
			return '7-14';
		} else {
			return '>14';
		}
	} catch (Exception $e) {
		return false; // или другая обработка ошибки
	}
}

/**
 * Форматирует диапазон возрастов в читаемый вид
 * 
 * @since 1.0.0
 * @param array $ages Массив возрастов
 * @return string Отформатированная строка возрастов (например, "7 - 14 лет")
 */
function formatAgeRange($ages)
{
	if (empty($ages)) {
		return '';
	}
	sort($ages);
	$min = min($ages);
	$max = max($ages);
	return "{$min} - {$max} лет";
}

function formatDateRange($date)
{
	if (!$date) {
		return ""; // Если дата не передана, возвращаем пустую строку
	}

	// Массив с названиями месяцев на русском
	$months = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря"
	];

	// Преобразуем строку даты в объект DateTime
	$selectedDate = new DateTime($date);

	// Получаем день и месяц
	$day = $selectedDate->format('j'); // День без ведущего нуля
	$month = $months[$selectedDate->format('n') - 1]; // Месяцы в массиве начинаются с 0

	// Формируем результат в формате "18 января"
	return "$day $month";
}

function formatSchedule($selectedShift, $selectedTime)
{
	if (!$selectedShift || !$selectedTime) {
		return ""; // Если данные не переданы, возвращаем пустую строку
	}

	// Маппинг дней недели
	$dayMapping = [
		"Понедельник" => "понедельникам",
		"Вторник" => "вторникам",
		"Среда" => "средам",
		"Четверг" => "четвергам",
		"Пятница" => "пятницам",
		"Суббота" => "субботам",
		"Воскресенье" => "воскресеньям"
	];

	// Получаем день в нужном формате
	$day = $dayMapping[$selectedShift] ?? ""; // Используем оператор null coalescing для безопасности
	$time = $selectedTime;

	// Формируем результат
	return "по $day в $time";
}

function clearText($text)
{
	// Удаляем все теги, кроме разрешённых вариантов <br>
	$cleanTitle = preg_replace('/<(?!br\s*\/?|br>)[^>]+>/i', '', $text);
	$cleanTitle = trim($cleanTitle);

	return $cleanTitle;
}

function rendermerch($gallery, $title, $price, $id)
{
	$cleanPrice = preg_replace('/[^0-9]/', '', $price);

	// " . $urlImg . "

	$urlImg = isset($gallery[0]) ? $gallery[0]['url'] : '';

	// error_log(print_r($urlImg, true));

	return 	"<button class='close-modal close-modal-merch'></button>
				<div class='container-merch'> 
					<div class='top-block-merch'>
						<img class='image-merch gallery-slider-merch' data-imgurl='" . $urlImg . "' src='" . $urlImg . "' alt='' />
						<span class='title-merch'>" . $title . "</span>
					</div>
					<div class='bottom-block-merch'> 

						<div class='change-item'>
							<span>Выберите цвет</span>
							<div class='color-checkboxes'>
								
							</div>
						</div>

						<div class='change-item'>
							<span>Выберите размер</span>
							<div class='size-checkboxes'>
								
							</div>
						</div>
						
					</div>
					<buttom class='buy-order' data-price='" . $cleanPrice . "' data-id='" . $id . "'>Оформить заказ</buttom>
				</div>";
}
