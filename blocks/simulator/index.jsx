(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText, useBlockProps } = wp.blockEditor || wp.editor;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconCursor = (<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_477_1144)">
								<path d="M6.99219 7L9.49189 13L10.3793 10.3872L12.9922 9.49971L6.99219 7Z" stroke="white" stroke-width="0.670029" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M9.99219 11L11.9922 13" stroke="white" stroke-width="0.670029" stroke-linecap="round" stroke-linejoin="round"/>
								</g><path d="M6.99219 3.4707L6.99219 0.470707" stroke="white" stroke-width="0.670029" stroke-linecap="round"/>
								<path d="M3.99219 6.46973L0.996847 6.30259" stroke="white" stroke-width="0.670029" stroke-linecap="round"/>
								<path d="M5 4.4707L3.60293 3.03955" stroke="white" stroke-width="0.670029" stroke-linecap="round"/>
								<defs><clipPath id="clip0_477_1144"><rect width="8" height="9" fill="white" transform="translate(5.99219 6)"/></clipPath>
								</defs></svg>
							);
	registerBlockType("fv/simulator", {
		title: 'Тренажёр',
		icon: catIcon,
		category: 'common',
		keywords: ['Тренажёр', 'фке', 'art', 'nhtyf;'],
		attributes: {
			title: {
				type: 'string',
				default: '«Лагерь профессий» — это «тренажёр» перед профессиональным выбором во взрослой жизни'
			},
			title1: {
				type: 'string',
				default: 'Занятия по профессии проводят опытные наставники, практикующие специалисты в своей области'
			},
			title2: {
				type: 'string',
				default: 'Одна смена = одна профессия'
			},
			title3: {
				type: 'string',
				default: 'Практика, а не теория'
			},
			title4: {
				type: 'string',
				default: 'Проектный метод'
			},
			description2: {
				type: 'string',
				default: 'Дети заранее выбирают одну профессию, внутри которой будут работать на протяжении всей смены — такой подход позволяет ребенку узнать профессию изнутри'
			},
			description3: {
				type: 'string',
				default: 'В лагере мы формируем программу так, чтобы каждому ребенку было интересно: применяем игровые методики, на практике решаем реальные задачи внутри профессии, создаем и презентуем проекты'
			},
			description4: {
				type: 'string',
				default: 'В финале каждой смены дети создают проект по профессии, который позволяет на практике применить полученные знания. Это первый и важный шаг к созданию будущего портфолио!'
			},
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				title,
				title1,
				title2,
				title3,
				title4,
				description2,
				description3,
				description4
			},
			className,
			isSelected,
			setAttributes
		} = props;

		const blockProps = useBlockProps();

		return [
			<></>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'item-block first-item-block'}>
						<div className={'icon icon1'}>Клипмейкер</div>
						<div className={'icon icon2'}>Фотограф</div>
						<div className={'icon icon3'}>Хореограф</div>
						<div className={'icon icon4'}>{iconCursor}Мультипликатор</div>
						<RichText
							tagName="span"
							onChange={ value => setAttributes({ title1: value })}
							value={title1}
							placeholder="Укажите заголовок..."
							// allowedFormats={[]}
						/>
					</div>
					<div className={'right-block'}>
						<div className={'item-block'}>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title2: value })}
								value={title2}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description2: value })}
								value={description2}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item-block'}>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title3: value })}
								value={title3}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description3: value })}
								value={description3}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item-block  last-item-block'}>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title4: value })}
								value={title4}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description4: value })}
								value={description4}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
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
				title1,
				title2,
				title3,
				title4,
				description2,
				description3,
				description4
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'item-block first-item-block'}>
						<div className={'icon icon1'}>Клипмейкер</div>
						<div className={'icon icon2'}>Фотограф</div>
						<div className={'icon icon3'}>Хореограф</div>
						<div className={'icon icon4'}>{iconCursor}Мультипликатор</div>
						<RichText.Content tagName="span" value={title1} />
					</div>
					<div className={'right-block'}>
						<div className={'item-block'}>
							<RichText.Content tagName="span" value={title2} />
							<RichText.Content tagName="p" value={description2} />
						</div>
						<div className={'item-block'}>
							<RichText.Content tagName="span" value={title3} />
							<RichText.Content tagName="p" value={description3} />
						</div>
						<div className={'item-block  last-item-block'}>
							<RichText.Content tagName="span" value={title4} />
							<RichText.Content tagName="p" value={description4} />
						</div>
					</div>
				</div>
			</div>
		)
  	};
})(
	window.wp
);