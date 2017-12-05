import React, { Component } from 'react';
import timeAgo from 'damals';

export default class VideoPlayer extends Component {

    constructor(props){
        super(props);

        this.state = ({
           videoHasLoaded: true
        });
    }

    loadVideo(videoData) {
        this.setState({
            videoTitle: videoData.videoTitle,
            videoDescription: videoData.videoDescription,
            videoID: videoData.videoID,
            videoEmbedLink: 'https://www.youtube.com/embed/'+videoData.videoID,
            videoWatchLink: 'https://www.youtube.com/watch?v='+videoData.videoID,
            channelTitle: videoData.channelTitle,
            userChannel: 'https://www.youtube.com/channel/'+videoData.channelID,
            publishedAt: videoData.publishedAt
        });
    }


    render() {
        return (
            <div id="videoPlayer" className="col-12 bg-ytDarkGrey py-2 mt-3 border-top-black border-bottom-black">
                <div className="videoPlayer col-12 col-lg-11 col-xl-9 bg-black mx-auto p-2 rounded">
                    <div className="iframeWrapper">
                        <iframe id="i_frame"
                                title={this.state.videoTitle}
                                width="560" height="349" frameBorder="0"
                                src={this.state.videoEmbedLink}
                                data-link={this.state.videoWatchLink}
                                allowFullScreen>
                        </iframe>
                    </div>
                    <div className="videoPlayer-body pl-3 py-3 d-flex flex-column justify-content-center">
                        <p className="title text-muted pointer">{this.state.videoTitle}</p>
                        <small className="author text-muted mb-1">
                            <a href={this.state.userChannel} className="text-muted" target="_blank">
                                <i className="fa fa-user" aria-hidden="true"> </i> {this.state.channelTitle}
                            </a>
                        </small>
                        <small className="description text-muted">{this.state.videoDescription}</small>
                        <small className="upload text-muted mt-1"><i className="fa fa-caret-right" aria-hidden="true"> </i> Uploaded: { timeAgo(parseInt(this.state.publishedAt, 0)) }</small>
                    </div>
                </div>
            </div>
        );
    }
}