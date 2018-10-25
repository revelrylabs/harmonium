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

async function uploadFileToS3(file, generateUrl) {
  try {
    const response = await fetch(generateUrl(file))
    const {data} = await response.json()
    const url = await makeS3Request(data, file)

    return url
  } catch (e) {
    return alert('Could not upload file.')
  }
}

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

  imagePreview() {
    const {imageClassName} = this.props
    const {imagePreviewUrl, file} = this.state
    const previewClassNames = classNames(
      'rev-MediaUploaderPreview',
      imageClassName
    )

    if (!imagePreviewUrl) {
      return
    }

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

  updatePreview = (e) => {
    const {generateS3URL} = this.props
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

        if (generateS3URL) {
          url = await uploadFileToS3(file)
          input.value = url
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

  render() {
    const {
      buttonLabel,
      className,
      helpText,
      label,
      name,
      placeholder,
      required,
    } = this.props
    const {file, valid, errorMessage} = this.state

    return (
      <div className={classNames('rev-MediaUploader', className)}>
        {this.imagePreview()}
        <FileInput.Stack
          label={label}
          button={buttonLabel}
          placeholder={file.name || placeholder}
          name={name}
          accept="image/*, video/*"
          onChange={this.updatePreview}
          help={helpText}
          error={!valid && errorMessage}
          required={required}
        />
      </div>
    )
  }
}

MediaUploader.defaultProps = {
  maxFileSize: 5,
  maxFileSizeMessage: 'Please choose a smaller image',
  name: 'image',
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
  defaultPhoto: PropTypes.string,
  generateS3URL: PropTypes.func,
  helpText: PropTypes.string,
  imageClassName: PropTypes.string,
  label: PropTypes.string,
  maxFileSize: PropTypes.number,
  maxFileSizeMessage: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.string,
  supportedFileTypes: PropTypes.arrayOf(PropTypes.string),
  supportedFileTypesMessage: PropTypes.string,
}

export default MediaUploader
