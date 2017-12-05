import React, { Component } from 'react';
import Video from './Video';
import Moment from 'moment';
import Loading from 'react-loading-animation';

export default class VideosList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            resultsNum: 0
        };
    }

    passResultsToList(searchResults, resultsNum) {
        this.setState({
            videos: searchResults.data.items,
            resultsNum: resultsNum
        });
    }

    moreResults() {
        this.setState({
            resultsNum: this.state.resultsNum+5
        }, function() {
            this.props.raiseResultsNum(this.state.resultsNum);
        });
    }

    loadVideo(videoData) {
        this.props.loadVideo(videoData);
    }

    makeListOfVideos() {
        let videos = [];
        for(let i=0; i<this.state.videos.length; i++) {
            videos[i] = <Video key={i}
                               videoID={this.state.videos[i].id.videoId}
                               thumbnail={this.state.videos[i].snippet.thumbnails.medium.url}
                               videoTitle={this.state.videos[i].snippet.title}
                               videoDescription={this.state.videos[i].snippet.description}
                               channelID={this.state.videos[i].snippet.channelId}
                               channelTitle={this.state.videos[i].snippet.channelTitle}
                               publishedAt={Moment(this.state.videos[i].snippet.publishedAt).format("x")}
                               loadVideo={this.loadVideo.bind(this)}/>
        }
        return videos;
    }

    returnButtonUntil50Videos() {
        if(this.state.resultsNum<50){
            return [ <button    key={0}
                                    className="text-uppercase w-100 text-white btn btn-danger bg-ytRed btn-ytRed pointer p-0 mt-2"
                                    onClick={() => { this.moreResults() }}>
                <small>Show more</small>
            </button> ]
        }
        return [];
    }

    render() {
        let videos = this.makeListOfVideos();
        let button = this.returnButtonUntil50Videos();
        return (
            <div id="List" className="col-11 col-lg-10 col-xl-8 mx-auto pt-3 pb-3 my-2 bg-black rounded">
                <Loading isLoading={videos.length===0}>
                    {videos}
                    {button}
                </Loading>
            </div>
        );
    }
}