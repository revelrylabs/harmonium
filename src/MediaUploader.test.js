/* eslint-disable camelcase */
import React from 'react'
import MediaUploader from './MediaUploader'
import mediaUploaderUtils from './MediaUploader/utils'

describe('MediaUploader', () => {
  it('can render with no config', () => {
    expect(() => shallow(<MediaUploader />)).not.to.throw()
  })

  it('updates the preview image when the state changes', () => {
    const wrapper = mount(<MediaUploader defaultPreview="path/to/image.jpg" />)

    expect(wrapper.find('img[src="path/to/image.jpg"]').length).to.equal(1)

    wrapper.setState({imagePreviewUrl: 'anotherimage.jpg'})

    expect(wrapper.find('img[src="anotherimage.jpg"]').length).to.equal(1)
  })

  it('can preview a video file', () => {
    const wrapper = mount(<MediaUploader />)

    wrapper.setState({
      imagePreviewUrl: 'another.mp4',
      file: {type: 'video/mp4'},
    })
    expect(wrapper.find('video[src="another.mp4"]').length).to.equal(1)
  })

  it('adjusts appropriately when in presigned URL mode', () => {
    const wrapper = mount(
      <MediaUploader
        getS3Info={() => ({
          url: '/fake/path',
          signed_request: 'another/fake/path',
        })}
        name="image"
        required
      />
    )

    expect(
      wrapper.find('input[type="file"][name="false"][required=false]').length
    ).to.equal(1)
    expect(
      wrapper.find('input[type="hidden"][name="image"][required]').length
    ).to.equal(1)
  })

  it('adjusts appropriately when file is invalid', () => {
    const wrapper = mount(
      <MediaUploader
        getS3Info={() => ({
          url: '/fake/path',
          signed_request: 'another/fake/path',
        })}
        defaultPreview="fake.jpg"
      />
    )

    expect(
      wrapper.find('input[type="hidden"][value="fake.jpg"]').length
    ).to.equal(1)

    wrapper.setState({
      valid: false,
    })

    expect(wrapper.find('input[type="hidden"][value=""]').length).to.equal(1)
  })

  it('can check if a file is a video file', () => {
    expect(mediaUploaderUtils.isVideoFile({type: ''})).to.equal(false)

    const file = {type: 'video/mp4'}

    expect(mediaUploaderUtils.isVideoFile(file)).to.equal(true)
  })

  it('can check if a file is too big', () => {
    const file = {size: 10000000}

    expect(mediaUploaderUtils.isTooBig(file, 10)).to.equal(false)
    expect(mediaUploaderUtils.isTooBig(file, 1)).to.equal(true)
  })

  it('can check if a file is of an unsupported type', () => {
    const file = {type: 'image/png'}

    expect(
      mediaUploaderUtils.isUnsupportedFileType(file, ['image/png'])
    ).to.equal(false)
    expect(
      mediaUploaderUtils.isUnsupportedFileType(file, ['image/jpg'])
    ).to.equal(true)
  })
})
