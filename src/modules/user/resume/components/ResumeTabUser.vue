<template>
  <el-row
    class="resume-user"
    justify="space-between"
  >
    <el-col :span="avatarColSpan">
      <el-skeleton
        :loading="!resume.photo.medium"
      >
        <template #template>
          <el-skeleton-item
            variant="image"
            class="resume-user__photo--skeleton"
          />
        </template>
        <template #default>
          <img
            class="resume-user__photo"
            :src="resume.photo.medium"
          />
        </template>
      </el-skeleton>
    </el-col>
    <el-col :span="infoColSpan">
      <div class="title">
        {{ resume.firstName }} {{ resume.lastName }} {{ resume.middleName }}, {{ resume.age }} {{ ageSignature }}
      </div>
      <div class="resume-user__info">
        {{ resume.email }}
      </div>
      <div class="resume-user__info">
        {{ resume.area }}
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { ResumeType } from '@/modules/user/resume/types/resumes.type'
import { computed, getCurrentInstance } from 'vue'
import { declination } from '@/modules/user/resume/helpers/declination.helper'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isDesktop = computed(() => screenSize.value === 'lg')
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')
const avatarColSpan = computed(() => {
  if (isDesktop.value) return 6
  if (isMobile.value) return 24

  return 8
})
const infoColSpan = computed(() => {
  if (isDesktop.value) return 17
  if (isMobile.value) return 24

  return 15
})

type Props = {
  resume: ResumeType
}

const props = withDefaults(defineProps<Props>(), {
  resume: undefined
})

const ageSignature = computed(() => declination(props.resume.age, ['год', 'года', 'лет']))
</script>

<style lang="scss" scoped>
.resume-user {
  &__photo {
    max-width: 100%;
    height: 100%;
    max-height: 200px;
    border-radius: 10px;

    &--skeleton {
      height: 250px;
    }

    @media (max-width: $screen--sm) {
      margin-bottom: 20px;
    }

    @media (max-width: $screen--xs) {
      margin-bottom: 10px;
    }
  }

  &__info {
    margin-bottom: 20px;

    @media (max-width: $screen--sm) {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}
</style>