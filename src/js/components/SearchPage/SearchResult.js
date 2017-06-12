import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SearchResult = ({ ...props }) => {
  const searchList = _.map(props.searchResults, (product, i) => {
    const productImage = {
      'backgroundImage': product.url,
    };

    let confidence;
    if (product.confidence) {
      confidence = Number(parseFloat(product.confidence * 100).toFixed(0));
    }
    const style = {
      'width': `${confidence}%`,
    };

    return (
      <div className="product-list" key={i}>
        <div className="product-list-box">
          <div className="product-image">
            <div className="full-image"  style={productImage}></div>
            <img src={product.url}  />
          </div>
          <div className="product-desc">
            <div className="confidence display-progress">
              <div className="title">Confidence:</div>
              <div className="info">
                <span className="perc">{confidence}%</span>
                <span className="progress"><span className="progress-bar" style={style}></span></span>
              </div>
            </div>
            <div>
              <div className="title">Hand written tags:</div>
              <div className="info">
                {product.handwrittentags}
              </div>
            </div>
            <div>
              <div className="title">Ocr tags:</div>
              <div className="info">
                {product.ocrtags}
              </div>
            </div>
          </div>
        </div>
        <div className="view-detail">
          <button onClick={() => props.viewDetails(product)} className="btn btn-block btn-primary">View details</button>
        </div>
      </div>
    );
  });
  
  return (
    <div className="container-fluid search-result-page">
      <div className="row">
        <div className="col-sm-4">
          <h1>Search Filter</h1>
        </div>
        <div className="col-sm-8">
          {searchList}
        </div>
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  searchResults: PropTypes.array,
  viewDetails: PropTypes.func,
};

export default SearchResult;
