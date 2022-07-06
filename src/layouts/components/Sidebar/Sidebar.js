import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from '~/layouts/components/Sidebar/Menu';
import config from '~/config';
import { HomeIcon, UsersIcon, LiveIcon, HomeActiveIcon, UsersActiveIcon, LiveActiveIcon } from '~/components/Icons';
import Account from './Account';

const cx = classNames.bind(styles);

function Sidebar() {
    // Data user
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://tiktok.fullstack.edu.vn/api/users/search?q=h').then((res) => {
            setUsers(res.data.data);
        });
    }, []);
    // End data user

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UsersIcon />}
                    activeIcon={<UsersActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <Account headingTitle="Suggested accounts" data={users} viewOther="See all" />
            <Account headingTitle="Following accounts" data={users} viewOther="See more" />
        </aside>
    );
}

export default Sidebar;
