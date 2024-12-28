<template>
  <div>
    <el-table :data="detectionRecordList" style="width: 40%">
      <el-table-column prop="id" label="检测记录序号" width="160"></el-table-column>
      <el-table-column prop="name" label="文件名" width="180"></el-table-column>
      <el-table-column prop="content" label="文件内容" width="160">
        <template #default="scope">
          <el-button @click="showFileContent(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="result" label="检测结果"></el-table-column>
    </el-table>
    <!-- 显示文件内容的弹窗 -->
    <el-dialog v-model="fileContentModalVisible" title="文件内容" width="30%">
      <div style="line-height: 1.2; font-size: 14px; padding: 8px; margin: 0;">{{ fileContent }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="fileContentModalVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage, ElDialog } from 'element-plus';
import axios from '../services/api.js'; // 导入 Axios 实例
export default {
  components: {
    ElDialog
  },
  setup() {
    const detectionRecordList = ref([]);
    const fileContentModalVisible = ref(false);
    const fileContent = ref('');

    const fetchDetectionRecordList = async () => {
      try {
        const res = await axios.get('/record/list'); // 后端获取检测记录接口
        if (res.data.code === 0) {
          detectionRecordList.value = res.data.data; // 从响应的 data 属性中获取检测记录列表数据
        } else {
          ElMessage.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const showFileContent = async (id) => {
      try {
        const res = await axios.get(`/record/getContent/${id}`); // 假设后端有这个接口获取文件内容
        if (res.data.code === 0) {
          fileContent.value = res.data.data; // 从响应的 data 属性中获取文件内容
          fileContentModalVisible.value = true;
        } else {
          ElMessage.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetectionRecordList();

    return {
      detectionRecordList,
      fetchDetectionRecordList,
      showFileContent,
      fileContentModalVisible,
      fileContent
    };
  }
};
</script>
<style scoped>
div {
  display: flex;
  justify-content: center;
}
</style>