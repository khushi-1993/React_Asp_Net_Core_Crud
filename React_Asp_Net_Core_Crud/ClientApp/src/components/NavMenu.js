import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export class NavMenu extends Component {

  constructor() {
    super();
    this.pathname = window.location.pathname;
    this.path = this.pathname === "/" ? "customers" : this.pathname.substr(1);
    this.state =
    {
      activeItem: this.path
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <Menu inverted>
          <Menu.Item
            as={NavLink} to='/customers'
            name='customers'
            active={activeItem === 'customers'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink} to='/products'
            name='products'
            active={activeItem === 'products'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink} to="/Stores"
            name='Stores'
            active={activeItem === 'Stores'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink} to="/Sales"
            name='Sales'
            active={activeItem === 'Sales'}
            onClick={this.handleItemClick}
          />
        </Menu>
    )
  }
}
