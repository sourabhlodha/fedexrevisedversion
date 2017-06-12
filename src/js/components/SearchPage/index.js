import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import VisionDetailPage from '../shared/VisionDetailPage';

import { onSearch, clearSearch, showVisionPage, hideVisionPage} from '../../redux/actions';

@connect((store) => {
  return {
    searchResult: store.search.searchResult,
    fetching: store.search.fetching,
    fetched: store.search.fetched,
    isvisionDetailPage: store.search.isvisionDetailPage,
    cosmosDB: store.search.cosmosDB,
  };
})

class SearchPage extends Component {
  
  constructor() {
    super();
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._viewDetails = this._viewDetails.bind(this);
    this._hideVisionPage = this._hideVisionPage.bind(this);

    this.state = {
      searchValue: '',
    };
  }

  componentWillMount () {
    this.props.dispatch(clearSearch());
  }

  _onSearchChange(e) {
    this.setState({ searchValue: e.target.value });
  }
  _onSearch(e) {
    e.preventDefault();

    const url = `https://fedexovergoods.search.windows.net/indexes/overgood/docs?api-version=2016-09-01&search=${this.state.searchValue}&$orderby=confidence asc&highlight=captions&api-key=C4FBD0A95D9184A1C7EB40C8D884F5B4`;

    

    this.props.dispatch(onSearch(url));
  }

  _viewDetails(data) {
    this.props.dispatch(showVisionPage(data));
  }

  _hideVisionPage() {
    this.props.dispatch(hideVisionPage());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }



  render() {
    const { searchResult, isvisionDetailPage, fetching, fetched, cosmosDB } = this.props;
    
    let searchResultPage;
    let noresult;
    if (fetched) {
      if (_.isEmpty(searchResult.value)) {
        noresult = <h2 className='text-center'>No result found, plese try again</h2>;
      }
    }

    if(!_.isEmpty(searchResult.value)) {
      searchResultPage = <SearchResult viewDetails={this._viewDetails} searchResults={searchResult.value} />;
    }

    let loading;
    if(fetching) {
      loading = (<div className="progress"><div className="status spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div></div>);
    }
    let visionDetail;
    if (isvisionDetailPage) {
      visionDetail = <VisionDetailPage cosmosDB={cosmosDB} onBack={this._hideVisionPage} />;
    }
    return (
      <div className="search-page">
        <div className="container-fluid search">
          <form onSubmit={this._onSearch}>
            <div className="input-group">
              <input type="text" className="form-control" value={this.state.searchValue} placeholder="Search for..." onChange={this._onSearchChange} />
              <span className="input-group-btn">
                <button onClick={() => {}} className="btn btn-secondary" type="submit"><i className="fa fa-search" /></button>
              </span>
            </div>
          </form>
        </div>
        {loading}
        {noresult}
        {searchResultPage}
        {visionDetail}
      </div>
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func,
  onSearch: PropTypes.func,
  searchResult: PropTypes.object,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  isvisionDetailPage: PropTypes.bool,
  cosmosDB: PropTypes.obj,
};  


export default SearchPage;
