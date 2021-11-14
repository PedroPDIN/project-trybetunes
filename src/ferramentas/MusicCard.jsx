import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics, preview } = this.props;
    console.log(musics);
    return (
      <div>
        <p>{musics}</p>

        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};
export default MusicCard;
