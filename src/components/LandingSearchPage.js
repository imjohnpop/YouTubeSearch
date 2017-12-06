import React, { Component } from 'react';

export default class LandingSearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            query: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.query.replace(/\s/g, '').length!==0) {
            this.props.firstSearch(this.state.query);
        } else {
            this.setState({
                query: ''
            });

        }
    }

    componentDidMount(){
        this.searchInput.focus();
    }

    render() {
        return (
            <section id="landSearch">
                <div className="landingGreyBg"></div>
                <div className="card text-center col-8 bg-ytRed">
                    <div className="card-header bg-ytRed">
                        <h1 className="text-white"><i className="fa fa-youtube-play" aria-hidden="true"></i> YouTube</h1>
                    </div>
                    <div className="card-body bg-black">
                        <form className="form col" onSubmit={this.handleSubmit}>
                            <input ref={(input) => { this.searchInput = input; }}
                                   className="form-control text-danger" id="search" type="search" placeholder="Search YouTube" aria-label="Search"
                                   value={this.state.query} onChange={this.handleChange}/>
                            <button className="btn btn-dark pointer border-white text-white mt-3 bg-ytRed btn-ytRed" type="submit"><i className="fa fa-search mr-1" aria-hidden="true"></i>Search</button>
                        </form>
                    </div>
                    <div className="card-footer bg-ytRed text-muted">
                        <h2 className="text-white">Ads Free YouTube</h2>
                        <p className="text-white">Created by Jan Poprocsi</p>
                    </div>
                </div>
            </section>
        );
    }
}