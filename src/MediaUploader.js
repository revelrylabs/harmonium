import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FileInput from './FileInput'
import {includes} from 'lodash'

// duplicate of server whitelist; would like to consolidate somehow
const SUPPORTED_MEDIA_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'video/mp4',
];
const UPLOAD_PLACEHOLDER = 'Choose file...';
const SIZE_ERROR_MESSAGE = 'Please choose a smaller image';
const TYPE_ERROR_MESSAGE = 'Please choose a supported file type';

// the enclosing form should have encType="multipart/form-data"
class MediaUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: props.defaultPhoto || '',
      valid: true,
    }
  }

  videoFile(file) {
    if (file.type.slice(0, 5) === 'video') {
      return true;
    }
    return false;
  }

  validateFile(file) {
    const fileSize = file.size / 1024 / 1024; // in MB
    const invalidSize = fileSize > 5;

    if (invalidSize) {
      this.setState({errorMessage: SIZE_ERROR_MESSAGE});
      return false;
    }

    if (!includes(SUPPORTED_MEDIA_TYPES, file.type)) {
      this.setState({errorMessage: TYPE_ERROR_MESSAGE});
      return false;
    }

    return true;
  }

  imagePreview() {
    const {imageClass} = this.props
    const {imagePreviewUrl, file} = this.state

    if (file && this.videoFile(file)) {
      return imagePreviewUrl && (
        <video
          controls
          className={imageClass}
          alt={file.name}
          src={imagePreviewUrl}
        />
      );
    }

    return imagePreviewUrl && (
      <img
        className={imageClass}
        alt={file.name}
        src={imagePreviewUrl}
      />
    );
  }

  updatePreview = (e) => {
    const reader = new FileReader()
    const input = e.target
    const file = e.target.files[0]

    reader.onloadend = () => {
      const valid = this.validateFile(file)

      if (valid === false) {
        // manually remove the too-large file and fire the form onChange event
        // so ValidationForm will kick into gear and disable the submit button
        const event = new Event('change', {bubbles: true})

        input.value = ''
        input.dispatchEvent(event)

        this.setState({
          imagePreviewUrl: '',
          file: '',
          valid,
        })
      } else {
        this.setState({
          imagePreviewUrl: reader.result,
          file,
          valid,
        })
      }
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    const {label, buttonLabel, helpText, name} = this.props
    const {file, valid, errorMessage} = this.state

    return (
      <div className="EventFormFileInput">
        <h6 className="rev-InutLabel">{label}</h6>
        {this.imagePreview()}
        <FileInput.Stack
          label=''
          button={buttonLabel}
          placeholder={file.name || UPLOAD_PLACEHOLDER}
          name={name}
          accept="image/*, video/*"
          onChange={this.updatePreview}
          help={helpText}
          error={!valid && errorMessage}
        />
      </div>
    )
  }
}

MediaUploader.defaultProps = {
  name: 'image',
}

MediaUploader.propTypes = {
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  imageClass: PropTypes.string,
  defaultPhoto: PropTypes.string,
  helpText: PropTypes.string,
  name: PropTypes.string,
}

export default MediaUploader
