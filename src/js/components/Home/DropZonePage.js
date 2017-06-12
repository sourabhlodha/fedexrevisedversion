import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const DropZonePage = ({...props}) => {
  let loading;
  if(props.fetching) {
    loading = (<div className="progress"><div className="status spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div></div>);
  }
  return (
    <div>
      <Dropzone onDrop={props.onDrop} className="dropzone" activeClassName="dropzone-active">
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>

      <div className="img-upload-list">
        {loading}
        <ul>
          { props.images }
        </ul>
        
      </div>
    </div>
  );
};

DropZonePage.propTypes = {
  onDrop: PropTypes.func,
  images: PropTypes.array,
  fetching: PropTypes.bool,
};

export default DropZonePage;
