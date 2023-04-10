<template>
  <el-card>
    <template #header>
      <slot name="header" />
    </template>

    <template #default>
      <slot name="content" />

      <el-collapse v-model="isMoreInfo">
        <el-collapse-item>
          <template #title>
            <slot name="collapse-title" />
          </template>

          <slot name="collapse-content" />
        </el-collapse-item>
      </el-collapse>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isMoreInfo = ref(false)
</script>