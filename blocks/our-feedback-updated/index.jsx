(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, RangeControl } = wp.components;
	const { useEffect, useRef } = wp.element;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconForSlide1 = (<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.2344 0.78125H0.390625C0.174889 0.78125 0 0.956139 0 1.17187V16.0156C0 16.2314 0.174889 16.4062 0.390625 16.4062H15.2344C15.4501 16.4062 15.625 16.2314 15.625 16.0156V1.17187C15.625 0.956139 15.4501 0.78125 15.2344 0.78125Z" fill="#BEBEBE" fillOpacity="0.3" />
		<path d="M33.9844 0.78125H19.1406C18.9249 0.78125 18.75 0.956139 18.75 1.17187V16.0156C18.75 16.2314 18.9249 16.4062 19.1406 16.4062H33.9844C34.2001 16.4062 34.375 16.2314 34.375 16.0156V1.17187C34.375 0.956139 34.2001 0.78125 33.9844 0.78125Z" fill="#BEBEBE" fillOpacity="0.3" />
	</svg>);
	const iconForSlide2 = (<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.16859 23.1016C6.16859 23.1016 2.95765 17.3828 1.60609 14.9063C-0.190788 11.6094 -0.487672 10.2188 0.754524 9.53125C1.52796 9.10156 2.59827 9.28125 3.25452 10.4219L4.78577 12.8594V3.30469C4.78577 3.30469 4.69202 0.78125 6.4889 0.78125C8.40297 0.78125 8.23891 3.30469 8.23891 3.30469V7.94531C8.23891 7.94531 9.24672 7.21875 10.4264 7.54688C11.028 7.71094 11.7311 8 12.1061 8.95313C12.1061 8.95313 14.5045 7.78906 15.6998 10.2656C15.6998 10.2656 18.4655 9.71875 18.4655 12.5859C18.4655 15.4531 15.0123 23.1016 15.0123 23.1016H6.16859Z" fill="#BEBEBE" />
	</svg>);
	const leftArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M8 1L1.56568 7.43431C1.25327 7.74673 1.25327 8.25327 1.56569 8.56568L8 15" stroke="#535353" strokeLinecap="round" />
	</svg>);
	const rightArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 15L7.43432 8.56569C7.74674 8.25327 7.74673 7.74674 7.43432 7.43432L1 1" stroke="#535353" strokeLinecap="round" />
	</svg>);
	const iconPlay = (<svg width="23" height="38" viewBox="0 0 23 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M23 19L0.5 37.1865L0.500002 0.813466L23 19Z" fill="#535353" />
	</svg>);
	registerBlockType("fv/our-feedback-updated", {
		apiVersion: 3,
		title: 'Наши отзывы мск',
		icon: catIcon,
		category: 'common',
		keywords: ['Наши отзывы мск', 'our feedback updated', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			// Первая вкладка
			blocksData: {
				type: 'array',
				default: [{ image: '', video: '', title: '', description: '', label: '' }],
			},
			columns: {
				type: 'number',
				default: 4,
			},
			classSlider: {
				type: 'string',
				default: ''
			},
			// Вторая вкладка
			blocksData2: {
				type: 'array',
				default: [{ image: '', video: '', title: '', description: '', label: '' }],
			},
			columns2: {
				type: 'number',
				default: 4,
			},
			classSlider2: {
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
				blocksData,
				columns,
				classSlider,
				blocksData2,
				columns2,
				classSlider2
			},
			isSelected,
			setAttributes
		} = props;
		// Эффект для первой вкладки
		useEffect(() => {
			if (columns > blocksData.length) {
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ image: '', video: '', title: '', description: '', label: '' });
				}
				setAttributes({ blocksData: newBlocksData });
			} else if (columns < blocksData.length) {
				setAttributes({ blocksData: blocksData.slice(0, columns) });
			}
		}, [columns]);
		// Эффект для второй вкладки
		useEffect(() => {
			if (columns2 > blocksData2.length) {
				const newBlocksData2 = [...blocksData2];
				while (newBlocksData2.length < columns2) {
					newBlocksData2.push({ image: '', video: '', title: '', description: '', label: '' });
				}
				setAttributes({ blocksData2: newBlocksData2 });
			} else if (columns2 < blocksData2.length) {
				setAttributes({ blocksData2: blocksData2.slice(0, columns2) });
			}
		}, [columns2]);
		// Refs для Swiper
		const swiperRef = useRef(null);
		const swiperRef2 = useRef(null);
		const containerRef = useRef(null);
		const containerRef2 = useRef(null);
		// Эффект для первого слайдера
		useEffect(() => {
			const timer = setTimeout(() => {
				if (typeof Swiper !== 'undefined' && containerRef.current && columns > 0) {
					if (swiperRef.current) {
						swiperRef.current.destroy(true, true);
						swiperRef.current = null;
					}
					const slider = containerRef.current.querySelector('.' + classSlider);
					const slider_pagination = containerRef.current.querySelector('.' + classSlider + '-pagination-btns');
					if (slider && slider_pagination) {
						const prevBtn = slider_pagination.querySelector('.swiper-button-prev');
						const nextBtn = slider_pagination.querySelector('.swiper-button-next');
						try {
							swiperRef.current = new Swiper(slider, {
								slidesPerView: 2,
								spaceBetween: 20,
								slidesPerGroup: 1,
								navigation: {
									nextEl: nextBtn,
									prevEl: prevBtn,
								},
								observer: true,
								observeParents: true,
								observeSlideChildren: true,
							});
						} catch (error) {
							console.error('Swiper initialization error:', error);
						}
					}
				}
			}, 100);
			return () => {
				clearTimeout(timer);
				if (swiperRef.current) {
					swiperRef.current.destroy(true, true);
					swiperRef.current = null;
				}
			};
		}, [columns, classSlider]);
		// Эффект для второго слайдера
		useEffect(() => {
			const timer = setTimeout(() => {
				if (typeof Swiper !== 'undefined' && containerRef2.current && columns2 > 0) {
					if (swiperRef2.current) {
						swiperRef2.current.destroy(true, true);
						swiperRef2.current = null;
					}
					const slider = containerRef2.current.querySelector('.' + classSlider2);
					const slider_pagination = containerRef2.current.querySelector('.' + classSlider2 + '-pagination-btns');
					if (slider && slider_pagination) {
						const prevBtn = slider_pagination.querySelector('.swiper-button-prev');
						const nextBtn = slider_pagination.querySelector('.swiper-button-next');
						try {
							swiperRef2.current = new Swiper(slider, {
								slidesPerView: 2,
								spaceBetween: 20,
								slidesPerGroup: 1,
								navigation: {
									nextEl: nextBtn,
									prevEl: prevBtn,
								},
								observer: true,
								observeParents: true,
								observeSlideChildren: true,
							});
						} catch (error) {
							console.error('Swiper initialization error:', error);
						}
					}
				}
			}, 100);
			return () => {
				clearTimeout(timer);
				if (swiperRef2.current) {
					swiperRef2.current.destroy(true, true);
					swiperRef2.current = null;
				}
			};
		}, [columns2, classSlider2]);
		// Функция обновления данных для первой вкладки
		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData: newBlocksData });
		};
		// Функция обновления данных для второй вкладки
		const updateBlockData2 = (index, key, value) => {
			const newBlocksData2 = [...blocksData2];
			newBlocksData2[index][key] = value;
			setAttributes({ blocksData2: newBlocksData2 });
		};
		// Функция рендера слайдов для первой вкладки
		const renderSlides = (data, updateFn, count, sliderClass) => {
			return Array.from({ length: count }, (x, index) => {
				const imageURL = data[index]?.image?.url;
				const videoURL = data[index]?.video?.url;
				const title = data[index]?.title || '';
				const description = data[index]?.description || '';
				const label = data[index]?.label || '';
				return (
					<li key={index} className={'swiper-slide slide item-' + (index + 1)}>
						<div className={'slide-item'}>
							<div className="top-container">
								{!!videoURL ? (
									<>
										{videoFrame(videoURL)}
										{isSelected && (
											<Button onClick={() => updateFn(index, 'video', null)} className={'remove-video'}>
												Удалить видео
											</Button>
										)}
									</>
								) : (
									<MediaUpload
										onSelect={value => updateFn(index, 'video', value)}
										allowedTypes={['video']}
										value={data[index]?.video ? data[index].video.id : ''}
										render={({ open }) => (
											<Button onClick={open} variant="secondary">
												Загрузить видео
											</Button>
										)}
									/>
								)}
								{!!imageURL ? (
									<>
										<img src={imageURL} alt={'photo'} width={"100%"} height={"auto"} className="image-for-video" />
										{isSelected && <Button onClick={() => updateFn(index, 'image', null)} className={'remove-img'}>
											Удалить картинку
										</Button>}
									</>
								) : (
									<MediaUpload
										allowedTypes={['image']}
										onSelect={value => updateFn(index, 'image', value)}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												Загрузить картинку
											</Button>
										)}
									/>
								)}
							</div>
							<div className="right-text">
								<RichText
									tagName="span"
									className="title-slide"
									onChange={(value) => updateFn(index, 'title', value)}
									value={title}
									placeholder="Заголовок..."
								/>
								<RichText
									tagName="p"
									className="description-slide"
									onChange={(value) => updateFn(index, 'description', value)}
									value={description}
									placeholder="Описание..."
								/>
								<RichText
									tagName="span"
									className="label-slide"
									onChange={(value) => updateFn(index, 'label', value)}
									value={label}
									placeholder="Имя..."
								/>
							</div>
						</div>
					</li>
				);
			});
		};
		// Функция рендера слайдера
		const renderSlider = (data, updateFn, count, sliderClass, containerRef, columnsAttr) => {
			return (
				<div className="my-swiper-feedback" ref={containerRef} data-slider={sliderClass}>
					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>
					<div className={'slider-container'}>
						<div className={sliderClass + ' swiper'}>
							<ul className={'swiper-wrapper'}>
								{renderSlides(data, updateFn, count, sliderClass)}
							</ul>
						</div>
						<div className={sliderClass + '-pagination-btns slider-pagination'}>
							<span className={'left-btn swiper-button-prev'}>{leftArr}</span>
							<span className={'right-btn swiper-button-next'}>{rightArr}</span>
						</div>
					</div>
				</div>
			);
		};
		const handleTabClick = (event) => {
			const listItem = event.target.closest('li');
			if (!listItem) return;
			event.stopPropagation();
			const currentSelectUl = listItem.parentElement;
			if (currentSelectUl) {
				currentSelectUl.querySelectorAll('li').forEach((li) => {
					li.classList.remove('active');
				});
				listItem.classList.add('active');
				currentSelectUl.classList.remove('active');
			}
			const selectBlock = listItem.closest('.select-block');
			if (selectBlock) {
				const selectTitle = selectBlock.querySelector('.select-title');
				if (selectTitle) {
					selectTitle.classList.remove('active');
					const name = listItem.textContent;
					selectTitle.textContent = name;
				}
				const slug = listItem.getAttribute('data-slug');
				const contentTab = selectBlock.nextElementSibling;
				if (contentTab && contentTab.classList.contains('content-tab')) {
					const itemTabs = contentTab.querySelectorAll('.item-tab');
					itemTabs.forEach((itemTab) => {
						if (itemTab.classList.contains(slug)) {
							contentTab.querySelectorAll('.item-tab').forEach((otherTab) => {
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
				<PanelBody title="Настройки блока" initialOpen={true}>
					{/* Настройки для первой вкладки */}
					<h3>Вкладка "Родители"</h3>
					<PanelRow>
						<p>Количество элементов</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns}
							onChange={value => setAttributes({ columns: value })}
							min={1}
							max={12}
						/>
					</PanelRow>
					<PanelRow>
						<p>Добавить класс для слайдера</p>
						<TextControl
							onChange={value => setAttributes({ classSlider: value })}
							value={classSlider}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					{/* Настройки для второй вкладки */}
					<h3>Вкладка "Дети"</h3>
					<PanelRow>
						<p>Количество элементов</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns2}
							onChange={value => setAttributes({ columns2: value })}
							min={1}
							max={12}
						/>
					</PanelRow>
					<PanelRow>
						<p>Добавить класс для слайдера</p>
						<TextControl
							onChange={value => setAttributes({ classSlider2: value })}
							value={classSlider2}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
					/>
					<div className={'select-block'}>
						<ul className={'select-ul'}>
							<li data-slug={'first'} className={'active'} onClick={handleTabClick}>Родители</li>
							<li data-slug={'second'} onClick={handleTabClick}>Дети</li>
						</ul>
					</div>
					<div className={'content-tab'}>
						<div className="item-tab first active">
							{renderSlider(blocksData, updateBlockData, columns, classSlider, containerRef, columns)}
						</div>
						<div className="item-tab second">
							{renderSlider(blocksData2, updateBlockData2, columns2, classSlider2, containerRef2, columns2)}
						</div>
					</div>
				</div>
			</div>
		];
	}
	function Save(props) {
		const {
			title,
			blocksData,
			classSlider,
			blocksData2,
			classSlider2
		} = props.attributes;
		const blockProps = useBlockProps.save();
		// Функция рендера слайдов для Save
		const renderSlidesSave = (data) => {
			return data.map((block, index) => (
				<li key={index} className={'swiper-slide slide item-' + (index + 1)}>
					<div className={'slide-item'}>
						<div className="top-container">
							{block.video?.url && videoFrame(block.video.url)}
							{block.image?.url && (
								<img
									src={block.image.url}
									alt={block.image.alt || ''}
									className={'image-for-video'}
									width={"100%"}
									height={"auto"}
								/>
							)}
						</div>
						<div className="right-text">
							{block.title && <span className="title-slide">{block.title}</span>}
							{block.description && <p className="description-slide">{block.description}</p>}
							{block.label && <span className="label-slide">{block.label}</span>}
						</div>
					</div>
				</li>
			));
		};
		// Функция рендера слайдера для Save
		const renderSliderSave = (data, sliderClass) => {
			return (
				<div className={'my-swiper-feedback'} data-slider={sliderClass}>
					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>
					<div className={'slider-container'}>
						<div className={sliderClass + ' swiper'}>
							<ul className={'swiper-wrapper'}>
								{renderSlidesSave(data)}
							</ul>
						</div>
						<div className={sliderClass + '-pagination-btns slider-pagination'}>
							<span className={'left-btn swiper-button-prev'}>{leftArr}</span>
							<span className={'right-btn swiper-button-next'}>{rightArr}</span>
						</div>
					</div>
				</div>
			);
		};

		return (
			<div {...blockProps}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<div className={'select-block'}>
						<ul className={'select-ul'}>
							<li data-slug={'first'} className={'active'}>Родители</li>
							<li data-slug={'second'}>Дети</li>
						</ul>
					</div>
					<div className={'content-tab'}>
						<div className="item-tab first active">
							{renderSliderSave(blocksData, classSlider)}
						</div>
						<div className="item-tab second">
							{renderSliderSave(blocksData2, classSlider2)}
						</div>
					</div>
				</div>
			</div>
		);
	}
	function videoFrame(videoURL) {
		return (
			<div className={'content-video'}>
				<video
					src={videoURL}
					preload="none"
					frameBorder="0"
					allow="autoplay; encrypted-media"
				>
					<source src={videoURL} type="video/mp4" />
				</video>
				<span className={'play-video'}>{iconPlay}</span>
			</div>
		);
	}
})(
	window.wp
);