<template>
  <el-scrollbar class="resume-experience">
    <el-timeline>
      <el-timeline-item
        v-for="(experienceItem, index) in experience"
        :key="index"
        color="#0bbd87"
      >
        <el-card class="resume-experience__card">
          <template #header>
            <div class="resume-experience__title">
              {{ experienceItem.company }}
            </div>
          </template>
          <template #default>
            <div class="mb-20">
              {{ experienceItem.position }}
            </div>
            <div>{{ getCorrectDate(experienceItem.start) }} - {{ getCorrectDate(experienceItem.end) }}</div>
          </template>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { getDateFormat } from '@/utils/date'
import type { ExperienceType } from '@/modules/resume/types/resumes.type'

type Props = {
  experience: ExperienceType[]
}

const props = withDefaults(defineProps<Props>(), {
  experience: undefined
})

const getCorrectDate = (date: string): string => {
  return getDateFormat(new Date(date), 'dd MMMM yyyy')
}
</script>

<style lang="scss" scoped>
.resume-experience {
  max-height: 320px;

  &__card {
    font-size: 20px;
  }

  &__title {
    font-size: 25px;
  }
}
</style>