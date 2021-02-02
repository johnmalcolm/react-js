import React, { Component } from "react";

class Search extends Component {
  state = {
    search: "",
    tags: [],
    articlesArray: [],
    articleCount: 0,
    countryMap: {},
  };

  removeTag = (event, tag) => {
    let currentTags = this.state.tags;
    console.log(currentTags);
    const index = currentTags.indexOf(tag);
    if (index > -1) {
      currentTags.splice(index, 1);
    }
    let updatedTags = currentTags;
    this.setState({ tags: updatedTags });
    console.log(this.state.tags.length);

    if (this.state.tags.length > 0) {
      fetch(
        `https://api.elsevier.com/content/search/scopus?query=all(${this.state.tags.join()})&apiKey=ff5085ef938d3d7d95ae111e5b85ff6b`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          let newCount = data["search-results"]["opensearch:totalResults"];
          this.setState({ articleCount: newCount });
          this.populateArticleFeed(data);
        });
    } else {
      let newCount = 0;
      this.setState({ articleCount: newCount });
      this.setState({ articlesArray: [] });
    }
  };

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  onChange = (e) => {
    this.setState({ search: e.target.value });
  };

  populateArticleFeed = (data) => {
    console.log(data);
    this.setState({ articlesArray: data["search-results"].entry });
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      this.state.tags.push(e.target.value);
      this.setState({ search: "" });

      fetch(
        `https://api.elsevier.com/content/search/scopus?query=all(${this.state.tags.join()})&apiKey=ff5085ef938d3d7d95ae111e5b85ff6b`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let newCount = data["search-results"]["opensearch:totalResults"];
          this.setState({ articleCount: newCount });
          this.populateArticleFeed(data);
        });
    }
  };

  buildCountryStats = () => {
    this.state.articlesArray.map((article) => {
      let countryMapCopy = this.state.countryMap;
      if (article["affiliation"]) {
        let articleCountry = article["affiliation"][0]["affiliation-country"];
        if (articleCountry in countryMapCopy) {
          countryMapCopy[articleCountry] += 1;
          this.setState({ countryMap: countryMapCopy });
        } else {
          countryMapCopy[articleCountry] = 1;
          this.setState({ countryMap: countryMapCopy });
        }
      }
    });
  };

  showStats = () => {
    // Call build country stats for each page
    this.buildCountryStats();
    console.log(this.state.countryMap);
  };

  // TO DO
  // 1. Filter by discipline
  // 2. Filter by date
  // 3. Excludes
  // 4. Suggestions (Keywords, People, Phrases)
  // Feedback: titles, article count

  render() {
    return (
      <div>
        <div className="counter">
          {this.numberWithCommas(this.state.articleCount)}
        </div>
        <div
          onClick={this.showStats}
          className={`stats ${
            this.state.articleCount > 800 || this.state.articleCount === 0
              ? "hide"
              : ""
          }`}
        >
          Stats
        </div>
        {/* <div className="stats-box"></div> */}
        <input
          className="search-box"
          value={this.state.search}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <div>
          <div className="tags">
            {this.state.tags.map((tag) => {
              return (
                <div className="tag" key={tag + new Date()}>
                  {tag}
                  <span onClick={(event) => this.removeTag(event, tag)}>x</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="articles">
          {this.state.articlesArray.map((article) => {
            return (
              <div className="article" key={article["dc:identifier"]}>
                <div className="author">{article["dc:creator"]}</div>
                <div>
                  <a
                    href={`https://doi.org/${article["prism:doi"]}`}
                    target="_blank"
                  >
                    {article["dc:title"]}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Search;
