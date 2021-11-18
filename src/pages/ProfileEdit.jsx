import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../ferramentas/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.fetchUser = this.fetchUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.fetchUpdateUser = this.fetchUpdateUser.bind(this);

    this.state = {
      isDisabled: true,
      loading: false,
      update: false,
      dataUser: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      dataUser: { ...prevState.dataUser, [name]: value },
    }), this.checkButton());
  }

  checkButton() {
    const {
      dataUser: {
        name,
        email,
        description,
        image,
      },
    } = this.state;

    if (name !== ''
      && email !== ''
      && description !== ''
      && image !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  async fetchUser() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ dataUser: user, loading: false }, () => {
      // ajuda de Emerson Moreira turma 16 for(ever).
      // na implementação da chamada da função "this.checkButton" na linha 66.
      this.checkButton();
    });
  }

  async fetchUpdateUser() {
    this.setState({ loading: true });
    const { dataUser } = this.state;
    await updateUser(dataUser);
    this.setState({ update: true, loading: false });
  }

  render() {
    const {
      isDisabled,
      update,
      loading,
      dataUser: {
        name,
        email,
        description,
        image,
      },
    } = this.state;

    if (update === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          {loading === true
            ? <Loading />
            : (
              <form action="">
                <label htmlFor="edit-input-name">
                  Nome:
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    name="name"
                    value={ name }
                    onChange={ this.onInputChange }
                  />
                </label>

                <label htmlFor="edit-input-email">
                  Email:
                  <input
                    type="text"
                    data-testid="edit-input-email"
                    name="email"
                    value={ email }
                    onChange={ this.onInputChange }
                  />

                </label>
                <label htmlFor="edit-input-description">
                  Descrição:
                  <textarea
                    data-testid="edit-input-description"
                    id="edit-input-description"
                    name="description"
                    value={ description }
                    onChange={ this.onInputChange }
                  />
                </label>

                <label htmlFor="edit-input-image">
                  Imagem:
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    value={ image }
                    onChange={ this.onInputChange }
                  />
                </label>

                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ isDisabled }
                  onClick={ this.fetchUpdateUser }
                >
                  Salvar
                </button>

              </form>
            )}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;

// ajuda de Mateus Turola turma 16 for(ever).
// Na logica de fazer update de dados do usuario no perfil.
// resultando na criação do estado que guarda o objeto.
