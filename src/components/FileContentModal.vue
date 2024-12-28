<template>
  <el-dialog :visible="modelValue" @update:visible="handleVisibleChange" title="文件内容" width="30%">
    <pre>{{ fileContent }}</pre>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    fileContent: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const handleClose = () => {
      emit('update:modelValue', false);
    };

    const handleVisibleChange = (value) => {
      emit('update:modelValue', value);
    };

    return {
      handleClose,
      handleVisibleChange
    };
  }
};
</script>