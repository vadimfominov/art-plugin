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

	registerBlockType('fv/program-modal-transfer', {
		title: 'Заявка на трансфер',
		icon: catIcon,
		category: 'common',
		keywords: ['Заявка на трансфер', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			titleSelect1: {
				type: 'string',
				default: ''
			},
			select1Options: {
				type: 'array',
				default: [
					{ value: '1', label: 'Опция 1' },
					{ value: '2', label: 'Опция 2' },
					{ value: '3', label: 'Опция 3' }
				]
			},
			titleSelect2: {
				type: 'string',
				default: ''
			},
			select2Options: {
				type: 'array',
				default: [
					{ value: '1', label: 'Опция 1' },
					{ value: '2', label: 'Опция 2' },
					{ value: '3', label: 'Опция 3' }
				]
			},
			titleSelect3: {
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
		supports: {
			anchor: true
	  	},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes,
			className,
			isSelected,
			setAttributes
		} = props;

		const {
			title,
			titleSelect1,
			titleSelect2,
			titleSelect3,
			privacyPolicyLink,
			select1Options,
			select2Options,
			description
		} = attributes;

		// Добавляем состояние для страниц
		const [pages, setPages] = useState([]);
		const [newOption, setNewOption] = useState({ select1: '', select2: '' });

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

		const addOption = (selectName) => {
			const optionText = newOption[selectName].trim();
			if (!optionText) return;
	
			const attributeName = `${selectName}Options`;
			const newOptions = [...attributes[attributeName], {
			  value: optionText.toLowerCase().replace(/\s+/g, '-'),
			  label: optionText
			}];
	
			setAttributes({ [attributeName]: newOptions });
			setNewOption({ ...newOption, [selectName]: '' });
		};

		const removeOption = (selectName, index) => {
			const attributeName = `${selectName}Options`;
			const newOptions = [...attributes[attributeName]];
			newOptions.splice(index, 1);
			setAttributes({ [attributeName]: newOptions });
		};
		
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
						__next40pxDefaultSize={ true }
					/>

					{/* Управление опциями для первого select */}
					<PanelBody title="Опции первого выпадающего списка" initialOpen={false}>
						{select1Options.map((option, index) => (
						<PanelRow key={option.value}>
							<TextControl
								__next40pxDefaultSize={true}
								__nextHasNoMarginBottom={true}
								value={option.label}
								onChange={(newLabel) => {
									const updatedOptions = [...select1Options];
									updatedOptions[index].label = newLabel;
									setAttributes({ select1Options: updatedOptions });
								}}
							/>
							<Button className={'remove-option'} isDestructive onClick={() => removeOption('select1', index)}>
								Удалить
							</Button>
						</PanelRow>
						))}
						<PanelRow>
						<TextControl
							__next40pxDefaultSize={true}
							__nextHasNoMarginBottom={true}
							value={newOption.select1}
							onChange={(value) => setNewOption({ ...newOption, select1: value })}
							placeholder="Новая опция"
						/>
						<Button isPrimary onClick={() => addOption('select1')}>
							Добавить
						</Button>
						</PanelRow>
					</PanelBody>
          
					{/* Управление опциями для второго select */}
					<PanelBody title="Опции второго выпадающего списка" initialOpen={false}>
						{select2Options.map((option, index) => (
						<PanelRow key={option.value}>
							<TextControl
								__next40pxDefaultSize={true}
								__nextHasNoMarginBottom={true}
								value={option.label}
								onChange={(newLabel) => {
								const updatedOptions = [...select2Options];
								updatedOptions[index].label = newLabel;
								setAttributes({ select2Options: updatedOptions });
								}}
							/>
							<Button className={'remove-option'} isDestructive onClick={() => removeOption('select2', index)}>
								Удалить
							</Button>
						</PanelRow>
						))}
						<PanelRow>
						<TextControl
							__next40pxDefaultSize={true}
							__nextHasNoMarginBottom={true}
							value={newOption.select2}
							onChange={(value) => setNewOption({ ...newOption, select2: value })}
							placeholder="Новая опция"
						/>
						<Button isPrimary onClick={() => addOption('select2')}>
							Добавить
						</Button>
						</PanelRow>
					</PanelBody>

				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'modal-wrapper'}>
					<form className={'modal-content'} data-slug={'transfer'}>
						<span className={'close-modal'}></span>
						<div className={'title-modal'}>
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title: value })}
								value={title}
								placeholder="Укажите заголовок..."
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
								<div className={"block-select first-block-select"}>
									<RichText
										tagName="p"
										onChange={(value) => setAttributes({ titleSelect1: value })}
										value={titleSelect1}
										placeholder="Укажите заголовок..."
									/>
									<select name="transfer_po_marshrutu">
										<option value="no_route">Выберите смену</option>
										{select1Options.map((option) => (
											<option key={option.value} value={option.label}>
											{option.label}
											</option>
										))}
									</select>
								</div>
								<div className={"block-select"}>
									<RichText
										tagName="p"
										onChange={(value) => setAttributes({ titleSelect2: value })}
										value={titleSelect2}
										placeholder="Укажите заголовок..."
									/>
									<select name="transfer_po_marshrutu_2">
										<option value="no_route">Выберите смену</option>
										{select2Options.map((option) => (
											<option key={option.value} value={option.label}>
											{option.label}
											</option>
										))}
									</select>
								</div>
								<RichText
									tagName="p"
									className={'description-select'}
									onChange={(value) => setAttributes({ titleSelect3: value })}
									value={titleSelect3}
									placeholder="Укажите заголовок..."
								/>
								
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
				titleSelect3,
				select1Options,
				titleSelect2,
				select2Options,
				titleSelect1,
				description,
				privacyPolicyLink
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'modal-wrapper'}>
					<form className={'modal-content'} data-slug={'transfer'}>
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
								{select1Options.length > 0 && <div className={"block-select first-block-select"}>
									<RichText.Content tagName="p" value={titleSelect1} />
									<select name="transfer_po_marshrutu">
										<option value="no_route">Выберите смену</option>
										{select1Options.map((option) => (
											<option key={option.value} value={option.label}>
											{option.label}
											</option>
										))}
									</select>
								</div>}
								{select2Options.length > 0 && <div className={"block-select"}>
									<RichText.Content tagName="p" value={titleSelect2} />
									<select name="transfer_po_marshrutu_2">
										<option value="no_route">Выберите смену</option>
										{select2Options.map((option) => (
											<option key={option.value} value={option.label}>
												{option.label}
											</option>
										))}
									</select>
								</div>}
								
								<RichText.Content className={'description-select'} tagName="p" value={titleSelect3} />
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
