//Imports
import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { UsersPage } from './Components/Users/UsersContainer'
import { LoginPage } from './Components/Login/Login'
import { Route, withRouter, Switch, Redirect, BrowserRouter, Link } from 'react-router-dom'
import { Header } from './Components/Header/Header'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './Redux/Reducers/appReducer'
import PreLoader from './Components/Common/Preloader/Preloader'
import { AppStateType } from './Redux/reduxStore'
import store from './Redux/reduxStore'


//Ant Design
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { withSuspense } from './HOC/withSuspense'
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

//React.lazy
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)


//App Component
class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

  catchAllUnhandledRejections = (e: PromiseRejectionEvent) => {
    alert("Some error occurred...")
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledRejections);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledRejections);
  }

  render() {

    if (!this.props.initialized) {
      return <PreLoader />
    }

    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                  <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9"><Link to="/chat">Chat</Link></Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
                <Route path='/dialogs' render={() => <SuspendedDialogs />} />
                <Route path='/chat' render={() => <SuspendedChatPage />} />
                <Route path='/developers' render={() => <UsersPage />} />
                <Route path='/login' render={() => <LoginPage />} />
                <Redirect from="/" to="/profile" />
                <Route path='*' render={() => <div>404 Not Found</div>} />
              </Switch>
            </Content>

          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ReactJs ©2020 Created by Gary</Footer>
      </Layout>
    );
  }

}

//MSTP
const MapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})
type MapStatePropsType = ReturnType<typeof MapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
}


//AppContainer
let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(MapStateToProps, { initializeApp }))(App);


//The main App
const ReactJSApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store} >
      <AppContainer />
    </Provider>
  </BrowserRouter>
}


//Export
export default ReactJSApp;