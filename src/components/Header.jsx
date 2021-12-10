import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../ferramentas/Loading';
import image from '../css/image/logo.png';

import '../css/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      loadingHeader: false,
    };

    this.namePerson = this.namePerson.bind(this);
  }

  componentDidMount() {
    this.namePerson();
  }

  async namePerson() {
    const dataUser = await getUser();
    this.setState({ nameUser: dataUser.name, loadingHeader: true });
  }

  render() {
    const { nameUser, loadingHeader } = this.state;
    if (!loadingHeader) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <img src={ image } alt="logo" />
        <h1 data-testid="header-user-name" className="user">{ nameUser }</h1>

        <nav className="nav">
          <NavLink
            exact
            to="/search"
            data-testid="link-to-search"
            className="links"
            activeClassName="selected"
          >
            Pesquisa
          </NavLink>

          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            className="links"
            activeClassName="selected"
          >
            Favoritas
          </NavLink>

          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            className="links"
            activeClassName="selected"
          >
            Perfil
          </NavLink>
        </nav>

      </header>
    );
  }
}

export default Header;
