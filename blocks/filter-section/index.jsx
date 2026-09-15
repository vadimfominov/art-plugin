(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	// const { apiFetch } = wp;
	const { InspectorControls, useBlockProps } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, SelectControl } = wp.components;
	// const { useState, useEffect } = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconFilter = (<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_477_1427)">
			<path d="M1.91899 3.35701V0H1.08101V3.35701C0.769142 3.45545 0.495194 3.6607 0.300279 3.94196C0.105365 4.22321 0 4.5653 0 4.91687C0 5.26844 0.105365 5.61052 0.300279 5.89178C0.495194 6.17303 0.769142 6.37828 1.08101 6.47672V15H1.91899V6.47672C2.23086 6.37828 2.50481 6.17303 2.69972 5.89178C2.89464 5.61052 3 5.26844 3 4.91687C3 4.5653 2.89464 4.22321 2.69972 3.94196C2.50481 3.6607 2.23086 3.45545 1.91899 3.35701Z" fill="#848484" />
			<path d="M10 10.0831C9.99991 9.73137 9.89439 9.38914 9.6993 9.10786C9.50421 8.82658 9.23008 8.62144 8.9181 8.52328V0H8.0805V8.52328C7.76878 8.62172 7.49496 8.82697 7.30014 9.10822C7.10532 9.38948 7 9.73156 7 10.0831C7 10.4347 7.10532 10.7768 7.30014 11.058C7.49496 11.3393 7.76878 11.5445 8.0805 11.643V15H8.9181V11.643C9.23008 11.5448 9.50421 11.3397 9.6993 11.0584C9.89439 10.7771 9.99991 10.4349 10 10.0831Z" fill="#848484" />
		</g><defs><clipPath id="clip0_477_1427"><rect width="10" height="15" fill="white" />
		</clipPath></defs></svg>);
	const iconSearch = (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g opacity="0.8">
			<path d="M6.39346 11.6005C9.30931 11.6369 11.6476 9.30809 11.6162 6.39903C11.5847 3.48997 9.19547 1.10222 6.27962 1.06585C3.36377 1.02948 1.02548 3.35826 1.05692 6.26732C1.08836 9.17638 3.47761 11.5641 6.39346 11.6005Z" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M13.0029 13L10.1016 10.0996" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</g></svg>);
	registerBlockType("fv/filter-section", {
		title: 'Блок с фильтром',
		icon: catIcon,
		category: 'common',
		keywords: ['Фильтр', 'фке', 'art', 'filter'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: 'Программа сформирована с учетом возрастных особенностей ребенка'
			},
			selectedPosts: {
				type: 'array',
				default: []
			},
			postsData: {
				type: 'array',
				default: [], // Сохраняем массив данных постов
			},
			anchor: {
				type: 'string'
			},
			selectedShift: {
				type: 'object',
				default: { label: '', value: '' }
			},
		},
		supports: {
			anchor: true
		},
		edit: Edit,
		save: Save
	});
	let ageRanges = [];
	let shiftRanges = [];
	const programsRanges = [
		{ label: 'career-camp', title: 'Лагерь профессий' },
		{ label: 'skills-academy', title: 'Академия навыков' },
		{ label: 'art-community', title: 'Сообщество подростков' },
		{ label: 'travel-by-city', title: 'Узнать город' }
	];
	const placeRanges = [
		{ label: 'Все площадки', value: 'all' },
		{ label: 'Золотая Долина', value: 'Золотая Долина' },
		// { label: 'Ленинградец', value: 'Ленинградец' },
		{ label: 'Сверхновая', value: 'Сверхновая' },
		{ label: 'Розендорф', value: 'Розендорф' },
	];
	const cityRanges = [
		{ label: 'Все города', value: 'all' },
		{ label: 'Москва', value: 'Москва' },
		{ label: 'Санкт-Петербург', value: 'Санкт-Петербург' }
	];
	const seasonRanges = [
		{ label: 'Все сезоны', value: 'all' },
		{ label: 'Лето', value: 'Лето' },
		{ label: 'Осень', value: 'Осень' },
		{ label: 'Зима', value: 'Зима' },
		{ label: 'Весна', value: 'Весна' },
	];
	const daysRanges = [
		{ label: 'Любое количество дней', value: 'all' },
		{ label: 'до 7', value: '7<' },
		{ label: '7-14 дней', value: '7-14' },
		{ label: '>14 дней', value: '>14' },
	];
	const certificateRanges = [
		{ label: 'Да', value: 'Да' },
		{ label: 'Нет', value: 'Нет' },
	];
	const SHIFT_OPTIONS = [
		{ label: 'Список направлений', value: '' },
		{ label: '«Лагерь профессий»', value: 'career-camp' },
		{ label: '«Академия навыков»', value: 'skills-academy' },
		{ label: 'Сообщество подростков', value: 'art-community' },
		{ label: 'Узнать город', value: 'travel-by-city' },
	];
	function Edit(props) {
		const {
			attributes: {
				title,
				description,
				anchor,
				selectedShift
			},
			setAttributes
		} = props;
		const slugAction = selectedShift.value;
		shiftRanges = shiftRangesResult(slugAction);
		ageRanges = ageRangesResult(slugAction);
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					{/* {loading ? (
						<p>Загрузка записей...</p>
					) : (
						<select
							multiple
							value={selectedPosts}
							onChange={handleSelectPosts}
							style={{ width: '100%', height: '150px' }} // Стиль для удобства работы
						>
							{posts.map((post) => (
								<option key={post.id} value={post.id}>
									{post.title.rendered}
								</option>
							))}
						</select>
					)}
					{errorMessage && <p isDismissible={false} style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>} */}
				</PanelBody>
				<PanelBody
					title="Направления"
					initialOpen={true}
				>
					<PanelRow>
						<p>Выберите направление</p>
						<SelectControl
							value={selectedShift?.value || ''}
							options={SHIFT_OPTIONS}
							onChange={(value) => {
								const selectedOption = SHIFT_OPTIONS.find(option => option?.value === value);
								setAttributes({
									selectedShift: {
										label: selectedOption ? selectedOption.label : '',
										value: value
									}
								});
							}}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps} id={anchor}>
				<div className={"wrapper"}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
					/>
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
					/>
					<div className={'container-filter'} data-slug={slugAction}>
						<div className={"filter-section"}>
							<div className={"btn-filter-wrapper filter-wrapper"}>
								<button aria-label="Фильтры" className={"filter-title-btn"}>Фильтры {iconFilter}</button>
								<button aria-label="Search" className={"filter-search-btn"}>{iconSearch}</button>
							</div>
							<div className={"search-filter-wrapper filter-wrapper"}>
								<div className={"filter-items"}>
									<div className={'input-box'}>
										<input type="text" name="s" placeholder="Поиск..." />
										<input type="hidden" name="filterform" value="camp" />
										{iconSearch}
									</div>
								</div>
							</div>
							<div className={'container-filter-items'}>
								{/* <div className={"programs-filter-wrapper filter-wrapper"}>
									<div className={"filter-title"}>Раздел лагеря</div>
									<div className={"filter-items filter-items-no-group"}>
										{programsRanges.map(program => (
											<div className={"program-filter-item filter-item"}>
												<label className={}>
													<input
														type="checkbox"
														name={'program'}
														data-program={program.label}
														defaultChecked={program.label === slugAction} />
													<span className={"title"}>{program.title}</span>
												</label>
											</div>
										))}
									</div>
								</div> */}
								{(slugAction !== 'travel-by-city') && (
									<>
										{/* <CityRangesSection cityRanges={cityRanges} /> */}
										<AgeFilterSection ageRanges={ageRanges} />
										{/* <PlaceRangesSection placeRanges={placeRanges} /> */}
										<SeasonRangesSection seasonRanges={seasonRanges} />
										<DaysRangesSection daysRanges={daysRanges} />
										<ShiftRangesSection shiftRanges={shiftRanges} slugAction={slugAction} />
										<CertificateRangesSection certificateRanges={certificateRanges} />
									</>
								)}
							</div>
						</div>
						<div className={'result-content-filter'}>
							<div id={"filtered-posts-container"}></div>
							<div id={'pagination'}></div>
						</div>
					</div>
					{/* <div className={'see-posts'}>
						<h3>Смотрите также</h3>
						{
							<div className={'see-posts-container'} id="random-posts-container-catalog" data-loaded="true" data-current-post-id="">
								{
									postsData.map( post => <div 
																		key={post.id} 
																		className={} 
																		dangerouslySetInnerHTML={{__html: currentPost(post)}} />
													)
								}
							</div>
						}
					</div> */}
				</div>
			</div>
		];
	}
	function Save(props) {
		const {
			attributes: {
				title,
				description,
				postsData,
				anchor,
				selectedShift
			},
			className
		} = props;
		const slugAction = selectedShift.value;
		shiftRanges = shiftRangesResult(slugAction);
		ageRanges = ageRangesResult(slugAction);
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps} id={anchor}>
				<div className={"wrapper"}>
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'container-filter'} data-slug={slugAction}>
						<div className={"filter-section"}>
							<div className={"btn-filter-wrapper filter-wrapper"}>
								<button aria-label="Фильтры" className={"filter-title-btn"}>Фильтры {iconFilter}</button>
								<button aria-label="Search" className={"filter-search-btn"}>{iconSearch}</button>
							</div>
							<div className={"search-filter-wrapper filter-wrapper"}>
								<div className={"filter-items"}>
									<div className={'input-box'}>
										<input type="text" name="s" placeholder="Поиск..." />
										<input type="hidden" name="filterform" value="camp" />
										{iconSearch}
									</div>
								</div>
							</div>
							<div className={'container-filter-items'}>
								{/* <div className={"programs-filter-wrapper filter-wrapper"}>
									<div className={"filter-title"}>Раздел лагеря</div>
									<div className={"filter-items filter-items-no-group"}>
										{programsRanges.map(program => (
											<div className={"program-filter-item filter-item"}>
												<label className={}>
													<input
														type="checkbox"
														name={'program'}
														data-program={program.label}
														{...(program.label === slugAction ? { checked: true } : {})}
													/>
													<span className={"title"}>{program.title}</span>
												</label>
											</div>
										))}
									</div>
								</div> */}
								{(slugAction !== 'travel-by-city') && (<>
									{/* <CityRangesSection cityRanges={cityRanges} /> */}
									<AgeFilterSection ageRanges={ageRanges} />
									{/* <PlaceRangesSection placeRanges={placeRanges} /> */}
									<SeasonRangesSection seasonRanges={seasonRanges} />
									<DaysRangesSection daysRanges={daysRanges} />
									<ShiftRangesSection shiftRanges={shiftRanges} slugAction={slugAction} />
									<CertificateRangesSection certificateRanges={certificateRanges} />
								</>)}
							</div>
						</div>
						<div className={'result-content-filter'}>
							<div id={"filtered-posts-container"}></div>
							<div id={'pagination'}></div>
						</div>
					</div>
					{/* <div className={'see-posts'}>
						<h3>Смотрите также</h3>
						{
							<div className={'see-posts-container'} id="random-posts-container-catalog" data-loaded="true" data-current-post-id="">
							</div>
						}
					</div> */}
				</div>
			</div>
		)
	};
	const AgeFilterSection = ({ ageRanges }) => (
		<div className={"age-filter-wrapper filter-wrapper"}>
			<div className={"filter-title"}>Возраст ребенка</div>
			<div className={"filter-items filter-items-group"}>
				{ageRanges.map((range, key) => (
					<div key={`age-filter-${range.ages}`} className={"age-filter-item filter-item"}>
						<label className={"checkbox"}>
							<input type={"checkbox"} name={"age"} data-age={range.ages} {...(key === 0 ? { checked: true } : {})} />
							<span className={"title"}>
								{range.label}
							</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
	const PlaceRangesSection = ({ placeRanges }) => (
		<div className={"places-filter-wrapper filter-wrapper"}>
			<div className={"filter-title"}>Выбор площадки</div>
			<div className={"filter-items filter-items-group"}>
				{placeRanges.map((place, key) => (
					<div className={"place-filter-item filter-item"}>
						<label className={"checkbox"}>
							<input type="checkbox" name={'place'} data-place={place.value} {...(key === 0 ? { checked: true } : {})} />
							<span className={"title"}>{place.label}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
	const CityRangesSection = ({ cityRanges }) => (
		<div className={"city-filter-wrapper filter-wrapper"}>
			<div className={"filter-title"}>Выбор города</div>
			<div className={"filter-items filter-items-group"}>
				{cityRanges.map((city, key) => (
					<div className={"city-filter-item filter-item"}>
						<label className={"checkbox"}>
							<input type="checkbox" name={'city'} data-city={city.value} {...(key === 0 ? { checked: true } : {})} />
							<span className={"title"}>{city.label}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
	const SeasonRangesSection = ({ seasonRanges }) => (
		<div className={"season-filter-wrapper filter-wrapper"}>
			<div className={"filter-title"}>Сезон выезда</div>
			<div className={"filter-items filter-items-group"}>
				{seasonRanges.map((season, key) => (
					<div className={"season-filter-item filter-item"}>
						<label className={"checkbox"}>
							<input type="checkbox" name={'season'} data-season={season.value} {...(key === 0 ? { checked: true } : {})} />
							<span className={"title"}>{season.label}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
	const DaysRangesSection = ({ daysRanges }) => (
		<div className={"days-filter-wrapper filter-wrapper"}>
			<div className={"filter-title"}>Дней в смене</div>
			<div className={"filter-items filter-items-group"}>
				{daysRanges.map((day, key) => (
					<div className={"days-filter-item filter-item"}>
						<label className={"checkbox"}>
							<input type="checkbox" name={'days'} data-days={day.value} {...(key === 0 ? { checked: true } : {})} />
							<span className={"title"}>{day.label}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
	const ShiftRangesSection = ({ shiftRanges, slugAction }) => (
		<div className={"shift-filter-wrapper filter-wrapper"}>
			<div className={"filter-title"}>{slugAction === 'art-community' ? 'Выезды' : 'Смена'}</div>
			<div className={"filter-items filter-items-group"}>
				{shiftRanges.map((shift, key) => (
					<div className={"shift-filter-item filter-item"}>
						<label className={"checkbox"}>
							<input type="checkbox" name={'shift'} data-shift={shift.value} {...(key === 0 ? { checked: true } : {})} />
							<span className={"title"}>
								{shift.label}
							</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
	const CertificateRangesSection = ({ certificateRanges }) => (
		<div className={"certificate-filter-wrapper filter-wrapper last-child"}>
			<div className={"filter-title"}>Возможность использовать сертификат</div>
			<div className={"filter-items filter-items-group"}>
				{certificateRanges.map(certificate => (
					<div className={"certificate-filter-item filter-item"}>
						<label className={"checkbox"}>
							<input type="checkbox" name={'certificate'} data-certificate={certificate.value} />
							<span className={"title"}>{certificate.label}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
	function shiftRangesResult(slugAction) {
		if (slugAction === 'art-community') {
			shiftRanges = [
				{ label: 'Все выезды', value: 'all' },
				{ label: '1 выезд', value: '1 выезд' },
				{ label: '2 выезд', value: '2 выезд' },
				{ label: '3 выезд', value: '3 выезд' },
				{ label: '4 выезд', value: '4 выезд' },
				{ label: '5 выезд', value: '5 выезд' },
				{ label: '6 выезд', value: '6 выезд' },
				{ label: 'Межсезонье', value: 'Межсезонье' },
			];
		} else {
			shiftRanges = [
				{ label: 'Все смены', value: 'all' },
				{ label: '1 смена', value: '1 смена' },
				{ label: '2 смена', value: '2 смена' },
				{ label: '3 смена', value: '3 смена' },
				{ label: '4 смена', value: '4 смена' },
				{ label: 'Весна', value: 'Весна' },
				{ label: 'Осень', value: 'Осень' },
				{ label: 'Зима', value: 'Зима' },
			];
		}
		return shiftRanges;
	}
	function ageRangesResult(slugAction) {
		if (slugAction === 'career-camp') {
			ageRanges = [
				{ label: 'Любой возраст', ages: 'all' },
				{ label: '8-10 лет', ages: '8,9,10' },
				{ label: '11-13 лет', ages: '11,12,13' },
				{ label: '14-16 лет', ages: '14,15,16' }
			];
		} else {
			ageRanges = [
				{ label: 'Любой возраст', ages: 'all' },
				{ label: '7-8 лет', ages: '7,8' },
				{ label: '8-10 лет', ages: '8,9,10' },
				{ label: '11-13 лет', ages: '11,12,13' },
				{ label: '14-16 лет', ages: '14,15,16' }
			];
		}
		return ageRanges;
	}
})(
	window.wp
);