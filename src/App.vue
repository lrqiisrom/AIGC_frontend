<template>
  <el-container>
    <el-header>
      <el-button @click="goToUploadList">上传列表</el-button>
      <el-button @click="goToDetectionRecord">检测记录</el-button>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const goToUploadList = () => {
      router.push('/upload-list');
    };
    const goToDetectionRecord = () => {
      router.push('/detection-record');
    };
    return {
      goToUploadList,
      goToDetectionRecord
    };
  }
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #B3C0D1;
  color: white;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>