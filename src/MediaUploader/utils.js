import {includes} from 'lodash'

// upload to a presigned s3 url
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

// get the presigned url for a file from an endpoint
// and call makeS3Request to upload the file
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

// check if a file is a video
function isVideoFile(file) {
  if (file.type.slice(0, 5) === 'video') {
    return true
  }
  return false
}

// check file size in bytes against a max size in MB
function isTooBig(file, maxFileSize) {
  const fileSize = file.size / 1024 / 1024 // in MB
  return fileSize > maxFileSize
}

// check file type
function isUnsupportedFileType(file, supportedFileTypes) {
  return !includes(supportedFileTypes, file.type)
}

export default {
  uploadFileToS3,
  isVideoFile,
  isTooBig,
  isUnsupportedFileType,
}
