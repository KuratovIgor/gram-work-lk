<template>
  <div class="auth">
    <auth-form />
  </div>
</template>

<script lang="ts" setup>
import { AuthForm } from '@/modules/authForm/index'
</script>

<style lang="scss" scoped>
.auth {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 80px;
}
</style>
