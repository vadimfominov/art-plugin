(function (wp) {
	// cd art.loc/wp-content/plugins/art-plugin
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const {
		InspectorControls,
		MediaUpload, useBlockProps
	} = wp.blockEditor;
	const {
		TextControl,
		PanelBody,
		PanelRow,
		Button,
		SelectControl
	} = wp.components;
	const {
		useState,
		useEffect
	} = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconArray = (<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.86713 7.056L0.563125 3.6L2.86713 0.144H4.62713L2.48313 3.6L4.62713 7.056H2.86713ZM2.09913 4.336V2.88H7.85913V4.336H2.09913Z" fill="#8F8F8F"/>
				</svg>);
	registerBlockType("fv/modal-cart", {
		title: 'Корзина',
		icon: catIcon,
		category: 'common',
		keywords: ['Корзина', 'cart', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			privacyPolicyLink: {
            type: 'string',
            default: ''
        	}
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				title,
				privacyPolicyLink
			},
			className,
			isSelected,
			setAttributes
		} = props;
		// Добавляем состояние для страниц
		const [pages, setPages] = useState([]);
		// Получаем список страниц при загрузке компонента
		useEffect(() => {
			apiFetch({ path: '/wp/v2/pages?per_page=100' }).then((pages) => {
				const pageOptions = pages.map((page) => ({
					label: page.title.rendered,
					value: page.link
				}));
				setPages(pageOptions);
			});
		}, []);
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody title="Настройки">
					<SelectControl
						label="Страница политики конфиденциальности"
						value={privacyPolicyLink}
						options={[
							{ label: 'Выберите страницу', value: '' },
							...pages
						]}
						onChange={(value) => setAttributes({ privacyPolicyLink: value })}
						__nextHasNoMarginBottom={ true }
					/>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<button className={'go-back-btn-merch'}>{iconArray} вернуться к выбору</button>
					<div className={'title-modal'}>
						<RichText
							tagName="span"
							onChange={(value) => setAttributes({ title: value })}
							value={title}
							placeholder="Укажите заголовок..."
							// allowedFormats={['core/text-color']}
						/>
					</div>
					<div className={'container-cart'}>
						{/* {fakeProduct()}
						{fakeProduct()} */}
					</div>
					<form className={'modal-content'}>
						<div className={'result-price-block'}>
							<div className={'result-title'}>Итого к оплате</div>
							<div className={'result-price'}>
								<span className={'price'}>4000</span>₽
							</div>
						</div>
						<div className={'info-contacts'}>Контактная информация</div>
						<div className={'container-step'}>
								<input required type={'text'} name={'parentName2'} aria-label={'Ваше имя'} placeholder={'Ваше имя'} />
								<input required type={'tel'} name={'parentPhone'} aria-label={'Номер телефона'} placeholder={'Номер телефона'} />
								<label className={'checkbox'}>
									<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
									<span className={'title'}>Соглашаюсь с <a href={privacyPolicyLink} aria-label="политика конфиденциальности">политикой конфиденциальности</a></span>
								</label>
								<label className={'checkbox'}>
									<input required type={'checkbox'} name={'assent'} aria-label={'Согласие'} />
									<span className={'title'}>Я согласен с обработкой и хранением указанных здесь персональных данных</span>
								</label>
								<span className={'label-class'}>Контактные данные не будут переданы третьим лицам</span>
								<div className={'btn-block'}>
									<button type="submit" className={'next send-btn'}>Заказать сейчас</button>
								</div>
						</div>
						<input type="hidden" name="titleForm" value="23 000 ₽" />
						<input type="hidden" name="referer" value="Свитшот «АРТЛичность»: Цвет - Красный, Размер - XXL, Стоимость - 2000₽, Кол-во - 1шт." />
						<input type="hidden" name="titleProduct" value="Заявка на Мерч" />
					</form>
				</div>
			</div>
		];
	}
	function Save(props) {
		const {
			attributes: {
				title,
				privacyPolicyLink
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<button className={'go-back-btn-merch'}>{iconArray} вернуться к выбору</button>
					<div className={'title-modal'}>
						<RichText.Content tagName="span" value={title} />
					</div>
					<div className={'container-cart'}>
						{/* {fakeProduct()}
						{fakeProduct()} */}
					</div>
					<form className={'modal-content'}>
						<div className={'result-price-block'}>
							<div className={'result-title'}>Итого к оплате</div>
							<div className={'result-price'}>
								<span className={'price'}>4000</span>₽
							</div>
						</div>
						<div className={'info-contacts'}>Контактная информация</div>
						<div className={'container-step'}>
								<input required type={'text'} name={'parentName2'} aria-label={'Ваше имя'} placeholder={'Ваше имя'} />
								<input required type={'tel'} name={'parentPhone'} aria-label={'Номер телефона'} placeholder={'Номер телефона'} />
								<label className={'checkbox'}>
									<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
									<span className={'title'}>Соглашаюсь с <a href={privacyPolicyLink} aria-label="политика конфиденциальности">политикой конфиденциальности</a></span>
								</label>
								<label className={'checkbox'}>
									<input required type={'checkbox'} name={'assent'} aria-label={'Согласие'} />
									<span className={'title'}>Я согласен с обработкой и хранением указанных здесь персональных данных</span>
								</label>
								<span className={'label-class'}>Контактные данные не будут переданы третьим лицам</span>
								<div className={'btn-block'}>
									<button type="submit" className={'send-btn'}>Заказать</button>
								</div>
						</div>
						<input type="hidden" name="titleForm" value="23 000 ₽" />
						<input type="hidden" name="referer" value="Свитшот «АРТЛичность»: Цвет - Красный, Размер - XXL, Стоимость - 2000₽, Кол-во - 1шт." />
						<input type="hidden" name="titleProduct" value="Заявка на Мерч" />
					</form>
				</div>
			</div>
		)
  	};
})(
	window.wp
);