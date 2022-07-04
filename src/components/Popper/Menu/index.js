import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false, onChange = () => {} }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    // Render Menu
    const renderMenu = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prevState) => [...prevState, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            hideOnClick={hideOnClick}
            placement="bottom-end"
            delay={[0, 700]}
            interactive
            offset={[8, 12]}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    const newHistory = [...history];
                                    newHistory.splice(newHistory.length - 1, 1);

                                    setHistory([...newHistory]);
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{renderMenu()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prevState) => prevState.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
