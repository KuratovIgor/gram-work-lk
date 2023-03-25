<template>
  <div class="resume">
    <el-row justify="space-between">
      <el-col :span="13">
        <resume-tab-user :resume="resume" />
      </el-col>
      <el-col :span="1">
        <div class="vertical-divider" />
      </el-col>
      <el-col :span="10">
        <resume-tab-position :resume="resume" />
      </el-col>
    </el-row>

    <div class="horizontal-divider" />
    
    <el-row justify="space-between">
      <el-col :span="13">
        <resume-tab-experience
          class="pr-40"
          :experience="resume.experience"
        />
      </el-col>
      <el-col :span="1">
        <div class="vertical-divider" />
      </el-col>
      <el-col :span="10">
        <resume-tab-education :education="resume.education" />
      </el-col>
    </el-row>

    <div class="horizontal-divider" />

    <el-row justify="end">
      <el-button
        type="warning"
        size="large"
        icon="edit"
      >
        Редактировать
      </el-button>
      <el-button
        type="primary"
        size="large"
        icon="download"
        @click="handleResumeDownload(resume.download, resume.title)"
      >
        Скачать
      </el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeType } from '@/modules/resume/types/resumes.type'
import { downloadResumePdf } from '@/modules/resume/api/download.api'
import ResumeTabExperience from '@/modules/resume/components/ResumeTabExperience.vue'
import ResumeTabUser from '@/modules/resume/components/ResumeTabUser.vue'
import ResumeTabPosition from '@/modules/resume/components/ResumeTabPosition.vue'
import ResumeTabEducation from '@/modules/resume/components/ResumeTabEducation.vue'

type Props = {
  resume: ResumeType
}

const props = withDefaults(defineProps<Props>(), {
  resume: undefined
})

const handleResumeDownload = (url: string, fileName: string): void => {
  downloadResumePdf(url, fileName)
}
</script>

<style lang="scss" scoped>
.resume {
  font-size: 20px;

  &__title {
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 40px;
  }
}
</style>