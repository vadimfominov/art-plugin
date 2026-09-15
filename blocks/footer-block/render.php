<?php

/**
 * Render callback for Footer block
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string
 */

$vk = $attributes['vk'] ?? '';
$tg = $attributes['tg'] ?? '';
$logoIMG = $attributes['logoIMG'] ?? [];
$phoneLink = $attributes['phoneLink'] ?? '+7 (812) 701-09-19';
$emailLink = $attributes['emailLink'] ?? 'info@example.com';
$timeWork = $attributes['timeWork'] ?? 'Пн-Пт: 9:00 - 18:00';
$homeUrl = $attributes['homeUrl'] ?? home_url('/');

$selectedFooterMenu = $attributes['selectedFooterMenu'] ?? 0;
$selectedDirectionsMenu = $attributes['selectedDirections'] ?? 0;
$selectedDocumentsMenu = $attributes['selectedDocuments'] ?? 0;

// Форматируем номер телефона для ссылки
$formattedPhoneNumber = preg_replace('/[\s()-]/', '', $phoneLink);

// Иконки
$iconVk = '<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 37C28.7172 37 37 28.7172 37 18.5C37 8.28276 28.7172 0 18.5 0C8.28276 0 0 8.28276 0 18.5C0 28.7172 8.28276 37 18.5 37Z" fill="white"></path><path d="M29 10H8V27H29V10Z" fill="#30A933"></path><mask id="mask0_16_20" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="4" y="4" width="30" height="30"><path d="M34 4H4V34H34V4Z" fill="white"></path></mask><g mask="url(#mask0_16_20)"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.10883 6.10883C4 8.21769 4 11.6118 4 18.4V19.6C4 26.3882 4 29.7823 6.10883 31.8912C8.21769 34 11.6118 34 18.4 34H19.6C26.3882 34 28.3911 32.1088 30.5 30C32.6088 27.8911 34 26.3882 34 19.6V18.4C34 11.6118 34 8.21769 31.8912 6.10883C29.7823 4 26.3882 4 19.6 4H18.4C11.6118 4 8.21769 4 6.10883 6.10883ZM9.06256 13.1251C9.22506 20.9251 13.125 25.6126 19.9625 25.6126H20.3501V21.1501C22.8626 21.4 24.7624 23.2376 25.5249 25.6126H29.0751C28.1001 22.0626 25.5374 20.1001 23.9374 19.3501C25.5374 18.4251 27.7874 16.1751 28.3249 13.1251H25.0998C24.3999 15.6001 22.3251 17.8501 20.3501 18.0625V13.1251H17.125V21.775C15.125 21.2751 12.6001 18.8501 12.4876 13.1251H9.06256Z" fill="white"></path></g></svg>';

$iconTg = '<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5 37C28.7172 37 37 28.7172 37 18.5C37 8.28276 28.7172 0 18.5 0C8.28276 0 0 8.28276 0 18.5C0 28.7172 8.28276 37 18.5 37Z" fill="white"/>
    <path d="M9.44659 18.3818C9.48569 18.3624 9.52473 18.344 9.56276 18.3265C10.2246 18.0215 10.895 17.7359 11.5645 17.4504C11.6007 17.4504 11.6611 17.4086 11.6953 17.395C11.7471 17.3727 11.7988 17.3513 11.8505 17.329L12.1482 17.2018C12.3473 17.1172 12.5454 17.0328 12.7445 16.9482C13.1418 16.7793 13.539 16.6102 13.9362 16.4403C14.7307 16.1023 15.5262 15.7634 16.3206 15.4253C17.115 15.0874 17.9105 14.7484 18.705 14.4104C19.4995 14.0724 20.2949 13.7335 21.0894 13.3954C21.8839 13.0574 22.6793 12.7185 23.4738 12.3805C23.6504 12.3047 23.8417 12.1921 24.0311 12.159C24.1901 12.1308 24.3453 12.0765 24.5054 12.0464C24.8089 11.9891 25.1437 11.9658 25.4345 12.0911C25.535 12.1347 25.6278 12.1959 25.7049 12.2727C26.0739 12.6359 26.0221 13.2323 25.944 13.7432C25.4003 17.3037 24.8568 20.8653 24.3121 24.4259C24.2379 24.9144 24.1364 25.4505 23.749 25.7594C23.421 26.0207 22.9545 26.0498 22.5495 25.9391C22.1444 25.8274 21.7872 25.5933 21.4368 25.3632C19.9836 24.4055 18.5293 23.4478 17.0761 22.4902C16.7305 22.2629 16.346 21.9658 16.3499 21.553C16.3518 21.3043 16.5012 21.0829 16.6535 20.8857C17.9164 19.2462 19.7386 18.1196 21.0943 16.5559C21.2856 16.3354 21.4358 15.9372 21.1733 15.8099C21.0171 15.7342 20.8375 15.8371 20.6951 15.9352C18.9031 17.1736 17.1121 18.4129 15.3202 19.6512C14.7355 20.0553 14.1227 20.4709 13.418 20.57C12.7875 20.6594 12.1531 20.4846 11.5431 20.3059C11.0317 20.1563 10.5212 20.0028 10.0127 19.8445C9.74233 19.761 9.46321 19.6707 9.25436 19.4813C9.04552 19.2919 8.92545 18.9733 9.05137 18.7208C9.13039 18.5625 9.28364 18.4624 9.4447 18.3809L9.44659 18.3818Z" fill="#30A933"/>
</svg>';

// Рендерим меню через wp_nav_menu
$footer_menu_html = '';
if (!empty($selectedFooterMenu)) {
	$footer_menu_html = wp_nav_menu([
		'menu' => $selectedFooterMenu,
		'container' => 'div',
		'container_class' => 'menu-footer-menu-container',
		'echo' => false,
		'fallback_cb' => false,
	]);
}

$directions_menu_html = '';
if (!empty($selectedDirectionsMenu)) {
	$directions_menu_html = wp_nav_menu([
		'menu' => $selectedDirectionsMenu,
		'container' => 'div',
		'container_class' => 'menu-footer-directions-container',
		'echo' => false,
		'fallback_cb' => false,
	]);
}

$documents_menu_html = '';
if (!empty($selectedDocumentsMenu)) {
	$documents_menu_html = wp_nav_menu([
		'menu' => $selectedDocumentsMenu,
		'container' => 'div',
		'container_class' => 'menu-footer-documents-container',
		'echo' => false,
		'fallback_cb' => false,
	]);
}

// Если меню не выбраны, показываем заглушки
if (empty($footer_menu_html)) {
	$footer_menu_html = '<p class="menu-placeholder">Выберите меню в настройках блока</p>';
}
if (empty($directions_menu_html)) {
	$directions_menu_html = '<p class="menu-placeholder">Выберите меню в настройках блока</p>';
}
if (empty($documents_menu_html)) {
	$documents_menu_html = '<p class="menu-placeholder">Выберите меню в настройках блока</p>';
}
?>

<footer <?php echo get_block_wrapper_attributes(); ?>>
	<div class="wrapper">
		<a aria-label="logo" class="logo" href="<?php echo esc_url($homeUrl); ?>">
			<?php if (!empty($logoIMG['url'])) : ?>
				<img width="112" height="51" src="<?php echo esc_url($logoIMG['url']); ?>" alt="<?php echo esc_attr($logoIMG['alt'] ?? ''); ?>" />
			<?php endif; ?>
		</a>

		<div class="footer-menu">
			<div class="menu-title">Меню</div>
			<?php echo $footer_menu_html; ?>
		</div>

		<div class="directions-menu">
			<div class="menu-title">Направления</div>
			<?php echo $directions_menu_html; ?>
		</div>

		<div class="documents-menu">
			<div class="menu-title">Документация</div>
			<?php echo $documents_menu_html; ?>
		</div>

		<div class="right-info">
			<?php if ($phoneLink) : ?>
				<a href="tel:<?php echo esc_attr($formattedPhoneNumber); ?>" class="phone-link">
					<?php echo esc_html($phoneLink); ?>
				</a>
			<?php endif; ?>

			<?php if ($emailLink) : ?>
				<a href="mailto:<?php echo esc_attr($emailLink); ?>" class="email-link">
					<?php echo esc_html($emailLink); ?>
				</a>
			<?php endif; ?>

			<?php if ($timeWork) : ?>
				<span class="time-work">
					<?php echo esc_html($timeWork); ?>
				</span>
			<?php endif; ?>

			<?php if ($vk || $tg) : ?>
				<div class="social-icons">
					<?php if ($vk) : ?>
						<a href="https://vk.com/<?php echo esc_attr($vk); ?>" target="_blank" aria-label="vk" class="vk">
							<?php echo $iconVk; ?>
						</a>
					<?php endif; ?>

					<?php if ($tg) : ?>
						<a href="https://t.me/<?php echo esc_attr($tg); ?>" target="_blank" aria-label="tg" class="tg">
							<?php echo $iconTg; ?>
						</a>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>

	<div class="wrapper">
		<a class="design-website" href="https://shatl-design.ru/" target="_blank">
			Дизайн сайта
		</a>
	</div>
</footer>