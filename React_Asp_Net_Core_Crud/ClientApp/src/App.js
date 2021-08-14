import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { CustomersList } from './components/Customer/CustomersList';
import {ProductsList} from './components/Product/ProductsList';
import 'react-toastify/dist/ReactToastify.css'; 
import './custom.css';
import { StoresList } from './components/Store/StoreList';
import { SalesList } from './components/Sales/SalesList';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={CustomersList} />
        <Route exact path='/customers' component={CustomersList} />
        <Route exact path='/products' component={ProductsList} />
        <Route exact path='/stores' component={StoresList} />
        <Route exact path='/Sales' component={SalesList} />
      </Layout>
    );
  }
}
