import React, { Component } from 'react'

class Search extends Component {

    state = {
        search: '',
        tags: [],
        articlesArray: [],
        articleCount: 0
    }


    removeTag = (event, tag) => {
        let currentTags = this.state.tags;
        console.log(currentTags)
        const index = currentTags.indexOf(tag);
        if (index > -1) {
            currentTags.splice(index, 1);
        }
        let updatedTags = currentTags;
        this.setState({tags: updatedTags})
        console.log(this.state.tags.length)

        if(this.state.tags.length > 0){
            fetch(`https://api.elsevier.com/content/search/scopus?query=all(${this.state.tags.join()})&apiKey=ff5085ef938d3d7d95ae111e5b85ff6b`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                let newCount = data['search-results']['opensearch:totalResults']
                this.setState({articleCount: newCount})
                this.populateArticleFeed(data)
            });
        } else{
            this.setState({articlesArray: []})
        }
        
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    onChange = (e) => {
        this.setState({search: e.target.value})
    }

    populateArticleFeed = (data) => {
        console.log(data)
        this.setState({articlesArray: data['search-results'].entry})
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.state.tags.push(e.target.value);
            this.setState({search: ''})
            
            fetch(`https://api.elsevier.com/content/search/scopus?query=all(${this.state.tags.join()})&apiKey=ff5085ef938d3d7d95ae111e5b85ff6b`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    let newCount = data['search-results']['opensearch:totalResults']
                    this.setState({articleCount: newCount})
                    this.populateArticleFeed(data)
                });
          }
    }

    // TO DO
    // 1. Filter by discipline
    // 2. Filter by date
    // 3. Excludes
    // 4. Suggestions (Keywords, People, Phrases)
    // Feedback: titles, article count
    
    render() {
        return (
            <div>
                <input 
                    className="search-box"
                    value={this.state.search} 
                    onChange={this.onChange} 
                    onKeyDown={this.onKeyDown} />
                <div className="tags">
                    {this.state.tags.map((tag)=> {
                        return <div className="tag" key={tag + new Date()}>{tag}<span onClick={(event) =>this.removeTag(event, tag)}>x</span></div>
                    })}
                </div>
                <div className="counter">{this.numberWithCommas(this.state.articleCount)}</div>
                <div className="articles">{this.state.articlesArray.map((article)=>{
                     return <div className="article" key={article['dc:identifier']}>
                            <div className="author">{article['dc:creator']}</div>
                            <div>{article['dc:title']}</div>
                        </div>
                })}</div>
            </div>
        )
    }
}

export default Search
