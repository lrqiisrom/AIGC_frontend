import { createRouter, createWebHistory } from 'vue-router';
import UploadListView from '../views/UploadListView.vue';
import DetectionRecordView from '../views/DetectionRecordView.vue';

const routes = [
  { path: '/upload-list', component: UploadListView },
  { path: '/detection-record', component: DetectionRecordView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;