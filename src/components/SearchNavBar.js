import React, { Component } from 'react';

export default class SearchNavBar extends Component {

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
            this.props.handleSearch(this.state.query);
        } else {
            this.setState({
                query: ''
            });
        }
    }

    render() {
        return (
            <nav id="top" className="navbar navbar-dark bg-black navbar-expand-sm border-bottom-ytRed">
                <a href="/" className="navbar-brand bg-ytRed btn-ytRed p-2 rounded"><i className="fa fa-play" aria-hidden="true"></i> YouTube</a>
                <button className="navbar-toggler mb-2" type="button" data-toggle="collapse" data-target="#navbarSearchContent" aria-controls="navbarSearchContent" aria-expanded="false" aria-label="Toggle search">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSearchContent">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="d-flex" onSubmit={this.handleSubmit}>
                                <input ref={(input) => { this.searchInput = input; }}
                                       className="form-control text-danger" id="search" type="search" placeholder="Search YouTube" aria-label="Search"
                                       value={this.state.query} onChange={this.handleChange}/>
                                <button className="btn btn-danger bg-ytRed btn-ytRed pointer ml-2" type="submit"><i className="fa fa-search mr-1" aria-hidden="true"></i>Search</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}