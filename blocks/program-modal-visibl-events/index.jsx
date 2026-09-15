(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
	const { TextControl, ToggleControl, PanelBody, PanelRow, Button, SelectControl } = wp.components;
	const { useState, useEffect } = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconArr = (<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#30A933" />
	</svg>);
	registerBlockType("fv/program-modal-visibl-events", {
		title: 'Заявка для мероприятий',
		icon: catIcon,
		category: 'common',
		keywords: ['Заявка для мероприятий', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			image: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			privacyPolicyLink: {
				type: 'string',
				default: ''
			},
			agreePolicyLink: {
				type: 'string',
				default: ''
			},
			text: {
				type: 'string',
				default: 'Презентация о наших возможностях и опыте работы с компаниями'
			},
			downloadLink: {
				type: 'object',
				default: {
					url: '',
					id: null
				}
			},
			inDownload: {
				type: 'boolean',
				default: false
			},
		},
		edit: Edit,
		save: Save
	});
	// В компоненте Edit
	function Edit(props) {
		const {
			attributes: { title, image, privacyPolicyLink, agreePolicyLink, text, downloadLink, inDownload },
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
					<PanelRow>
						<p>Страница политики конфиденциальности</p>
						<SelectControl
							value={privacyPolicyLink}
							options={[
								{ label: 'Выберите страницу', value: '' },
								...pages
							]}
							onChange={(value) => setAttributes({ privacyPolicyLink: value })}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
						<p>Страница для согласия</p>
						<SelectControl
							value={agreePolicyLink}
							options={[
								{ label: 'Выберите страницу', value: '' },
								...pages
							]}
							onChange={(value) => setAttributes({ agreePolicyLink: value })}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>
					<PanelRow>
						<p>PDF Презентация</p>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({
									downloadLink: {
										url: media.url,
										id: media.id,
									}
								});
							}}
							allowedTypes={['pdf']}
							render={({ open }) => (
								<div style={{ 'display': 'flex', 'gap': '10px', 'marginBottom': '20px' }}>
									<Button onClick={open} isPrimary isLarge>
										{downloadLink && downloadLink.url
											? 'Изменить PDF'
											: 'Выбрать PDF'}
									</Button>
									{downloadLink && downloadLink.url && <Button isPrimary className={'delete-pdf'} onClick={() => setAttributes({
										downloadLink: {
											url: '',
											id: null,
										}
									})}>Удалить PDF</Button>}
								</div>
							)}
						/>
					</PanelRow>
					<PanelRow>
						<p>Скачать или открыть в новой вкладке</p>
						<ToggleControl
							checked={inDownload}
							onChange={() => setAttributes({ inDownload: !inDownload })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
					// allowedFormats={['core/text-color']}
					/>
					<div className={'container'}>
						<form className={'modal-content'}>
							<div className={'container-step'}>
								<div className={'step step-1 fronted'}>
									<span className={'title-step'}>Контактные данные</span>
									<input required type={'text'} name={'parentName1'} aria-label={'Введите фамилию'} placeholder={'Введите фамилию'} />
									<input required type={'text'} name={'parentName2'} aria-label={'Введите имя '} placeholder={'Введите имя '} />
									<input required type={'text'} name={'parentName3'} aria-label={'Название компании'} placeholder={'Название компании'} />
									<input required type={'tel'} name={'parentPhone'} aria-label={'Номер телефона'} placeholder={'Номер телефона'} />
									<label className={'checkbox'}>
										<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
										<span className={'title'}>
											Я даю <a href={agreePolicyLink} target="_blank" aria-label="согласие">согласие</a> на обработку персональных данных.
											Условия обработки персональных данных указаны в <a href={privacyPolicyLink} target="_blank" aria-label="Политике конфиденциальности">Политике конфиденциальности</a>
										</span>
									</label>
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
						<div className={'img-visible'}>
							{
								!image || !image.url ?
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												image: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
										}}
										allowedTypes={['image']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image && image.url
													? <img src={image.url} alt={image.alt} width="100%" height="auto" />
													: 'Выбрать картинку'}
											</Button>
										)}
									/>
									:
									<>
										<img src={image.url} alt={image.alt} width="100%" height="auto" />
										{isSelected && (
											<Button
												onClick={() => setAttributes({
													image: {
														url: '',
														id: null,
														alt: ''
													}
												})}
												className={'remove-img'}
											>
												Удалить картинку
											</Button>
										)}
									</>
							}
						</div>
					</div>
					<div className={'green-container'}>
						<RichText
							tagName="p"
							onChange={(value) => setAttributes({ text: value })}
							value={text}
							placeholder="Text..."
						// allowedFormats={[]}
						/>
						{inDownload
							? downloadLink?.url && <a href={downloadLink.url} aria-label={'Скачать документ'} target="_blank">Посмотреть презентацию</a>
							: downloadLink?.url && <a href={downloadLink.url} aria-label={'Скачать документ'} download>Скачать</a>
						}
					</div>
				</div>
			</div>
		];
	}
	// В компоненте Save
	function Save(props) {
		const { attributes: { title, image, privacyPolicyLink, agreePolicyLink,  text, downloadLink, inDownload }, className } = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'container'}>
						<form className={'modal-content'}>
							<div className={'container-step'}>
								<div className={'step step-1 fronted'}>
									<span className={'title-step'}>Контактные данные</span>
									<input required type={'text'} name={'parentName1'} aria-label={'Введите фамилию'} placeholder={'Введите фамилию'} />
									<input required type={'text'} name={'parentName2'} aria-label={'Введите имя '} placeholder={'Введите имя '} />
									<input required type={'text'} name={'parentName3'} aria-label={'Название компании'} placeholder={'Название компании'} />
									<input required type={'tel'} name={'parentPhone'} aria-label={'Номер телефона'} placeholder={'Номер телефона'} />
									<label className={'checkbox'}>
										<input required type={'checkbox'} name={'agree'} aria-label={'Согласие'} />
										<span className={'title'}>
											Я даю <a href={agreePolicyLink} target="_blank" aria-label="согласие">согласие</a> на обработку персональных данных.
											Условия обработки персональных данных указаны в <a href={privacyPolicyLink} target="_blank" aria-label="Политике конфиденциальности">Политике конфиденциальности</a>
										</span>
									</label>
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
						<div className={'img-visible'}>
							{image && image.url &&
								<img
									src={image.url}
									alt={image.alt || ''}
									width="100%"
									height="auto"
								/>
							}
						</div>
					</div>
					<div className={'green-container'}>
						<RichText.Content tagName="p" value={text} />
						{inDownload
							? <a href={downloadLink?.url} aria-label={'Скачать документ'} target="_blank">Посмотреть презентацию</a>
							: <a href={downloadLink?.url} aria-label={'Скачать документ'} download>Скачать</a>
						}
					</div>
				</div>
			</div>
		);
	}
})(
	window.wp
);