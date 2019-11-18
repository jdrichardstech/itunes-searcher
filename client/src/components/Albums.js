import React from "react";
import PropTypes from "prop-types";
import AlbumList from "./AlbumList";
import "./Albums.css";

const Albums = props => {
  let { albums } = props;
  let artistAlbums =
    albums.length > 0 ? (
      albums.map((item, idx) => {
        let biggerImage;
        let image = item.artworkUrl100;
        biggerImage = image.replace("100x100bb.jpg", "300x300bb.jpg");

        return (
          <AlbumList
            key={item.collectionId}
            biggerImage={biggerImage}
            image={image}
            item={item}
          />
        );
      })
    ) : (
      <li>
        <h1>If albums don't load in 5 seconds search for another name</h1>
      </li>
    );
  return (
    <div className="album-flow">
      <ul>{artistAlbums}</ul>
    </div>
  );
};

Albums.propTypes = {
  albums: PropTypes.array
};

export default Albums;
