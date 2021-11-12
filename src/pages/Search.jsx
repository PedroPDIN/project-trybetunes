import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      isDisabled: true,
      inputSearch: '',
    };
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ inputSearch: value }, this.checkButton);
  }

  checkButton() {
    const { inputSearch } = this.state;
    const TWO = 2;
    if (inputSearch.length >= TWO) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, inputSearch } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form action="">

            <input
              type="text"
              data-testid="search-artist-input"
              name="inputSearch"
              value={ inputSearch }
              onChange={ this.onInputChange }
            />

            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
            >
              Pesquisa
            </button>

          </form>
        </div>
      </div>

    );
  }
}

export default Search;
