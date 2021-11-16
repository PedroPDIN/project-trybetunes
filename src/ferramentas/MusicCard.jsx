import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.fetchSongs = this.fetchSongs.bind(this);
    this.fetchFavorite = this.fetchFavorite.bind(this);

    this.state = {
      checkedSongs: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchFavorite();
  }

  async fetchFavorite() {
    this.setState({ loading: true });
    const favorite = await getFavoriteSongs();
    const { trackId } = this.props;
    const isFavSongs = favorite.some((value) => value.trackId === trackId);
    this.setState({ checkedSongs: isFavSongs, loading: false });
  }

  async fetchSongs(album) {
    this.setState({ loading: true });
    await addSong(album);
    this.setState({ checkedSongs: true, loading: false });
  }

  render() {
    const { musics, preview, trackId, listAlbums } = this.props;
    const { checkedSongs, loading } = this.state;
    return (
      <div>
        <p>{musics}</p>

        <audio
          data-testid="audio-component"
          src={ preview }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {loading
          ? <Loading />
          : (
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ checkedSongs }
              onClick={ () => this.fetchSongs(listAlbums) }
            />)}

      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  listAlbums: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number,
  })).isRequired,
};

export default MusicCard;

// ajuda de Mateus Turola Turma 16 for(ever) na criação da função "fetchSongs()"
