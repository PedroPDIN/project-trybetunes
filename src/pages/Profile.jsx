import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../ferramentas/Loading';

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
              <div>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ `${name}' perfil` }
                />

                <strong>Nome</strong>
                <p>
                  {name}
                </p>

                <strong>Email</strong>
                <p>
                  {email}
                </p>

                <strong>Descrição</strong>
                <p>
                  {description}
                </p>

                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>
      </div>

    );
  }
}

export default Profile;
