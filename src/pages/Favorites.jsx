import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../ferramentas/Loading';
import MusicCard from '../ferramentas/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.fetchFavorite = this.fetchFavorite.bind(this);

    this.state = {
      saveFavorite: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchFavorite();
  }

  async fetchFavorite() {
    this.setState({ loading: true });
    const favorite = await getFavoriteSongs();
    this.setState({ saveFavorite: favorite, loading: false });
  }

  render() {
    const { loading, saveFavorite } = this.state;
    return (
      <div>
        {loading
          ? <Loading />
          : (
            <div>
              <Header />
              <div data-testid="page-favorites">
                <ul>
                  {saveFavorite.map((music) => (
                    <li key="music.artistId">
                      <MusicCard
                        musics={ music.trackName }
                        preview={ music.previewUrl }
                        trackId={ music.trackId }
                        listAlbums={ music }
                        // ajuda para construir a logica da fução "fetchFavorite" junto com Mateus Turola turma 16 for(ever).
                        // https://www.ti-enxame.com/pt/javascript/como-atualizar-o-estado-do-pai-no-react/823853409/
                        fetchFavorite={ this.fetchFavorite }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>)}
      </div>

    );
  }
}

export default Favorites;
