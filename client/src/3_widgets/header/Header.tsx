import React, { useEffect } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { NavLink as RouterLink, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { logoutThunk } from '../../4_features/auth/model/authThunks';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import styles from './Header.module.css';
import { getUserByIdThunk } from '../../5_entities/user/model/userThunks';

export default function Header(): React.JSX.Element {
  const data = useAppSelector((store) => store.auth.data);
  const user = useAppSelector((store) => store.user.selectedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.status === AuthStatus.authenticated) {
      dispatch(getUserByIdThunk(data.user.id)).catch(console.error);
    }
  }, [data.status, data.user.id, dispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleProfileClick = (): void => {
    handleMenuClose();
    if (data.status === AuthStatus.authenticated) {
      void navigate(`/profile/${String(data.user.id)}`);
    } else {
      console.error('Пользователь не аутентифицирован или данные отсутствуют');
    }
  };

  const handleLogout = (): void => {
    void dispatch(logoutThunk());
    handleMenuClose();
  };

  return (
    <header className={styles.header}>
      <Navbar expand="lg" className={`py-3 ${styles.navbar}`}>
        <Navbar.Brand as={RouterLink} to="/" className={styles.navbarBrand}>
          <Image src="/imgs/logo.jpg" alt="Logo" className={styles.logo} />
          <span className={styles.brandName}>FrontLearn</span>
        </Navbar.Brand>
        <div className={styles.progressBarContainer}></div>

        <Nav className="ms-auto">
          {data.status === AuthStatus.authenticated ? (
            <div className={styles.userContainer}>
              <span className={styles.username}>{user?.level ?? data.user.level} 📊</span>
              <span className={styles.username}>{user?.points ?? data.user.points} 💎</span>
              <span className={styles.username}>{user?.name ?? data.user.name}</span>

              <IconButton onClick={handleMenuOpen} className={styles.avatarButton}>
                <Avatar
                  alt={data.user.name}
                  src={user?.image ? `/images/${user.image}` : '/imgs/hog.png'}
                  className={styles.avatar}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
                <MenuItem onClick={handleLogout}>Выход</MenuItem>
              </Menu>
            </div>
          ) : null}
        </Nav>
      </Navbar>
    </header>
  );
}
