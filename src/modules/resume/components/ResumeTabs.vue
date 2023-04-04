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
import type { ResumeType } from '@/modules/resume/types/resumes.type'
import ResumeTab from '@/modules/resume/components/ResumeTab.vue'
import { getResumes } from '@/modules/resume/helpers/resume.helper'

const resumes = ref<ResumeType[]>([])
const loading = ref(false)

onMounted(async (): Promise<void> => {
  loading.value = true

  resumes.value = await getResumes()

  loading.value = false
})
</script>

<style lang="scss" scoped>
.resume-tabs {
  height: 100%;
}
</style>