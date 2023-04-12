<template>
  <el-radio-group v-model="resumeId">
    <el-radio-button
      v-for="resume in resumes"
      :key="resume.id"
      class="mb-20"
      :label="resume.id"
    >
      {{ resume.title }}
    </el-radio-button>
  </el-radio-group>
  <resume-chart
    v-if="resumeViews.length"
    v-loading="loading"
    :views="resumeViews"
  />
</template>

<script lang="ts" setup>
import ResumeChart from './ResumeChart.vue'
import { watch, ref, onMounted } from 'vue'
import type { ResumeViewsType } from '@/modules/user/statistic/types/view.type'
import type { ResumeType } from '@/modules/user/resume'
import { getResumes } from '@/modules/user/resume'
import { getResumeViews } from '@/modules/user/statistic/helpers/views.helper'

const loading = ref(false)
const resumeId = ref('')
const resumes = ref<ResumeType[]>([])
const resumeViews = ref<ResumeViewsType[]>([])

watch(() => resumeId.value, () => {
  getViews()
})

const getViews = async (): Promise<void> => {
  loading.value = true

  resumeViews.value = []

  resumeViews.value = await getResumeViews(resumeId.value)

  loading.value = false
}

onMounted(async (): Promise<void> => {
  resumes.value = await getResumes()

  resumeId.value = resumes.value[0].id

  getViews()
})
</script>