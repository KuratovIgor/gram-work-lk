<template>
  <div
    v-loading.body="loading"
    class="resume-tabs"
  >
    <el-tabs>
      <el-tab-pane
        v-for="(resume, index) in resumes"
        :key="index"
        :label="resume.title"
      >
        <resume-tab
          :resume="resume"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { resumeApi } from '@/modules/resume/api/resume.api'
import type { ResumeType } from '@/modules/resume/types/resumes.type'
import ResumeTab from '@/modules/resume/components/ResumeTab.vue'
import { parseResumeInfo } from '@/modules/resume/helpers/resume.helper'
import { showErrorMessage } from '@/utils/message'

const resumes = ref<ResumeType[]>([])
const loading = ref(false)

onMounted(async (): Promise<void> => {
  loading.value = true

  const [error, response] = await resumeApi.getResumes()

  if (error) {
    showErrorMessage('При получении резюме произошла ошибка!')
  }

  for (const item of response.items) {
    const [error, resumeResponse] = await resumeApi.getResume(item.id)

    if (error) {
      showErrorMessage('При получении резюме произошла ошибка!')
    }

    const resume = parseResumeInfo(resumeResponse)

    resumes.value.push(resume)
  }

  loading.value = false
})
</script>

<style lang="scss" scoped>
.resume-tabs {
  height: 100%;
}
</style>