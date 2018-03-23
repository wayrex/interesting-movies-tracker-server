class Movie {
  constructor(movieMetadata) {
    this.metadata = movieMetadata;
    this.url = movieMetadata.canonical ? movieMetadata.canonical : movieMetadata.url;
    this.title = movieMetadata.title;
    this.image = movieMetadata.image;
    this.description = movieMetadata.description;
    this.keywords = movieMetadata.keywords;
    this.source = movieMetadata.source;
    this.dateAdded = Date.now();
    this.type = movieMetadata['og:type'] ? movieMetadata['og:type'].split('.')[1] : null;
  }
}

module.exports =  Movie;