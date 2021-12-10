import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../ferramentas/MusicCard';

import '../css/Album.css';

class Album extends Component {
  constructor() {
    super();

    this.fetchMusicsApi = this.fetchMusicsApi.bind(this);

    this.state = {
      artistName: '',
      collectionName: '',
      listAlbums: [],
    };
  }

  componentDidMount() {
    const { match: {
      params: { id },
    } } = this.props;

    this.fetchMusicsApi(id);
  }

  async fetchMusicsApi(valueId) {
    const musics = await getMusics(valueId);
    const filterMusics = musics.filter((value) => value.previewUrl);
    this.setState({
      listAlbums: filterMusics,
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
    });
  }

  render() {
    const { listAlbums, artistName, collectionName } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album" className="album">
          <h2
            data-testid="artist-name"
            className="h2-album"
          >

            {artistName}
          </h2>
          <h3
            data-testid="album-name"
            className="h3-album"
          >
            {collectionName}
          </h3>
          <ul>
            {listAlbums.map((music) => (
              <li key="music.artistId" className="li-album">
                <MusicCard
                  musics={ music.trackName }
                  preview={ music.previewUrl }
                  trackId={ music.trackId }
                  listAlbums={ music }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default Album;
