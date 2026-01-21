(function (wp) {

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
	const iconFilter = (<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_477_1427)">
			<path d="M1.91899 3.35701V0H1.08101V3.35701C0.769142 3.45545 0.495194 3.6607 0.300279 3.94196C0.105365 4.22321 0 4.5653 0 4.91687C0 5.26844 0.105365 5.61052 0.300279 5.89178C0.495194 6.17303 0.769142 6.37828 1.08101 6.47672V15H1.91899V6.47672C2.23086 6.37828 2.50481 6.17303 2.69972 5.89178C2.89464 5.61052 3 5.26844 3 4.91687C3 4.5653 2.89464 4.22321 2.69972 3.94196C2.50481 3.6607 2.23086 3.45545 1.91899 3.35701Z" fill="#848484"/>
			<path d="M10 10.0831C9.99991 9.73137 9.89439 9.38914 9.6993 9.10786C9.50421 8.82658 9.23008 8.62144 8.9181 8.52328V0H8.0805V8.52328C7.76878 8.62172 7.49496 8.82697 7.30014 9.10822C7.10532 9.38948 7 9.73156 7 10.0831C7 10.4347 7.10532 10.7768 7.30014 11.058C7.49496 11.3393 7.76878 11.5445 8.0805 11.643V15H8.9181V11.643C9.23008 11.5448 9.50421 11.3397 9.6993 11.0584C9.89439 10.7771 9.99991 10.4349 10 10.0831Z" fill="#848484"/>
			</g><defs><clipPath id="clip0_477_1427">
			<rect width="10" height="15" fill="white"/>
			</clipPath></defs></svg>);

	const iconSearch = (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g opacity="0.8">
			<path d="M6.39346 11.6005C9.30931 11.6369 11.6476 9.30809 11.6162 6.39903C11.5847 3.48997 9.19547 1.10222 6.27962 1.06585C3.36377 1.02948 1.02548 3.35826 1.05692 6.26732C1.08836 9.17638 3.47761 11.5641 6.39346 11.6005Z" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M13.0029 13L10.1016 10.0996" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
			</svg>);

	registerBlockType('fv/filter-section-merch', {
		title: 'Каталог мерч',
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

	const sizeRanges = [
		{ label: 'Любой размер', value: 'all' },
		{ label: 'S', value: 'S' },
		{ label: 'M', value: 'M' },
		{ label: 'L', value: 'L' },
		{ label: 'XL', value: 'XL' },
		{ label: 'XXL', value: 'XXL' },
		{ label: '60', value: '60' },
		{ label: '122', value: '122' },
		{ label: '140', value: '140' },
		{ label: '152', value: '152' },
	];

	const heightRanges = [
		{ label: 'Любой рост', value: 'all' },
		{ label: '122', value: '122' },
		{ label: '140', value: '140' },
		{ label: '152', value: '152' },
		{ label: '188', value: '188' },
	];

	function Edit(props) {
		const {
			attributes: {
				title,
				description,
				anchor,
			},
			className,
			setAttributes
		} = props;

		return [
			<InspectorControls>
				
			</InspectorControls>,
			<div className={className} id={anchor}>
				<div className={"wrapper"}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={['']}
					/>
					<div className={'container-filter'}>
						<div className={"filter-section"}>
							<div className={"btn-filter-wrapper filter-wrapper"}>
								<button aria-label="Фильтры" className={"filter-title-btn"}>Фильтры {iconFilter}</button>
								<button aria-label="Search" className={"filter-search-btn"}>{iconSearch}</button>
							</div>
							<div className={"search-filter-wrapper filter-wrapper"}>
								<div className={"filter-items"}>
									<div className={'input-box'}>
										<input type="text" name="s" placeholder="Поиск..." />
										<input type="hidden" name="filterform" value="merch" />
										{iconSearch}
									</div>
								</div>
							</div>
							<div className={'container-filter-items'}>

								<div className={"age-filter-wrapper filter-wrapper"}>
									<div className={"filter-title"}>Размер</div>
									<div className={"filter-items filter-items-group"}>
										{sizeRanges.map((range, key) => (
											<div className={"size-filter-item filter-item"}>
												<label className={"checkbox"}>
													<input 
														type="checkbox" 
														data-size={range.value} 
														name={'size'}
														{...(key === 0 ? { checked: true } : {})}
														/>
													<span className={"title"}>{range.label}</span>
												</label>
											</div>
										))}
									</div>
								</div>

							</div>
						</div>
						<div className={'result-content-filter'}>
							<div id={"filtered-posts-container"}></div>
							<div id={'pagination'}>

							</div>
						</div>
					</div>

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

		return (
			<div className={className} id={anchor}>
				<div className={"wrapper"}>
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'container-filter'}>
						<div className={"filter-section"}>
							<div className={"btn-filter-wrapper filter-wrapper"}>
								<button aria-label="Фильтры" className={"filter-title-btn"}>Фильтры {iconFilter}</button>
								<button aria-label="Search" className={"filter-search-btn"}>{iconSearch}</button>
							</div>
							<div className={"search-filter-wrapper filter-wrapper"}>
								<div className={"filter-items"}>
									<div className={'input-box'}>
										<input type="text" name="s" placeholder="Поиск..." />
										<input type="hidden" name="filterform" value="merch" />
										{iconSearch}
									</div>
								</div>
							</div>

							<div className={'container-filter-items'}>

								<div className={"age-filter-wrapper filter-wrapper"}>
									<div className={"filter-title"}>Размер</div>
									<div className={"filter-items filter-items-group"}>
										{sizeRanges.map((range, key) => (
											<div className={"size-filter-item filter-item"}>
												<label className={"checkbox"}>
													<input 
														type="checkbox" 
														data-size={range.value} 
														name={'size'}
														{...(key === 0 ? { checked: true } : {})}
														/>
													<span className={"title"}>{range.label}</span>
												</label>
											</div>
										))}
									</div>
								</div>
								
							</div>
							
						</div>
						<div className={'result-content-filter'}>
							<div id={"filtered-posts-container"}></div>
							<div id={'pagination'}></div>
						</div>
					</div>

				</div>
			</div>
		)
  	};

})(
	window.wp
);
