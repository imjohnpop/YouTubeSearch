import React, { Component } from 'react';
import timeAgo from 'damals';

export default class Video extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userChannel: 'https://www.youtube.com/channel/'+this.props.channelID
        }
    }

    loadVideo() {
        this.props.loadVideo(this.props);
        window.location.href = '#top';
    }

    render() {
        return (
            <div className="video bg-transparent m-2 border-ytRed d-flex flex-column flex-sm-row rounded bg-lighten">
                <div className="imageWrapper">
                    <img className="top-rounded pointer"
                         src={this.props.thumbnail}
                         alt={this.props.videoTitle}
                         onClick={() => { this.loadVideo() }}/>
                </div>
                <div className="video-body pl-3 d-flex flex-column justify-content-center">
                    <p className="title text-muted pointer"
                       onClick={() => { this.loadVideo() }}>
                        {this.props.videoTitle}
                    </p>
                    <small className="author text-muted mb-1">
                        <a href={this.state.userChannel} className="text-muted" target="_blank">
                            <i className="fa fa-user" aria-hidden="true"> </i> {this.props.channelTitle}
                        </a>
                    </small>
                    <small className="description text-muted">{this.props.videoDescription}</small>
                    <small className="upload text-muted mt-1"><i className="fa fa-caret-right" aria-hidden="true"> </i> Uploaded: { timeAgo(parseInt(this.props.publishedAt, 0)) }</small>
                </div>
            </div>
        );
    }
}