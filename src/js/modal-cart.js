(function (wp) {

	// cd art.loc/wp-content/plugins/art-plugin

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { apiFetch } = wp;

	const {
		InspectorControls,
		MediaUpload,
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

	const catIcon = 'cat';
	const iconArray = (<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.86713 7.056L0.563125 3.6L2.86713 0.144H4.62713L2.48313 3.6L4.62713 7.056H2.86713ZM2.09913 4.336V2.88H7.85913V4.336H2.09913Z" fill="#8F8F8F"/>
				</svg>);

	registerBlockType('fv/modal-cart', {
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
			<div className={className}>
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
								<label className={`checkbox`}>
									<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
									<span className={'title'}>Соглашаюсь с <a href={privacyPolicyLink} aria-label="политика конфиденциальности">политикой конфиденциальности</a></span>
								</label>
								<label className={`checkbox`}>
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

		return (
			<div className={className}>
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

								<label className={`checkbox`}>
									<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
									<span className={'title'}>Соглашаюсь с <a href={privacyPolicyLink} aria-label="политика конфиденциальности">политикой конфиденциальности</a></span>
								</label>
								<label className={`checkbox`}>
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
