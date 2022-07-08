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
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('https://tiktok.fullstack.edu.vn/api/users/search?q=n').then((res) => {
            setUsers(res.data.data);
            setLoading(false);
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
            <Account headingTitle="Suggested accounts" data={users} viewOption="See all" loading={loading} />
            <Account headingTitle="Following accounts" data={users} viewOption="See more" loading={loading} />
        </aside>
    );
}

export default Sidebar;
