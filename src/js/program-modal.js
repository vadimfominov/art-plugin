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
		<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#30A933" />
	</svg>);

	registerBlockType('fv/program-modal', {
		title: 'Заявка на программу',
		icon: catIcon,
		category: 'common',
		keywords: ['Заявка на программу', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: 'Поданная заявка не является подтверждением бронирования места. Бронь места производится только после звонка администратора, получения подтверждения наличия места на электронную почту и осуществления оплаты/предоплаты.'
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
						__nextHasNoMarginBottom={true}
						__next40pxDefaultSize={true}
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
								<span className={'subtitle-step'}>Шаг 1</span>
								<span className={'title-step'}>Информация о ребенке</span>
								<input required type={'text'} name={'childName1'} aria-label={'Фамилия ребенка'} placeholder={'Фамилия ребенка'} />
								<input required type={'text'} name={'childName2'} aria-label={'Имя ребенка'} placeholder={'Имя ребенка'} />
								<input required type={'text'} name={'childName3'} aria-label={'Отчество ребенка'} placeholder={'Отчество ребенка'} />
								<input required type={'text'} name={'birthdate'} aria-label={'Дата рождения'} placeholder={'Дата рождения'} />

								<div className={'btn-block'}>
									<div className={'back disabled'}>{iconArr}</div>
									<button type="button" className={'next next-step'}>Следующий шаг <span>{iconArr}</span></button>
								</div>
							</div>
							<div className={'step step-2 backend'}>
								<span className={'subtitle-step'}>Шаг 2</span>
								<span className={'title-step'}>Информация о родителе</span>
								<input required type={'text'} name={'parentName1'} aria-label={'Фамилия родителя'} placeholder={'Фамилия родителя'} />
								<input required type={'text'} name={'parentName2'} aria-label={'Имя родителя'} placeholder={'Имя родителя'} />
								<input required type={'text'} name={'parentName3'} aria-label={'Отчество родителя'} placeholder={'Отчество родителя'} />
								<input required type={'email'} name={'parentEmail'} aria-label={'Email'} placeholder={'Email'} />
								<input required type={'tel'} name={'parentPhone'} aria-label={'+7 (999) 999-99-99'} placeholder={'+7 (999) 999-99-99'} />
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
									<div className={'back back-step'}>{iconArr}</div>
									<button type="submit" className={'next send-btn'}>Оставить заявку <span>{iconArr}</span></button>
								</div>
							</div>
						</div>
						<input type="hidden" name="titleForm" value="" />
						<input type="hidden" name="titleProduct" value="" />
						<input type="hidden" name="referer" value="" />
						<input type="hidden" name="dataStart" value="" />

						<RichText
							tagName="p"
							onChange={(value) => setAttributes({ description: value })}
							value={description}
							placeholder="description..."
						// allowedFormats={[]}
						/>
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
								<span className={'subtitle-step'}>Шаг 1</span>
								<span className={'title-step'}>Информация о ребенке</span>
								<input required type={'text'} name={'childName1'} aria-label={'Фамилия ребенка'} placeholder={'Фамилия ребенка'} />
								<input required type={'text'} name={'childName2'} aria-label={'Имя ребенка'} placeholder={'Имя ребенка'} />
								<input required type={'text'} name={'childName3'} aria-label={'Отчество ребенка'} placeholder={'Отчество ребенка'} />
								<input required type={'text'} name={'birthdate'} aria-label={'Дата рождения'} placeholder={'Дата рождения'} />
								
								<div className={'btn-block'}>
									<div className={'back disabled'}>{iconArr}</div>
									<button type="button" className={'next next-step'}>Следующий шаг <span>{iconArr}</span></button>
								</div>
							</div>
							<div className={'step step-2 backend'}>
								<span className={'subtitle-step'}>Шаг 2</span>
								<span className={'title-step'}>Информация о родителе</span>
								<input required type={'text'} name={'parentName1'} aria-label={'Фамилия родителя'} placeholder={'Фамилия родителя'} />
								<input required type={'text'} name={'parentName2'} aria-label={'Имя родителя'} placeholder={'Имя родителя'} />
								<input required type={'text'} name={'parentName3'} aria-label={'Отчество родителя'} placeholder={'Отчество родителя'} />
								<input required type={'email'} name={'parentEmail'} aria-label={'Email'} placeholder={'Email'} />
								<input required type={'tel'} name={'parentPhone'} aria-label={'+7 (999) 999-99-99'} placeholder={'+7 (999) 999-99-99'} />
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
									<div className={'back back-step'}>{iconArr}</div>
									<button type="submit" className={'next send-btn'}>Оставить заявку <span>{iconArr}</span></button>
								</div>
							</div>
						</div>
						<input type="hidden" name="titleForm" value="" />
						<input type="hidden" name="titleProduct" value="" />
						<input type="hidden" name="referer" value="" />
						<input type="hidden" name="dataStart" value="" />

						{description && <RichText.Content tagName="p" value={description} />}
					</form>

				</div>
			</div>
		)
	};

})(
	window.wp
);
