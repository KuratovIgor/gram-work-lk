<template>
  <div class="profile">
    <el-row justify="space-between">
      <el-col :span="3">
        <el-upload
          :show-file-list="false"
          action="#"
          :auto-upload="false"
          :on-change="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
          >
            <Camera />
          </el-icon>
        </el-upload>
      </el-col>
      <el-col :span="20">
        <p class="profile__name">
          Иванов Иван Иванович
        </p>

        <el-row class="mb-16">
          <el-col :span="2">
            <p>Email:</p>
          </el-col>
          <el-col :span="22">
            <p>test@gmail.com</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            Телефон:
          </el-col>
          <el-col :span="22">
            89999999999
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <div class="d-f jc-fe">
      <el-button
        type="success"
        size="large"
        icon="Histogram"
        @click="handlePageOpen(LKPages.STATISTIC)"
      >
        Статистика
      </el-button>
      <el-button
        type="primary"
        size="large"
        icon="Document"
        @click="handlePageOpen(LKPages.RESUME)"
      >
        Резюме
      </el-button>
      <el-button
        type="warning"
        size="large"
        icon="Notebook"
        @click="handlePageOpen(LKPages.HISTORY)"
      >
        История
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { LKPages } from '@/utils/enums'
import type { UploadFile, UploadProps } from 'element-plus'
import { ref } from 'vue'

const router = useRouter()

const imageUrl = ref('')

const handleAvatarSuccess = (file: UploadFile): void => {
  imageUrl.value = URL.createObjectURL(file.raw!)
}

const handlePageOpen = (page: string): void => {
  router.push({ name: page })
}
</script>

<style lang="scss" scoped>
.profile {
  padding: 20px;

  &__name {
    font-weight: 700;
    font-size: 30px;
    color: $color--primary-light;
    margin-bottom: 30px;
  }

  &__avatar {
    width: 200px;
    height: 200px;
    border: 1px solid $color--black;
    border-radius: 20px;
    box-shadow: 0 0 5px $color--black;
  }
}
</style>