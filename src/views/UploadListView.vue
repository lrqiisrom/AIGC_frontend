<template>
  <div>
    <div class="table-container">
      <el-table :data="uploadList" style="width: 60%">
        <el-table-column prop="id" label="文件序号" width="180"></el-table-column>
        <el-table-column prop="name" label="文件名" width="180"></el-table-column>
        <el-table-column prop="content" label="文件内容" width="180">
          <template #default="scope">
            <el-button @click="showFileContent(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="textnum" label="文本字数" width="180"></el-table-column>
        <el-table-column prop="checked" label="是否勾选">
          <template #default="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-container">
      <div class="upload-button-container">
        <input type="file" multiple @change="handleFileUpload" accept=".txt" />
        <!-- <el-button type="primary" class="custom-button" @click="handleFileUpload">上传文件</el-button> -->
      </div>
      <div class="submit-button-container">
        <el-button @click="submitForDetection" type="primary" class="custom-button">提交检测</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue';
import FileContentModal from '../components/FileContentModal.vue';
import axios from '../services/api.js'; // 导入 Axios 实例
import { ElMessage } from 'element-plus';

export default {
  components: {
    FileContentModal
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const fileList = ref([]);
    const uploadList = ref([]);
    const uploadUrl = '/files/upload'; // 相对 URL，会自动拼接 baseURL
    const fileContentModalVisible = ref(false);
    const fileContent = ref('');

    const beforeUpload = (file) => {
      const isTXT = file.type === 'text/plain';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isTXT) {
        ElMessage.error('上传文件只能是 TXT 格式!');
        return false;
      }
      if (!isLt2M) {
        ElMessage.error('上传文件大小不能超过 2MB!');
        return false;
      }
      return true;
    };

    const handleUploadSuccess = (response) => {
      if (response.data.code === 0) {
        ElMessage.success(response.data.message);
        fetchUploadList();
      } else {
        ElMessage.error(response.data.message);
      }
    };

    const handleUploadError = (err) => {
      ElMessage.error('上传失败');
      console.error(err);
    };

    const fetchUploadList = async () => {
      try {
        const res = await axios.get('/files/list'); // 相对 URL，会自动拼接 baseURL
        if (res.data.code === 0) {
          uploadList.value = res.data.data; // 从响应的 data 属性中获取文件列表数据
        } else {
          ElMessage.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const showFileContent = async (id) => {
      try {
        const res = await axios.get(`/files/getContent/${id}`); // 相对 URL，会自动拼接 baseURL
        fileContent.value = res.data.content;
        fileContentModalVisible.value = true;
      } catch (error) {
        console.error(error);
      }
    };

    const submitForDetection = async () => {
      const selectedFiles = uploadList.value.filter(file => file.checked).map(file => file.id);
      try {
        await axios.post('/submit-detection', { fileIds: selectedFiles }); // 相对 URL，会自动拼接 baseURL
        ElMessage.success('提交检测成功');
      } catch (error) {
        ElMessage.error('提交检测成功');
        console.error(error);
      }
    };

    const handleFileUpload = async (event) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (beforeUpload(file)) {
            const formData = new FormData();
            formData.append('file', file);
            try {
              const response = await axios.post(uploadUrl, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              handleUploadSuccess(response);
            } catch (error) {
              handleUploadError(error);
            }
          }
        }
        event.target.value = null; // 重置文件输入框
      }
    };

    fetchUploadList();

    return {
      fileList,
      uploadList,
      uploadUrl,
      beforeUpload,
      handleUploadSuccess,
      handleUploadError,
      showFileContent,
      submitForDetection,
      fileContentModalVisible,
      fileContent,
      handleFileUpload
    };
  }
};
</script>

<style scoped>

.table-container {
  display: flex;
  justify-content: center;
}
.button-container {
  display: flex;
  flex-direction: column; /* 将子元素按列排列 */
  align-items: center; /* 子元素水平居中 */
}
.custom-button {
  min-width: 120px; /* 设置按钮的最小宽度 */
  height: 32px; /* 设置按钮的高度 */
  margin: 10px 0; /* 设置按钮的上下间距 */
}
.upload-button-container,.submit-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
</style>