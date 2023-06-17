import { Nav, Container, Navbar, Dropdown } from 'react-bootstrap';
import clsx from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/appSlice';
import hust from '~/assets/images/hust.png';
import styles from './LayoutDashboard.module.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import UserApi from '~/api/UserApi';
import { setAccount } from '~/store/appSlice';
function LayoutDashboard({ children }) {
    const account = useSelector((state) => state.app.account);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(signOut());
        navigate('/');
    };
    useEffect(() => {
        if (account === undefined) {
            UserApi.getInforUser().then((res) => {
                dispatch(setAccount(res.data));
            });
        }
    }, [account]);
    return (
        <div>
            <Navbar expand="lg" className="shadow-lg fixed-top bg-white" style={{ height: '84px' }}>
                <div className="container-xl">
                    <div>
                        <Navbar.Brand href="/dashboard">
                            <img src={hust} className="img-fluid" style={{ height: '48px' }}></img>
                        </Navbar.Brand>
                    </div>
                    <div className="d-flex align-items-center position-relative">
                        <div className={clsx(styles.nav, 'border-end border-3')}>
                            <Navbar.Toggle aria-controls="navbarScroll" className={styles.navToggle} />
                            <Navbar.Collapse id="navbarScroll" className={styles.navCollapse}>
                                <Nav className="me-auto my-2 my-lg-0">
                                    <div className={clsx(styles.navContainer, 'me-5 d-flex align-items-center')}>
                                        <div className="py-2 me-3" onClick={() => navigate('/dashboard')}>
                                            <span
                                                className={clsx('fw-semibold fs-5', {
                                                    [styles.active]: location.pathname === '/dashboard',
                                                })}
                                                role="button"
                                            >
                                                Tổng quan
                                            </span>
                                        </div>
                                        <div className="py-2 me-3" onClick={() => navigate('/book')}>
                                            <span
                                                className={clsx('fw-semibold fs-5', {
                                                    [styles.active]: location.pathname.includes('/book'),
                                                })}
                                                role="button"
                                            >
                                                Sách
                                            </span>
                                        </div>
                                        <div className="py-2 me-3" onClick={() => navigate('/account')}>
                                            <span
                                                className={clsx('fw-semibold fs-5', {
                                                    [styles.active]: location.pathname.includes('/account'),
                                                })}
                                                role="button"
                                            >
                                                Tài khoản
                                            </span>
                                        </div>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                        <div className={styles.user}>
                            <Dropdown>
                                <Dropdown.Toggle className="border-0 bg-transparent">
                                    <i className="fa-regular fa-user text-secondary fs-3"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align={'end'} className={clsx(styles.menu, 'border-0 shadow-lg')}>
                                    <Dropdown.Item className={styles.item}>
                                        <i className="fs-4 me-2 fa-light fa-envelope"></i>
                                        {account?.email}
                                    </Dropdown.Item>
                                    <Dropdown.Item className={styles.item}>
                                        <i className="fs-4 me-2 fa-light fa-address-card"></i>
                                        {account?.name}
                                    </Dropdown.Item>
                                    <Dropdown.Item className={styles.item}>
                                        <i className="fs-4 me-2 fa-light fa-house"></i>
                                        {account?.class}
                                    </Dropdown.Item>
                                    <Dropdown.Item className={styles.item}>
                                        <i className="fs-4 me-2 fa-regular fa-school"></i>
                                        {account?.faculty}
                                    </Dropdown.Item>
                                    <Dropdown.Item className={clsx(styles.item, 'border-0')}>
                                        <button
                                            className={clsx(styles.btnSignOut, 'rounded-3 px-3 py-1 ')}
                                            onClick={handleSignOut}
                                        >
                                            <i className="fa-regular fa-right-from-bracket me-2"></i>
                                            Đăng xuất
                                        </button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </Navbar>
            <div style={{ marginTop: '84px' }}>{children}</div>
        </div>
    );
}

export default LayoutDashboard;
