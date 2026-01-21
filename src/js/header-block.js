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
		ToggleControl,
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

	const iconVk = (
		<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18.5 37C28.7172 37 37 28.7172 37 18.5C37 8.28276 28.7172 0 18.5 0C8.28276 0 0 8.28276 0 18.5C0 28.7172 8.28276 37 18.5 37Z" fill="white" />
		<path d="M29 10H8V27H29V10Z" fill="#30A933" />
		<mask id="mask0_16_20" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="4" y="4" width="30" height="30">
			<path d="M34 4H4V34H34V4Z" fill="white" />
		</mask>
		<g mask="url(#mask0_16_20)">
			<path fillRule="evenodd" clipRule="evenodd" d="M6.10883 6.10883C4 8.21769 4 11.6118 4 18.4V19.6C4 26.3882 4 29.7823 6.10883 31.8912C8.21769 34 11.6118 34 18.4 34H19.6C26.3882 34 28.3911 32.1088 30.5 30C32.6088 27.8911 34 26.3882 34 19.6V18.4C34 11.6118 34 8.21769 31.8912 6.10883C29.7823 4 26.3882 4 19.6 4H18.4C11.6118 4 8.21769 4 6.10883 6.10883ZM9.06256 13.1251C9.22506 20.9251 13.125 25.6126 19.9625 25.6126H20.3501V21.1501C22.8626 21.4 24.7624 23.2376 25.5249 25.6126H29.0751C28.1001 22.0626 25.5374 20.1001 23.9374 19.3501C25.5374 18.4251 27.7874 16.1751 28.3249 13.1251H25.0998C24.3999 15.6001 22.3251 17.8501 20.3501 18.0625V13.1251H17.125V21.775C15.125 21.2751 12.6001 18.8501 12.4876 13.1251H9.06256Z" fill="white" />
		</g>
		</svg>);

	const iconTg = (
			<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M18.5 37C28.7172 37 37 28.7172 37 18.5C37 8.28276 28.7172 0 18.5 0C8.28276 0 0 8.28276 0 18.5C0 28.7172 8.28276 37 18.5 37Z" fill="white"/>
			<path d="M9.44659 18.3818C9.48569 18.3624 9.52473 18.344 9.56276 18.3265C10.2246 18.0215 10.895 17.7359 11.5645 17.4504C11.6007 17.4504 11.6611 17.4086 11.6953 17.395C11.7471 17.3727 11.7988 17.3513 11.8505 17.329L12.1482 17.2018C12.3473 17.1172 12.5454 17.0328 12.7445 16.9482C13.1418 16.7793 13.539 16.6102 13.9362 16.4403C14.7307 16.1023 15.5262 15.7634 16.3206 15.4253C17.115 15.0874 17.9105 14.7484 18.705 14.4104C19.4995 14.0724 20.2949 13.7335 21.0894 13.3954C21.8839 13.0574 22.6793 12.7185 23.4738 12.3805C23.6504 12.3047 23.8417 12.1921 24.0311 12.159C24.1901 12.1308 24.3453 12.0765 24.5054 12.0464C24.8089 11.9891 25.1437 11.9658 25.4345 12.0911C25.535 12.1347 25.6278 12.1959 25.7049 12.2727C26.0739 12.6359 26.0221 13.2323 25.944 13.7432C25.4003 17.3037 24.8568 20.8653 24.3121 24.4259C24.2379 24.9144 24.1364 25.4505 23.749 25.7594C23.421 26.0207 22.9545 26.0498 22.5495 25.9391C22.1444 25.8274 21.7872 25.5933 21.4368 25.3632C19.9836 24.4055 18.5293 23.4478 17.0761 22.4902C16.7305 22.2629 16.346 21.9658 16.3499 21.553C16.3518 21.3043 16.5012 21.0829 16.6535 20.8857C17.9164 19.2462 19.7386 18.1196 21.0943 16.5559C21.2856 16.3354 21.4358 15.9372 21.1733 15.8099C21.0171 15.7342 20.8375 15.8371 20.6951 15.9352C18.9031 17.1736 17.1121 18.4129 15.3202 19.6512C14.7355 20.0553 14.1227 20.4709 13.418 20.57C12.7875 20.6594 12.1531 20.4846 11.5431 20.3059C11.0317 20.1563 10.5212 20.0028 10.0127 19.8445C9.74233 19.761 9.46321 19.6707 9.25436 19.4813C9.04552 19.2919 8.92545 18.9733 9.05137 18.7208C9.13039 18.5625 9.28364 18.4624 9.4447 18.3809L9.44659 18.3818Z" fill="#30A933"/>
			</svg>);

	const iconCart = (<svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M16.6969 16.1485L15.5769 5.65657C15.4544 4.49189 14.5354 3.61342 13.4436 3.61342H12.0945C11.9977 1.68553 10.4195 0.143066 8.48709 0.143066C6.55473 0.143066 4.97662 1.68442 4.8797 3.61342H3.5563C2.46452 3.61342 1.54548 4.49189 1.42298 5.65657L0.303018 16.1485C0.230732 16.83 0.441482 17.5065 0.883839 18.0008C1.29187 18.4605 1.84327 18.7145 2.44002 18.7145H14.5672C15.1602 18.7145 15.7117 18.4605 16.1234 18.0008C16.562 17.5065 16.7752 16.83 16.7042 16.1485H16.6969ZM8.48705 1.41163C9.72587 1.41163 10.7454 2.38178 10.8397 3.61335H6.13441C6.22877 2.38303 7.24827 1.41163 8.48705 1.41163ZM15.1849 17.1508C15.0183 17.3416 14.7965 17.4432 14.5637 17.4432H2.43777C2.20616 17.4432 1.98316 17.3391 1.81648 17.1508C1.61309 16.9229 1.51505 16.6056 1.54937 16.2823L2.66934 5.79032C2.7257 5.27364 3.10555 4.87964 3.55648 4.87964H4.87127V6.82117C4.87127 7.1706 5.15309 7.45557 5.49862 7.45557C5.8442 7.45557 6.12602 7.17057 6.12602 6.82117V4.87964H10.8498V6.82117C10.8498 7.1706 11.1317 7.45557 11.4772 7.45557C11.8228 7.45557 12.1046 7.17057 12.1046 6.82117V4.87964H13.4439C13.8924 4.87964 14.2747 5.26992 14.331 5.79032L15.451 16.2823C15.4853 16.6056 15.3885 16.9228 15.1839 17.1508H15.1849Z" fill="white"/>
			</svg>);

	registerBlockType('fv/header-block', {
		title: 'Header',
		icon: catIcon,
		category: 'common',
		keywords: ['Header', 'фке', 'art'],
		attributes: {
			vk: {
				type: 'string',
			},
			tg: {
				type: 'string',
			},
			phoneNumber: {
				type: 'string',
				selector: '.phone-number',
				default: '+7 (812) 701-09-19'
			},
			logoIMG: {
            type: 'object',
            default: {},
			},
			selectedMenu: {
            type: 'string',
            default: '',
        	},
			homeUrl: {
            type: 'string',
            default: '',
        	},
			btnTitle: {
            type: 'string',
            default: '',
        	},
			inMerch: {
				type: 'boolean',
				default: null
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				vk,
				tg,
				selectedMenu,
				logoIMG,
				phoneNumber,
				btnTitle,
				inMerch
			},
			className,
			isSelected,
			setAttributes
		} = props;

		const [ menus, setMenus ] = useState([]);
		const [ menuItems, setMenuItems ] = useState([]);

		// Получение списка меню через REST API
		useEffect(() => {
			apiFetch({ path: '/wp/v2/menus' }).then(
				menus => setMenus(menus)
			);
		}, []);

		// Получение элементов выбранного меню
		useEffect(() => {
			if (selectedMenu) {
				apiFetch({ path: `/wp/v2/menu-items?menus=${selectedMenu}` }).then(items => {
					setMenuItems(items);
				});
			}
		}, [selectedMenu]);

		// Получение URL главной страницы
		useEffect(() => {
			apiFetch({ path: '/' }).then((data) => {
				setAttributes({ homeUrl: data.home });
			});
	  	}, []);

		const menuOptions = menus.map(menu => ({
			label: menu.name,
			value: menu.id,
		}));

		const hierarchicalMenu = buildMenuHierarchy(menuItems);
		const flatMenu = processMenuItems(hierarchicalMenu);

		const onSelectLogoIMG = (img) => setAttributes({ logoIMG: { id: img.id, url: img.url, alt: img.alt } });

		return [
			<InspectorControls>
				<PanelBody
					title="Ссылки на соцсети"
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label="Имя пользователя VK"
							onChange={(newValue) => setAttributes({ vk: newValue })}
							value={vk}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Имя пользователя Telegram"
							onChange={(newValue) => setAttributes({ tg: newValue })}
							value={tg}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Название кнопки в Header"
							onChange={ btnTitle => setAttributes({ btnTitle })}
							value={ btnTitle }
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
					<PanelRow>
						<p>Страница Мерч</p>
						<ToggleControl
							checked={inMerch}
							onChange={() => setAttributes({ inMerch: !inMerch })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
					
				</PanelBody>
				<PanelBody 
					title="Настройки меню"
					initialOpen={false}
					>
					<PanelRow>
						<SelectControl
							label="Выберите меню"
							value={selectedMenu}
							options={menuOptions}
							onChange={(newMenu) => setAttributes({ selectedMenu: newMenu })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<header className={className}>

				<div className="wrapper-header">

					<div className="top-block">
						<a aria-label="logo" className="logo" href={'#'}>
							<MediaUpload
								onSelect={onSelectLogoIMG}
								allowedTypes={['image']}
								render={({ open }) => (
									<Button onClick={open} className="button button-large">
										{logoIMG.url ? <img width={'112px'} height={'51px'} src={logoIMG.url} alt={logoIMG.alt} /> : 'Загрузить лого'}
									</Button>
								)}
							/>
						</a>
						<div className={'menu-for-desktop'}>
							<div className="menu-header-menu-container">
								<ul id="menu-header-menu" class="menu">
									{ flatMenu.map(item => <MenuItem key={item.value} item={item} />) }
								</ul>
							</div>
						</div>
						
						<div className="right">
							{ (vk || tg || inMerch) && <div className="social-icons">
								{inMerch && <button className={'in-merch'}>{iconCart}<span>0</span></button>}
								{ vk && <a href={'https://vk.com/' + vk}  className={'vk'}>{iconVk}</a> }
								{ tg && <a href={'https://t.me/' + tg}  className={'tg'}>{iconTg}</a> }
							</div> }

							<a href={'#filter'} aria-label={'btn-title'} className={'btn-title '}>{btnTitle}</a>
							
							<div className="menu-icon">
								<span></span>
							</div>

							<RichText
								tagName="a"
								onChange={(newValue) => setAttributes({ phoneNumber: newValue })}
								value={phoneNumber}
								placeholder="Номер телефона..."
								// allowedFormats={[]}
							/>
							
						</div>
					</div>
					
					<div className="website-mobile-menu">
						<a aria-label="mobile logo" className="logo" href="#">
							<img width={'112px'} height={'51px'} src={logoIMG.url} alt={logoIMG.alt} />
						</a>
						{/* Отображение меню в режиме редактирования */}
						<div className="menu-header-menu-container">
							<ul id="menu-header-menu" class="menu">
								{ flatMenu.map(item => <MenuItem key={item.value} item={item} />) }
							</ul>
						</div>
						
						{ (vk || tg) && <div className="social-icons">
							{ vk && <a href={'https://vk.com/' + vk} className={'vk'}>{iconVk}</a> }
							{ tg && <a href={'https://t.me/' + tg} className={'tg'}>{iconTg}</a> }
						</div> }
					</div>

				</div>
			</header>
		];
	}

	function Save(props) {
		const {
			attributes: {
				vk,
				tg,
				logoIMG,
				phoneNumber,
				homeUrl,
				btnTitle,
				inMerch
			},
			className
		} = props;

		let formattedPhoneNumber = phoneNumber.replace(/[\s()-]/g, '');

		return (
			<header className={className}>
				<div className="wrapper-header">

					<div className="top-block">
						<a aria-label="logo" className="logo" href={homeUrl}>
							<img width={'112px'} height={'51px'} src={logoIMG.url} alt={logoIMG.alt} />
						</a>

						<div className={'menu-for-desktop'}>
							<div data-placeholder="menu-placeholder"></div>
						</div>

						<div className="right">
							{ (vk || tg || inMerch) && <div className="social-icons">
								{inMerch && <button className={'in-merch'}>{iconCart}<span>0</span></button>}
								{ vk && <a href={'https://vk.com/' + vk} target={'_blank'} aria-label={'vk'} className={'vk'}>{iconVk}</a> }
								{ tg && <a href={'https://t.me/' + tg} target={'_blank'} aria-label={'tg'} className={'tg'}>{iconTg}</a> }
							</div> }
							{btnTitle && <a href={'#filter'} aria-label={'btn-title'} className={'btn-title '}>{btnTitle}</a>}
							<div className="menu-icon">
								<span></span>
							</div>
							<a href={`tel:${formattedPhoneNumber}`} className={'phone-number'}>{RichText.Content({ value: phoneNumber })}</a>
							
						</div>
					</div>
					<div className="website-mobile-menu">
						<a aria-label="mobile logo" className="logo" href={homeUrl}>
							<img width={'112px'} height={'51px'} src={logoIMG.url} alt={logoIMG.alt} />
						</a>
						<div data-placeholder="menu-placeholder"></div>
						
						{ (vk || tg) && <div className="social-icons">
							{ vk && <a href={'https://vk.com/' + vk} target={'_blank'} aria-label={'vk'} className={'vk'}>{iconVk}</a> }
							{ tg && <a href={'https://t.me/' + tg} target={'_blank'} aria-label={'tg'} className={'tg'}>{iconTg}</a> }
						</div> }

					</div>

				</div>
			</header>
		)
  	};

	function buildMenuHierarchy(items) {
		const lookup = {};
		const rootItems = [];
		
		// Инициализируем объекты и связываем детей к их родителям
		items.forEach(item => {
			item.children = [];
			lookup[item.id] = item;
			
			if (item.parent === 0) {
				rootItems.push(item);
			} else {
				lookup[item.parent]?.children.push(item);
			}
		});
		
		return rootItems;
	}
	
	function processMenuItems(items, level = 0) {
		return items.map(item => {
			const newItem = {
				label: item.title.rendered,
				value: item.id,
				url: item.url,
			};

			if (item.children && item.children.length > 0) {
				newItem.submenu = processMenuItems(item.children, level + 1);
			}

			return newItem;
		});
	}
	
	function MenuItem({ item }) {
		const itemChildren = (item.submenu && item.submenu.length > 0) ? 'menu-item-has-children' : '';
		return (
			<li id={'menu-item-' + item.value} class={'menu-item' + ' ' + itemChildren}>
				<a aria-label="menu" href={item.url}>{item.label}</a>
				
				{item.submenu && item.submenu.length > 0 && (
					<ul className={'sub-menu'}>
						{item.submenu.map(subItem => (
							<MenuItem key={subItem.value} item={subItem} />
						))}
					</ul>
				)}
			</li>
		);
	}
	
})(
	window.wp
);
