import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../ferramentas/Loading';

import '../css/Search.css';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.searchButtonApi = this.searchButtonApi.bind(this);

    this.state = {
      isDisabled: true,
      inputSearch: '',
      loading: false,
      nameArtist: '',
      albums: [],
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

  async searchButtonApi() {
    const { inputSearch } = this.state;
    this.setState({ inputSearch: '', loading: true });

    const searchAlbum = await searchAlbumsAPI(inputSearch);

    if (searchAlbum.length === 0) {
      this.setState({
        nameArtist: 'Nenhum álbum foi encontrado',
        loading: false,
        albums: [],
      });
    } else {
      this.setState({
        loading: false,
        nameArtist: `Resultado de álbuns de: ${inputSearch}.`,
        albums: searchAlbum,
      });
    }
  }

  render() {
    const { isDisabled, inputSearch, loading, nameArtist, albums } = this.state;
    return (
      <div>
        <Header />
        {loading === true
          ? <Loading />
          : (
            <div data-testid="page-search">
              <form action="" className="form">

                <input
                  className="inputSearch"
                  type="text"
                  data-testid="search-artist-input"
                  name="inputSearch"
                  value={ inputSearch }
                  onChange={ this.onInputChange }
                />

                <button
                  className="button"
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isDisabled }
                  onClick={ this.searchButtonApi }
                >
                  Pesquisa
                </button>
              </form>
            </div>)}

        <div>
          <h3>{nameArtist}</h3>
          <ul>
            {albums.map((info) => (
              <li key="info.artistId">
                <p>{info.artistName}</p>
                <h4>{info.collectionName}</h4>
                <p>{info.collectionPrice}</p>
                <img src={ info.artworkUrl100 } alt={ info.collectionName } />
                <Link
                  data-testid={ `link-to-album-${info.collectionId}` }
                  to={ `/album/${info.collectionId}` }
                >
                  Album
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    );
  }
}

export default Search;
