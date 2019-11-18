import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import Search from "./components/Search";
import Albums from "./components/Albums";
// import data from "./data/dummyData.json";
// import { isRegExp } from "util";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchterm: "Cardi B",
      headerterm: "",
      albums: []
    };
  }

  componentDidMount() {
    this.getAlbums(this.state.searchterm);
  }

  onInputSubmit = searchterm => {
    this.getAlbums(searchterm);
  };

  getAlbums = searchterm => {
    let albumsArray = [];
    axios({
      method: "post",
      url: "http://localhost:8000",
      data: {
        searchterm
      }
    })
      .then(response => {
        let results = response.data.results;
        console.log("Results: ", results);
        if (results === undefined) {
          swal(`There is no artist named '${searchterm}' in our database`);
          return;
        }

        if (results.length === 1) {
          swal(
            `${results[0].artistName.toUpperCase()} was found but has no albums under this search name.\nTry a different or more complete name`
          );
          return;
        }

        results.forEach(item => {
          albumsArray.push(item);
        });
        this.setState({
          headerterm: results[0].artistName
        });

        return albumsArray;
      })
      .then(() => {
        albumsArray.shift();
        this.setState({
          albums: albumsArray
        });
      })

      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let { headerterm, albums } = this.state;
    return (
      <div>
        <Search headerterm={headerterm} onInputSubmit={this.onInputSubmit} />
        <Albums albums={albums} />
      </div>
    );
  }
}

export default App;
