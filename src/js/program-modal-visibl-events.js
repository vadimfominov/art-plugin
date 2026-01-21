(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, MediaUpload, InnerBlocks } = wp.blockEditor;
	const { TextControl, ToggleControl, PanelBody, PanelRow, Button, SelectControl } = wp.components;
	const { useState, useEffect } = wp.element

	const catIcon = 'cat'
	const iconArr = (<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#30A933"/>
	</svg>);

	registerBlockType('fv/program-modal-visibl-events', {
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
			attributes: { title, image, privacyPolicyLink, text, downloadLink, inDownload },
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
					<PanelRow>
						<p>Страница политики конфиденциальности</p>
						<SelectControl
							value={privacyPolicyLink}
							options={[
								{ label: 'Выберите страницу', value: '' },
								...pages
							]}
							onChange={(value) => setAttributes({ privacyPolicyLink: value })}
							__nextHasNoMarginBottom={ true }
							__next40pxDefaultSize={ true }
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
								<div style={{'display': 'flex', 'gap': '10px', 'marginBottom': '20px'}}>
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
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
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
		const { attributes: { title, image, privacyPolicyLink, text, downloadLink, inDownload }, className } = props;

		return (
			<div className={className}>
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
							{ image && image.url && 
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
