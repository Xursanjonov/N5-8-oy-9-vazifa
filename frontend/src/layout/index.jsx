import React, { memo, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, QrcodeOutlined, AppstoreOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Layout, theme } from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../context/slices/authSlice';
const { Header, Sider, Content } = Layout;


const Layouts = () => {
    const { pathname } = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const siderItemActive = `w-[${collapsed ? '30' : '92'}%] hover:text-black p-3 flex items-center justify-center text-lg gap-4 mx-auto bg-blue-500 font-semibold rounded-md text-[#000]`
    const siderItem = `w-[${collapsed ? '30' : '92'}%] p-3 flex items-center justify-center text-lg gap-4 mx-auto bg-transparent font-semibold rounded-md text-white`

    return (
        <div>
            <Layout>
                <Sider className='h-screen' trigger={null} collapsible collapsed={collapsed} >
                    <div className="w-full h-screen flex flex-col items-start justify-start gap-2 relative" >
                        <h1 className={`w-full h-[64px] flex items-center justify-center gap-4 text-lg font-bold text-white bg-transparent border-b-[.1px] border-gray-400`}>
                            <span className='w-[40px] h-[40px] font-bold flex items-center justify-center rounded-full bg-blue-500'>{user?.fname.split('')[0]}</span>
                            <span className={collapsed ? 'hidden' : 'block'}>{user?.fname} {user?.lname}</span>
                        </h1>
                        <div className="w-full mt-4 flex flex-col items-start justify-center gap-2">
                            <NavLink to={'/layout/dashboard'} className={pathname === '/layout/dashboard' ? siderItemActive : siderItem}>
                                <AppstoreOutlined className='w-[30px] flex items-center justify-center' />
                                <span className={`${collapsed ? 'hidden' : 'flex-1'}`}>Dashboard</span>
                            </NavLink>
                            <NavLink to={'/layout/create-blog'} className={pathname === '/layout/create-blog' ? siderItemActive : siderItem}>
                                <EditOutlined className='w-[30px] flex items-center justify-center' />
                                <span className={`${collapsed ? 'hidden' : 'flex-1'}`}>Create Blog</span>
                            </NavLink>
                            <NavLink to={'/layout/manage-blog'} className={pathname === '/layout/manage-blog' ? siderItemActive : siderItem}>
                                <QrcodeOutlined className='w-[30px] flex items-center justify-center' />
                                <span className={`${collapsed ? 'hidden' : 'flex-1'}`}>Manage Blog</span>
                            </NavLink>
                        </div>
                        <ConfigProvider>
                            <Button className='w-full font-bold text-red-600 absolute bottom-4' type="link"
                                onClick={() => dispatch(logout())} size="large" icon={<LogoutOutlined />}>Logout</Button>
                        </ConfigProvider>
                    </div>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default memo(Layouts)