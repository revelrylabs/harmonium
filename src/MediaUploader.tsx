import React, {Component, ChangeEvent} from 'react'
import FileInput from './FileInput'
import utils, {GetSignedUrlFunction} from './MediaUploader/utils'
import classNames from 'classnames'

export interface MediaUploaderProps {
  buttonLabel?: string
  className?: string
  defaultPreview?: string
  getS3Info?: GetSignedUrlFunction
  helpText?: string
  imageClassName?: string
  label?: string
  maxFileSize?: number
  maxFileSizeMessage?: string
  name?: string
  placeholder?: string
  required?: boolean
  supportedFileTypes?: string[]
  supportedFileTypesMessage?: string
}

interface MediaUploaderState {
  file: File | string
  imagePreviewUrl: string
  valid: boolean
  errorMessage?: string
}

/**
 * MediaUploader component for uploading and previewing images and videos
 * Can optionally upload files to S3 using presigned URLs
 */
class MediaUploader extends Component<MediaUploaderProps, MediaUploaderState> {
  static defaultProps = {
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

  constructor(props: MediaUploaderProps) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: props.defaultPreview || '',
      valid: true,
    }
  }

  // check file size and type and set the error message accordingly
  validateFile(file: File): boolean {
    const {
      supportedFileTypes = [],
      supportedFileTypesMessage,
      maxFileSize = 5,
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
  renderImageOrVideoPreview(): React.ReactNode {
    const {imageClassName} = this.props
    const {imagePreviewUrl, file} = this.state
    const previewClassNames = classNames(
      'rev-MediaUploaderPreview',
      imageClassName
    )

    if (file && typeof file !== 'string' && utils.isVideoFile(file)) {
      return (
        <video
          controls
          className={previewClassNames}
          src={imagePreviewUrl}
        />
      )
    }

    return (
      <img
        className={previewClassNames}
        alt="preview"
        src={imagePreviewUrl}
      />
    )
  }

  // check if we should render the preview
  imagePreview(): React.ReactNode {
    const {imagePreviewUrl} = this.state

    if (!imagePreviewUrl) {
      return null
    }

    return this.renderImageOrVideoPreview()
  }

  // read the new file, validate it, and upload to s3 if enabled
  updatePreview = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const {getS3Info} = this.props
    const reader = new FileReader()
    const input = e.target
    const file = input.files?.[0]

    if (!file) return

    reader.addEventListener('load', async () => {
      const valid = this.validateFile(file)

      if (valid === false) {
        if (input) {
          input.value = ''
        }

        this.setState({
          imagePreviewUrl: '',
          file: '',
          valid,
        })
      } else {
        let url = reader.result as string

        if (getS3Info) {
          url = await utils.uploadFileToS3(file, getS3Info)
        }

        this.setState({
          imagePreviewUrl: url,
          file,
          valid,
        })
      }
    })

    reader.readAsDataURL(file)
  }

  // use a hidden input when in presigned URL mode
  // since you can't set file input values programmatically
  s3Input(): React.ReactNode {
    const {getS3Info, name, defaultPreview, required} = this.props
    const {imagePreviewUrl, valid} = this.state

    const getValue = (): string => {
      if (!valid) {
        return ''
      }

      return imagePreviewUrl || defaultPreview || ''
    }

    return (
      getS3Info && (
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
  getFileInputName(): string {
    const {getS3Info, name} = this.props

    return getS3Info ? '' : name || ''
  }

  getRequired(): boolean {
    const {getS3Info, required} = this.props

    return getS3Info ? false : !!required
  }

  render() {
    const {buttonLabel, className, helpText, label, placeholder, supportedFileTypes = []} = this.props
    const {file, valid, errorMessage} = this.state
    const fileName = typeof file === 'string' ? file : file?.name || ''

    return (
      <div className={classNames('rev-MediaUploader', className)}>
        {this.imagePreview()}
        {this.s3Input()}
        <FileInput.Stack
          label={label}
          button={buttonLabel}
          placeholder={fileName || placeholder}
          name={this.getFileInputName()}
          accept={supportedFileTypes.join()}
          onChange={this.updatePreview}
          help={helpText}
          error={!valid && errorMessage}
          required={this.getRequired()}
        />
      </div>
    )
  }
}

export default MediaUploader 