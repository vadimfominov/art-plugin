(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody, PanelRow, RangeControl, Button } = wp.components;
	const { useEffect } = wp.element;
	const { ListEditor, DubleListEditor } = window;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/day-and-shift", {
		title: 'Актуальные направления',
		icon: catIcon,
		category: 'common',
		keywords: ['Актуальные направления', 'day-and-shift', 'фке', 'art'],
		attributes: {
			tabTitle: {
				type: 'string',
				default: ''
			},
			tabDescription1: {
				type: 'string',
				default: ''
			},
			tabDescription2: {
				type: 'string',
				default: ''
			},
			listItems: {
				type: 'array',
				default: [
					{ field1: '', field2: '' }
				]
			},
			listItems2: {
				type: 'array',
				default: ['']
			}
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				listItems,
				listItems2,
				tabTitle,
				tabDescription1,
				tabDescription2
			},
			className,
			isSelected,
			setAttributes,
		} = props;
		const handleTabClick = (event) => {
			const listItem = event.target.closest('li');
			if (!listItem) return;
			event.stopPropagation();
			const currentSelectUl = listItem.parentElement;
			if (currentSelectUl) {
				// Убираем active у всех li в текущем select-ul
				currentSelectUl.querySelectorAll('li').forEach(function (li) {
					li.classList.remove('active');
				});
				listItem.classList.add('active');
				currentSelectUl.classList.remove('active');
			}
			const selectBlock = listItem.closest('.select-block');
			if (selectBlock) {
				const selectTitle = selectBlock?.querySelector('.select-title');
				if (selectTitle) {
					selectTitle.classList.remove('active');
					const name = listItem.textContent;
					selectTitle.textContent = name;
				}
				const slug = listItem.getAttribute('data-slug');
				const wrapper = selectBlock.closest('.wrapper');
				const contentTab = wrapper.querySelector('.content-tab');
				if (contentTab && contentTab.classList.contains('content-tab')) {
					const itemTabs = contentTab.querySelectorAll('.item-tab');
					itemTabs.forEach(function (itemTab) {
						if (itemTab.classList.contains(slug)) {
							// Убираем active только у табов в текущем contentTab
							contentTab.querySelectorAll('.item-tab').forEach(function (otherTab) {
								otherTab.classList.remove('active');
							});
							itemTab.classList.add('active');
						}
					});
				}
			}
		};
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
			</InspectorControls>,
			<div {...blockProps}>
				<div className="wrapper">
					<div className={'block-container'}>
						<div className="left-block">
							<RichText
								tagName="h2"
								className="title1"
								onChange={(value) => setAttributes({ tabTitle: value })}
								value={tabTitle}
								placeholder="Заголовок..."
							/>
							<div class="select-block">
								<ul class="select-ul">
									<li data-slug="first" class="active" onClick={handleTabClick}>День</li>
									<li data-slug="second" onClick={handleTabClick}>Смена</li>
								</ul>
							</div>
							<RichText
								tagName="p"
								className="title2"
								onChange={(value) => setAttributes({ tabDescription1: value })}
								value={tabDescription1}
								placeholder="Описание..."
							/>
							<RichText
								tagName="p"
								className="descr2"
								onChange={(value) => setAttributes({ tabDescription2: value })}
								value={tabDescription2}
								placeholder="Описание..."
							/>
						</div>
						<div className="content-tab">
							<div className={'item-tab first right-block tab-1 active'}>
								<DubleListEditor
									items={listItems}
									onChange={(newItems) => setAttributes({ listItems: newItems })}
									field1Placeholder="Время"
									field2Placeholder="Описание"
									blockIndex={0}
									showRemoveButton={true}
									showAddButton={true}
									field1TagName="span"  // можно изменить тег для первого поля
									field2TagName="p"    // можно изменить тег для второго поля
								/>
							</div>
							<div className={'item-tab second right-block tab-2'}>
								<ListEditor
									items={listItems2}
									onChange={(newItems) => setAttributes({ listItems2: newItems })}
									placeholder="Ваш пункт"
									blockIndex={0}
								/>
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
				listItems,    // С двумя полями
				listItems2,   // С одним полем
				tabTitle,
				tabDescription1,
				tabDescription2
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className="wrapper">
					<div className={'block-container'}>
						<div className="left-block">
							<RichText.Content tagName="h2" className="title1" value={tabTitle} />
							<div class="select-block">
								<ul class="select-ul">
									<li data-slug="first" class="active">День</li>
									<li data-slug="second">Смена</li>
								</ul>
							</div>
							<RichText.Content tagName="p" className="title2" value={tabDescription1} />
							<RichText.Content tagName="p" className="descr2" value={tabDescription2} />
						</div>
						{/* СПИСОК С ДВУМЯ ПОЛЯМИ */}
						<div className="content-tab">
							<div className="item-tab first right-block tab-1 active">
								{listItems && listItems.length > 0 && (
									<div className="items">
										{listItems.map((item, i) => (
											<div className="item" key={i}>
												<span dangerouslySetInnerHTML={{ __html: item.field1 }} />
												<p dangerouslySetInnerHTML={{ __html: item.field2 }} />
											</div>
										))}
									</div>
								)}
							</div>
							{/* СПИСОК С ОДНИМ ПОЛЕМ */}
							<div className="item-tab second right-block tab-2">
								{listItems2 && listItems2.length > 0 && (
									<div className="items">
										{listItems2.map((item, i) => (
											<div className="item" key={i} dangerouslySetInnerHTML={{ __html: item }} />
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
})(
	window.wp
);