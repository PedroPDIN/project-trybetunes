import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../ferramentas/Loading';

import '../css/Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.fetchUser = this.fetchUser.bind(this);

    this.state = {
      dataUser: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ dataUser: user, loading: false });
  }

  render() {
    const { dataUser, loading } = this.state;
    const { name, description, email, image } = dataUser;
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          {loading === true
            ? <Loading />
            : (
              <div className="conteiner-profile">
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ `${name}' perfil` }
                  className="img-profile"
                />

                <strong className="strong-info">Nome</strong>
                <p className="info-user">
                  {name}
                </p>

                <strong className="strong-info">Email</strong>
                <p className="info-user">
                  {email}
                </p>

                <strong className="strong-info">Descrição</strong>
                <p className="info-user">
                  {description}
                </p>

                <Link
                  to="/profile/edit"
                  className="link-profile"
                >
                  Editar perfil
                </Link>
              </div>
            )}
        </div>
      </div>

    );
  }
}

export default Profile;
