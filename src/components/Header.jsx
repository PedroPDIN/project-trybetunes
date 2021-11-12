import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../ferramentas/Loading';

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
        <h1 data-testid="header-user-name">{nameUser}</h1>

        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>

      </header>
    );
  }
}

export default Header;
