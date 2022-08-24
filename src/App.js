import React, { Component } from 'react';
// Importing CSS
import './App.css';
// Importing Packages
import axios from 'axios';
// Importing Components
import LandingSearchPage from './components/LandingSearchPage';
import SearchNavBar from "./components/SearchNavBar";
import VideosList from "./components/VideosList";
import VideoPlayer from "./components/VideoPlayer";


const API_KEY = 'AIzaSyAZ6pMY6RWfjrkE0by3XesMnrXZPf1XFlo';

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            videosAvailable: false,
            videoPassed: false,
            resultsNum: 10,
            query: ''
        };
    }

    firstSearch(query) {
        this.setState({
            videosAvailable: true
        }, function(){
            this.handleSearch(query);
            this.render();
        });
    }

    checkIfQueryWasChanged(query) {
        if(this.state.query!==query) {
            this.setState({
                resultsNum: 10,
                videoPassed: false
            });
            return 10;
        }
        return this.state.resultsNum;
    }

    handleSearch(query) {
        this.setState({
            query: query
        });
        this.handleAPI(this.checkIfQueryWasChanged(query), query, API_KEY);
    }

    handleAPI(num, query, API_KEY) {
        let self = this;
        axios.get('https://www.googleapis.com/youtube/v3/search?' +
            'part=snippet' +
            '&maxResults='+num+
            '&q='+query+
            '&type=video'+
            '&key='+API_KEY)
            .then(function (results) {
                self.passSearchResults(results, self.state.resultsNum);
            });
    }

    raiseResultsNum(num) {
        this.setState({
            resultsNum: num
        }, function() {
            this.handleSearch(this.state.query);
            this.render();
        });
    }

    passSearchResults(searchResults, resultsNum) {
        this.passResults.passResultsToList(searchResults, resultsNum);
    }

    loadVideo(videoData){
        this.setState({
            videoPassed: true
        }, function() {
            this.passVideoData.loadVideo(videoData);
            this.render();
        });
    }

    checkIfVideosSearchedAndAvailable(videoPlay) {
        if (this.state.videosAvailable) {
            return <div>
                <SearchNavBar handleSearch={this.handleSearch.bind(this)}/>
                <section id="main" className="row">
                    { videoPlay }
                    <VideosList ref={ (el) => {this.passResults = el;} }
                                raiseResultsNum={this.raiseResultsNum.bind(this)}
                                loadVideo={this.loadVideo.bind(this)}/>
                </section>
                <section id="footer" className="w-100 bg-black py-2 border-top-ytRed">
                    <div className="text-center mx-auto text-white bg-ytRed rounded my-2 py-1">Created by Jan Poprocsi</div>
                </section>
            </div>;
        }
        return <LandingSearchPage firstSearch={this.firstSearch.bind(this)} />;
    }

    checkIfVideoChoosen() {
        if(this.state.videoPassed) {
            return [<VideoPlayer key={0} ref={ (el) => {this.passVideoData = el;} }/> ];
        }
        return [];
    }

    render() {
        let videoPlay = this.checkIfVideoChoosen();
        let components = this.checkIfVideosSearchedAndAvailable(videoPlay);
        return (
            <div className="App">
                {components}
            </div>
        );
    }
}