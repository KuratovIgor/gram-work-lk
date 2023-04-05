<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Пользователь">
      <auth-form-user />
    </el-tab-pane>
    <el-tab-pane label="Администратор">
      <auth-form-admin />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import AuthFormUser from '@/modules/authForm/components/AuthFormUser.vue'
import AuthFormAdmin from '@/modules/authForm/components/AuthFormAdmin.vue'
</script>