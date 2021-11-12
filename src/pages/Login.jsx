import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../ferramentas/Loading';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.infoUser = this.infoUser.bind(this);

    this.state = {
      savingUser: false,
      login: false,
      inputName: '',
      isDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ inputName: value }, this.valideButton);
  }

  valideButton() {
    const { inputName } = this.state;
    const THREE = 3;
    if (inputName.length <= THREE) {
      this.setState({ isDisabled: true });
    }
    if (inputName.length >= THREE) {
      this.setState({ isDisabled: false });
    }
  }

  infoUser() {
    const { inputName } = this.state;
    this.setState({ savingUser: true }, () => {
      createUser({ name: inputName })
        .then(() => this.setState({ login: true, savingUser: false }));
    });
  }

  render() {
    const { inputName, isDisabled, savingUser, login } = this.state;
    if (savingUser) {
      return <Loading />;
    }
    if (login) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="login-name-input">
            Nome
            <input
              type="text"
              data-testid="login-name-input"
              name="inputName"
              value={ inputName }
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            disabled={ isDisabled }
            data-testid="login-submit-button"
            onClick={ this.infoUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
