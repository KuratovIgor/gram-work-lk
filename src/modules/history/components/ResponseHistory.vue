<template>
  <div class="history">
    <el-tabs
      v-model="activeTab"
    >
      <el-tab-pane label="История">
        <response-history-tab />
      </el-tab-pane>
      <el-tab-pane label="Статистика">
        <p>Статистика</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ResponseHistoryTab from '@/modules/history/components/ResponseHistoryTab.vue'

const activeTab = ref('0')
</script>

<style lang="scss" scoped>
.history {
  padding: 20px;
}
</style>