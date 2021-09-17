import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './views/HomeScreen';
import DressesDetails from './views/DressesDetails';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile'
import Shipping from './views/Shipping'
import Payment from './views/Payment'
import PlaceOrder from './views/PlaceOrder'
import Order from './views/Order'
import UserList from './views/UserList'
import UserEdit from './views/UserEdit'
import DressesList from './views/DressesList'
import DressEdit from './views/DressEdit'
import OrderList from './views/OrderList'




function App() {
  return (
    <Router>
      <Header />
      <main className="py-5" >
        <Container>
          <Route path='/order/:id' component={Order} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/payment' component={Payment} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/product/:id' component={DressesDetails} />
          <Route path='/cart/:id?' component={Cart}/>
          <Route path='/admin/userlist' component={UserList}/>
          <Route path='/admin/user/:id/edit' component={UserEdit}/>
          <Route path='/admin/productlist' component={DressesList} exact/>
          <Route path='/admin/productlist/:pageNumber' component={DressesList} exact/>
          <Route path='/admin/product/:id/edit' component={DressEdit}/>
          <Route path='/admin/orderlist' component={OrderList}/>
          <Route path='/search/:keyword' component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
