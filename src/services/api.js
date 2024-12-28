import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8410/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchUploadList = () => instance.get('/upload-list');
export const fetchFileContent = (id) => instance.get(`/file-content/${id}`);
export const uploadFile = (formData) => instance.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const submitForDetection = (fileIds) => instance.post('/submit-detection', { fileIds });
export const fetchDetectionRecordList = () => instance.get('/detection-record');
export default instance;