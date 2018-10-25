import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FileInput from './FileInput'
import utils from './MediaUploader/utils'
import classNames from 'classnames'

class MediaUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: props.defaultPreview || '',
      valid: true,
    }
  }

  // check file size and type and set the error message accordingly
  validateFile(file) {
    const {
      supportedFileTypes,
      supportedFileTypesMessage,
      maxFileSize,
      maxFileSizeMessage,
    } = this.props

    if (utils.isTooBig(file, maxFileSize)) {
      this.setState({errorMessage: maxFileSizeMessage})
      return false
    }

    if (utils.isUnsupportedFileType(file, supportedFileTypes)) {
      this.setState({errorMessage: supportedFileTypesMessage})
      return false
    }

    return true
  }

  // check if we have an image or a video
  // and render the appropriate preview
  renderImageOrVideoPreview() {
    const {imageClassName} = this.props
    const {imagePreviewUrl, file} = this.state
    const previewClassNames = classNames(
      'rev-MediaUploaderPreview',
      imageClassName
    )

    if (file && utils.isVideoFile(file)) {
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

  // check if we should render the preview
  imagePreview() {
    const {imagePreviewUrl} = this.state

    if (!imagePreviewUrl) {
      return
    }

    return this.renderImageOrVideoPreview()
  }

  // read the new file, validate it, and upload to s3 if enabled
  updatePreview = (e) => {
    const {getS3Path} = this.props
    const reader = new FileReader()
    const input = e.target
    const file = e.target.files[0]

    reader.addEventListener('load', async () => {
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
          url = await utils.uploadFileToS3(file, getS3Path)
        }

        this.setState({
          imagePreviewUrl: url,
          file,
          valid,
        })
      }
    })

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  // use a hidden input when in presigned URL mode
  // since you can't set file input values programmatically
  s3Input() {
    const {getS3Path, name, defaultPreview, required} = this.props
    const {imagePreviewUrl, valid} = this.state

    function getValue() {
      if (!valid) {
        return ''
      }

      return imagePreviewUrl || defaultPreview
    }

    return (
      getS3Path && (
        <input
          type="hidden"
          name={name}
          value={getValue()}
          id="s3-input"
          required={required}
        />
      )
    )
  }

  // when in presigned URL mode, the file input is just there for looks
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
