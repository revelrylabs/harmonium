import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FileInput from './FileInput'
import classNames from 'classnames'
import {includes} from 'lodash'

function makeS3Request(data, file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(data.url)
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          })
        }
      }
    }

    xhr.open('PUT', data.signed_request)
    xhr.send(file)
  })
}

async function uploadFileToS3(file, generatePath) {
  try {
    const response = await fetch(generatePath(file))
    const {data} = await response.json()
    const url = await makeS3Request(data, file)

    return url
  } catch (e) {
    return alert('Could not upload file.')
  }
}

class MediaUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: props.defaultPreview || '',
      valid: true,
    }
  }

  videoFile(file) {
    if (file.type.slice(0, 5) === 'video') {
      return true
    }
    return false
  }

  validateFile(file) {
    const {
      supportedFileTypes,
      supportedFileTypesMessage,
      maxFileSize,
      maxFileSizeMessage,
    } = this.props
    const fileSize = file.size / 1024 / 1024 // in MB
    const invalidSize = fileSize > maxFileSize

    if (invalidSize) {
      this.setState({errorMessage: maxFileSizeMessage})
      return false
    }

    if (!includes(supportedFileTypes, file.type)) {
      this.setState({errorMessage: supportedFileTypesMessage})
      return false
    }

    return true
  }

  renderImageOrVideoPreview() {
    const {imageClassName} = this.props
    const {imagePreviewUrl, file} = this.state
    const previewClassNames = classNames(
      'rev-MediaUploaderPreview',
      imageClassName
    )

    if (file && this.videoFile(file)) {
      return (
        <video
          controls
          className={previewClassNames}
          alt={file.name}
          src={imagePreviewUrl}
        />
      )
    }

    return (
      <img
        className={previewClassNames}
        alt={file.name}
        src={imagePreviewUrl}
      />
    )
  }

  imagePreview() {
    const {imagePreviewUrl} = this.state

    if (!imagePreviewUrl) {
      return
    }

    this.renderImageOrVideoPreview()
  }

  updatePreview = (e) => {
    const {getS3Path} = this.props
    const reader = new FileReader()
    const input = e.target
    const file = e.target.files[0]

    reader.onloadend = async () => {
      const valid = this.validateFile(file)

      if (valid === false) {
        input.value = ''

        this.setState({
          imagePreviewUrl: '',
          file: '',
          valid,
        })
      } else {
        let url = reader.result

        if (getS3Path) {
          url = await uploadFileToS3(file, getS3Path)
        }

        this.setState({
          imagePreviewUrl: url,
          file,
          valid,
        })
      }
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  s3Input() {
    const {getS3Path, name, defaultPreview, required} = this.props
    const {imagePreviewUrl} = this.state

    return (
      getS3Path && (
        <input
          type="hidden"
          name={name}
          value={defaultPreview || imagePreviewUrl}
          id="s3-input"
          required={required}
        />
      )
    )
  }

  getFileInputName() {
    const {getS3Path, name} = this.props

    return getS3Path ? 'false' : name
  }

  getRequired() {
    const {getS3Path, required} = this.props

    return getS3Path ? false : required
  }

  render() {
    const {buttonLabel, className, helpText, label, placeholder} = this.props
    const {file, valid, errorMessage} = this.state

    return (
      <div className={classNames('rev-MediaUploader', className)}>
        {this.imagePreview()}
        {this.s3Input()}
        <FileInput.Stack
          label={label}
          button={buttonLabel}
          placeholder={file.name || placeholder}
          name={this.getFileInputName()}
          accept="image/*, video/*"
          onChange={this.updatePreview}
          help={helpText}
          error={!valid && errorMessage}
          required={this.getRequired()}
        />
      </div>
    )
  }
}

MediaUploader.defaultProps = {
  maxFileSize: 5,
  maxFileSizeMessage: 'Please choose a smaller file',
  placeholder: 'Choose file...',
  supportedFileTypes: [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'video/mp4',
  ],
  supportedFileTypesMessage: 'Please choose a supported file type',
}

MediaUploader.propTypes = {
  buttonLabel: PropTypes.string,
  className: PropTypes.string,
  defaultPreview: PropTypes.string,
  getS3Path: PropTypes.func,
  helpText: PropTypes.string,
  imageClassName: PropTypes.string,
  label: PropTypes.string,
  maxFileSize: PropTypes.number,
  maxFileSizeMessage: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  supportedFileTypes: PropTypes.arrayOf(PropTypes.string),
  supportedFileTypesMessage: PropTypes.string,
}

export default MediaUploader
