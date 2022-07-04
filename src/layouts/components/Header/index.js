import config from '~/config';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import Button from '~/components/Button';
import {
    CoinIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    MessageIcon,
    PlusIcon,
    QuestionIcon,
    SettingIcon,
    UserIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

let MENU_ITEM = [
    {
        icon: <LanguageIcon width="2rem" height="2rem" />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'ar',
                    title: 'العربية',
                },
                {
                    type: 'language',
                    code: 'de',
                    title: 'Deutsch',
                },
                {
                    type: 'language',
                    code: 'es',
                    title: 'Español',
                },
                {
                    type: 'language',
                    code: 'fr',
                    title: 'Français',
                },
            ],
        },
    },
    {
        icon: <QuestionIcon width="2rem" height="2rem" />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon width="2rem" height="2rem" />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const avatarRef = useRef();
    const currentUser = true;
    const userMenu = [
        {
            icon: <UserIcon width="2rem" height="2rem" />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <CoinIcon width="2rem" height="2rem" />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <SettingIcon width="2rem" height="2rem" />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEM,
        {
            icon: <LogoutIcon width="2rem" height="2rem" />,
            title: 'Log out',
            to: 'logout',
            separate: true,
        },
    ];

    // Handle logic
    const handleMenuItem = (item) => {
        console.log(item);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="tikkok" />
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    <Button outlineGrey leftIcon={<PlusIcon width="2rem" height="2rem" />}>
                        Upload
                    </Button>
                    {currentUser ? (
                        <>
                            <Tippy content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon width="2.6rem" height="2.6rem" />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>28</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuItem}>
                        {currentUser ? (
                            <Image
                                ref={avatarRef}
                                src="https://static.fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                                className={cx('user-avatar')}
                                fallback="https://static.fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
