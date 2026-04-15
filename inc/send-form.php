<?php

function register_form_submission_post_type()
{
	register_post_type('form_submission', array(
		'public' => false,
		'show_ui' => true,
		'supports' => ['title', 'editor'],
		'show_in_rest'  => true,
		'labels' => array(
			'name' => 'Заявки на программу',
			'singular_name' => 'Заявка на программу',
		),
	));
}
add_action('init', 'register_form_submission_post_type');

add_action('rest_api_init', function () {
	register_rest_route('wp/v2', '/form-submissions', array(
		'methods'  => 'POST',
		'callback' => 'handle_form_submission',
		'permission_callback' => '__return_true'
	));
});

function handle_form_submission($request)
{
	// $params = $request->get_params();
	$params = $request->get_json_params();

	// $action = 'dev';

	// Проверка и санитизация данных
	$city = sanitize_text_field($params['city'] ?? '');

	$childName1 = sanitize_text_field($params['childName1'] ?? '');
	$childName2 = sanitize_text_field($params['childName2'] ?? '');
	$childName3 = sanitize_text_field($params['childName3'] ?? '');
	$birthdate = sanitize_text_field($params['birthdate'] ?? '');
	// $birthdate = str_replace('.', '-', $currentBirthdate);

	$parentName1 = sanitize_text_field($params['parentName1'] ?? '');
	$parentName2 = sanitize_text_field($params['parentName2'] ?? '');
	$parentName3 = sanitize_text_field($params['parentName3'] ?? '');
	$parentEmail = sanitize_email($params['parentEmail'] ?? '');
	$parentPhone = sanitize_text_field($params['parentPhone'] ?? '');
	$resultPhone = '+' . preg_replace('~\D+~', '', $parentPhone);

	$titleForm = sanitize_text_field($params['titleForm'] ?? '');
	$titleProduct = sanitize_text_field($params['titleProduct'] ?? '');
	$referer = sanitize_text_field($params['referer'] ?? '');
	$dataStart = sanitize_text_field($params['dataStart'] ?? '');


	ob_start();

	echo '<h2>Данные из формы</h2>';
	echo '<table style="border-collapse: collapse; width: 500px; border: 1px solid #ddd;">';
	echo '<thead>';
	echo '<tr style="background-color: #f2f2f2;">';
	echo '<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Поле</th>';
	echo '<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Значение</th>';
	echo '</tr>';
	echo '</thead>';
	echo '<tbody>';

	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Имя ребёнка</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($childName2) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Фамилия ребёнка</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($childName1) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Отчество ребёнка</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($childName3) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Дата рождения ребёнка</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($birthdate) . '</td></tr>';

	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Имя родителя</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($parentName2) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Фамилия родителя</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($parentName1) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Отчество родителя</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($parentName3) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Почта</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($parentEmail) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Телефон</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($resultPhone) . '</td></tr>';

	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Заявка</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($titleForm) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Смена</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($titleProduct) . ' (' . esc_html($city) . ')' . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Ссылка</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($referer) . '</td></tr>';
	echo '<tr><td style="border: 1px solid #ddd; padding: 8px;">Дата старта</td><td style="border: 1px solid #ddd; padding: 8px;">' . esc_html($dataStart) . '</td></tr>';

	echo '</tbody>';
	echo '</table>';

	$content = ob_get_clean();

	$post_id = wp_insert_post(array(
		'post_title'   => sanitize_text_field($params['parentName2'] . ' ' . $params['parentName1']),
		'post_content' => $content,
		'post_type'    => 'form_submission',
		'post_status'  => 'publish',
	));

	if (is_wp_error($post_id)) {
		return new WP_Error('form_error', 'Не удалось сохранить данные', ['status' => 500]);
	}

	// Здесь можно добавить дополнительную логику, например, отправку email
	// $action = 'dev';

	// if($action === 'dev') {

	if ($titleProduct === 'Tест-драйв лагеря') {
		$decodedData = [
			'Имя родителя' => $parentName2,
			'Фамилия родителя' => $parentName1,
			'Телефон' => $resultPhone,

			'Заявка' => $titleForm,
			'Смена' => $titleProduct,
			'Ссылка' => $referer,
		];
	} else if ($titleProduct === 'Заявка на Мерч') {
		$items = explode(' | ', $referer);
		// Определяем количество элементов в массиве
		$ItemCount = count($items);

		$decodedData = [
			'Имя' => $parentName2,
			'Телефон' => $resultPhone,

			'Заявка' => $titleProduct,
			'Общая стоимость' => $titleForm,
			'Количество позиций' => $ItemCount,
			'Мерч' => $referer
		];
	} else {
		$decodedData = [
			'Имя ребенка' => $childName2,
			'Фамилия ребенка' => $childName1,
			'Отчество ребенка' => $childName3,
			'Дата рождения' => $birthdate,
			'Имя родителя' => $parentName2,
			'Фамилия родителя' => $parentName1,
			'Отчество родителя' => $parentName3,
			'Email' => $parentEmail,
			'Телефон' => $resultPhone,

			'Заявка' => $titleForm,
			'Смена' => $titleProduct . ' (' . $city . ')',
			'Ссылка' => $referer,
			'Дата старта' => $dataStart,
		];
	}

	// Счётчик отправленных заявок
	if (is_user_logged_in()) {
		$current_user = wp_get_current_user();
		$user_email = $current_user->user_email;
		increment_submission_count($user_email);
	}
	
	// ДЛЯ ТЕЛЕГРАМ
	send_to_telegram($decodedData, 'deposited');

	// } else {

	$queryURL = "https://b24-4949mg.bitrix24.ru/rest/6/ptovp7zrew2dco7j/crm.lead.add.json";

	// формируем параметры для создания лида	
	$queryData = http_build_query(
		array(
			"fields" => [
				"TITLE" => $titleForm,	// Заголовок формы. Пример: Академия навыков: Название карточки товара

				"UF_CRM_1673956965" 	=> $parentName1,	// Фамилия родителя
				"UF_CRM_1673956997" 	=> $parentName2,	// Имя родителя
				"UF_CRM_1706543635268" => $parentName3,	// Отчество родителя
				"LAST_NAME" 			=> $childName1,		// Фамилия ребёнка
				"NAME" 					=> $childName2,		// Имя ребенка
				"SECOND_NAME" 			=> $childName3,		// Отчество ребенка
				"BIRTHDATE" 			=> $birthdate,				// ДР ребёнка
				"UF_CRM_1673957028"	=> $parentEmail,					// Email 
				"UF_CRM_1673957059" 	=> $resultPhone,					// Phone

				"UF_CRM_1673959882" 	=> $referer,				// Ссылка на страницу откуда пришла заявка
				"UF_CRM_1673959898" 	=> $titleProduct . ' (' . $city . ')',			// Название карточки товара
				"UF_CRM_1730884015214" 	=> $dataStart,		// Дата старта смены
			],
			'params' => array("REGISTER_SONET_EVENT" => "Y")	// Y = произвести регистрацию события добавления лида в живой ленте. Дополнительно будет отправлено уведомление ответственному за лид.	
		)
	);

	// отправляем запрос в Б24 и обрабатываем ответ
	$curl = curl_init();
	curl_setopt_array(
		$curl,
		array(
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_POST => 1,
			CURLOPT_HEADER => 0,
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => $queryURL,
			CURLOPT_POSTFIELDS => $queryData,
		)
	);
	$result = curl_exec($curl);
	curl_close($curl);
	$result = json_decode($result, 1);

	// }

	// ДЛЯ БИТРИКСА
	// если произошла какая-то ошибка - выведем её
	if (array_key_exists('error', $result)) {
		$data['response'] = rest_ensure_response([
			'message' => "Error: " . $result['error_description'],
			'success' => false,
		]);
	} else {
		$data['response'] = rest_ensure_response([
			'message' => 'Спасибо! Ваша заявка отправлена',
			'success' => true,
		]);
	}

	// ДЛЯ ТЕЛЕГРАМ
	// $data['response'] = rest_ensure_response([
	// 	'message' => 'Спасибо! Ваша заявка отправлена',
	// 	'success' => true, 
	// ]);

	return $data;
}

function send_to_telegram($data, $status)
{
	$bot_token = '7516088518:AAHfmj9D8vCeLRAbDPBkNCstoZfx0QKuNts';
	$admin_id = '473096209';
	$slavyana = '489436484';

	// $viktoriya_id = '244661956';
	// $anna_id = '728472449';
	// $olga_id = '516552626';
	// $sasha_id = '312210776';

	$subscribers = [$admin_id, $slavyana];
	// $subscribers = [$admin_id, $viktoriya_id, $anna_id, $olga_id, $sasha_id];
	$url = "https://api.telegram.org/bot{$bot_token}/sendMessage";
	$message = format_message_for_telegram($data, $status);

	foreach ($subscribers as $chat_id) {
		wp_remote_post($url, [
			'body' => [
				'chat_id' => $chat_id,
				'text' => $message,
				'parse_mode' => 'HTML'
			],
			'timeout' => 5,
			'blocking' => true
		]);
	}
}

function format_message_for_telegram($data, $status)
{

	if ($status === 'deposited') {
		$message = "📩 <b>Новая заявка:</b>\n\n";
		foreach ($data as $key => $value) {
			$message .= "<b>{$key}:</b> " . esc_html($value) . "\n";
		}
	} else {
		$message = "⛔️ <b>Неизвестная ошибка.</b>\n";
		$message .= "🤷 Статус не существует \n";
	}

	return $message;
}
