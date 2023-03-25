<template>
  <el-row
    class="resume-user"
    justify="space-between"
  >
    <el-col :span="6">
      <el-skeleton
        :loading="!resume.photo"
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
            :src="resume.photo"
          />
        </template>
      </el-skeleton>
    </el-col>
    <el-col :span="17">
      <div class="resume-user__title">
        {{ resume.firstName }} {{ resume.lastName }} {{ resume.middleName }}, {{ resume.age }} {{ ageSignature }}
      </div>
      <div class="mb-20">
        {{ resume.email }}
      </div>
      <div>{{ resume.area }}</div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { ResumeType } from '@/modules/resume/types/resumes.type'
import { computed } from 'vue'
import { declination } from '@/modules/resume/helpers/declination.helper'

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
    height: 100%;
    max-height: 200px;
    border-radius: 10px;

    &--skeleton {
      height: 250px;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 40px;
  }
}
</style>