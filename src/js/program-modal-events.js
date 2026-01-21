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

	const catIcon = 'cat'
	const iconArr = (<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#30A933"/>
	</svg>);

	registerBlockType('fv/program-modal-events', {
		title: 'Заявка на мероприятие',
		icon: catIcon,
		category: 'common',
		keywords: ['Заявка на мероприятие', 'фке', 'art'],
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
				privacyPolicyLink,
				description
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
				<div className={'modal-wrapper'}>
					<form className={'modal-content'}>

						<span className={'close-modal'}></span>
						<div className={'title-modal'}>
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title: value })}
								value={title}
								placeholder="Укажите заголовок..."
								// allowedFormats={['core/text-color']}
							/>
						</div>

						<div className={'container-step'}>
							<div className={'step step-1 fronted'}>
								<span className={'title-step'}>Контактные данные</span>
								<input required type={'text'} name={'parentName1'} aria-label={'Введите фамилию'} placeholder={'Введите фамилию'} />
								<input required type={'text'} name={'parentName2'} aria-label={'Введите имя '} placeholder={'Введите имя '} />
								<input required type={'text'} name={'parentName3'} aria-label={'Название компании'} placeholder={'Название компании'} />

								<input required type={'tel'} name={'parentPhone'} aria-label={'Номер телефона'} placeholder={'Номер телефона'} />

								<label className={`checkbox`}>
									<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
									<span className={'title'}>Соглашаюсь с <a href={privacyPolicyLink} target={'_blank'} aria-label="политика конфиденциальности">политикой конфиденциальности</a></span>
								</label>
								<label className={`checkbox`}>
									<input required type={'checkbox'} name={'assent'} aria-label={'Согласие'} />
									<span className={'title'}>Я согласен с обработкой и хранением указанных здесь персональных данных</span>
								</label>
								<span className={'label-class'}>Контактные данные не будут переданы третьим лицам</span>

								<div className={'btn-block'}>
									<button type="submit" className={'next send-btn'}>Отправить <span>{iconArr}</span></button>
								</div>
							</div>
							
						</div>
						<input type="hidden" name="titleForm" value="" />
						<input type="hidden" name="titleProduct" value="" />
						<input type="hidden" name="referer" value="" />
						<input type="hidden" name="dataStart" value="" />

					</form>
					
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				description,
				privacyPolicyLink
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'modal-wrapper'}>
					<form className={'modal-content'}>
						<span className={'close-modal'}></span>
						<div className={'title-modal'}>
							<RichText.Content tagName="span" value={title} />
						</div>
						<div className={'container-step'}>
							<div className={'step step-1 fronted'}>
								<span className={'title-step'}>Контактные данные</span>
								<input required type={'text'} name={'parentName1'} aria-label={'Введите фамилию'} placeholder={'Введите фамилию'} />
								<input required type={'text'} name={'parentName2'} aria-label={'Введите имя '} placeholder={'Введите имя '} />
								<input required type={'text'} name={'parentName3'} aria-label={'Название компании'} placeholder={'Название компании'} />

								<input required type={'tel'} name={'parentPhone'} aria-label={'Номер телефона'} placeholder={'Номер телефона'} />

								<label className={`checkbox`}>
									<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
									<span className={'title'}>Соглашаюсь с <a href={privacyPolicyLink} target={'_blank'} aria-label="политика конфиденциальности">политикой конфиденциальности</a></span>
								</label>
								<label className={`checkbox`}>
									<input required type={'checkbox'} name={'assent'} aria-label={'Согласие'} />
									<span className={'title'}>Я согласен с обработкой и хранением указанных здесь персональных данных</span>
								</label>
								<span className={'label-class'}>Контактные данные не будут переданы третьим лицам</span>

								<div className={'btn-block'}>
									<button type="submit" className={'next send-btn'}>Отправить <span>{iconArr}</span></button>
								</div>
							</div>
						</div>

						<input type="hidden" name="titleForm" value="" />
						<input type="hidden" name="titleProduct" value="" />
						<input type="hidden" name="referer" value="" />
						<input type="hidden" name="dataStart" value="" />

					</form>
					
				</div>
			</div>
		)
  	};

})(
	window.wp
);
