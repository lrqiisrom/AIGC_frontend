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
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const detectionRecordList = ref([]);

    const fetchDetectionRecordList = async () => {
      try {
        const res = await axios.get('http://your-backend-api/detection-record'); // 后端获取检测记录接口
        detectionRecordList.value = res.data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetectionRecordList();

    return {
      detectionRecordList
    };
  }
};
</script>
<style scoped>
div {
  display: flex;
  justify-content: center;
}
</style>>