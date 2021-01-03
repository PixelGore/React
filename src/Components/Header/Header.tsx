//Imports
import React from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectCurrentUserLogin } from '../../Redux/Selectors/authSelector'
import { logout } from '../../Redux/Reducers/authReducer'

//Ant Design
import { Layout, Col, Menu, Row, Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';


//Header Component
export const Header: React.FC<mapPropsType> = () => {

  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }



  const { Header } = Layout;
  return (
    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
          </Menu>
        </Col>


        {isAuth ?
          <>
            <Col span={1}>
              <Avatar alt={login || 'No userName'} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Col>
            <Col span={5}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
          :
          <Col span={6}>
            <Button>
              <Link to={'/login'}>Login</Link>
            </Button>
          </Col>
        }

      </Row>

    </Header>
    // <div className={s.header}>
    //   <div className={s.inner_header}>
    //     <div className={s.logo_container}>
    //       <h1>MY<span>SITE</span></h1>
    //     </div>
    //     <div className={s.loginBlock}>
    //       <div>
    //         {props.isAuth ?
    //           <div>{props.login} <span onClick={props.logout}>Log out</span> </div>
    //           :
    //           <span><Link to={'/login'}>Login</Link></span>}
    //       </div>
    //     </div>
    //   </div>
    // </div >
  )
}
export type mapPropsType = {

}
