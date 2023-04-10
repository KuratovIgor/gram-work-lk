<template>
  <div class="resume">
    <el-row justify="space-between">
      <el-col :span="leftColSpan">
        <resume-tab-user :resume="props.resume" />
        <div
          v-if="!isDesktop"
          class="horizontal-divider"
        />
      </el-col>
      <el-col :span="1">
        <div 
          v-if="isDesktop"
          class="vertical-divider"
        />
      </el-col>
      <el-col :span="rightColSpan">
        <resume-tab-position :resume="props.resume" />
      </el-col>
    </el-row>

    <div class="horizontal-divider" />
    
    <el-row justify="space-between">
      <el-col :span="leftColSpan">
        <resume-tab-experience
          class="pr-40"
          :experience="props.resume.experience"
        />
        <div
          v-if="!isDesktop"
          class="horizontal-divider"
        />
      </el-col>
      <el-col :span="1">
        <div 
          v-if="isDesktop"
          class="vertical-divider"
        />
      </el-col>
      <el-col :span="rightColSpan">
        <resume-tab-education :education="props.resume.education" />
      </el-col>
    </el-row>

    <div class="horizontal-divider" />

    <el-row justify="end">
      <el-button
        type="warning"
        icon="edit"
        @click="handleResumeEditionPageOpen"
      >
        Редактировать
      </el-button>
      <el-button
        type="primary"
        icon="download"
        @click="handleResumeDownload(props.resume.download, props.resume.title)"
      >
        Скачать
      </el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeType } from '@/modules/user/resume/types/resumes.type'
import { downloadResumePdf } from '@/modules/user/resume/api/download.api'
import ResumeTabExperience from '@/modules/user/resume/components/ResumeTabExperience.vue'
import ResumeTabUser from '@/modules/user/resume/components/ResumeTabUser.vue'
import ResumeTabPosition from '@/modules/user/resume/components/ResumeTabPosition.vue'
import ResumeTabEducation from '@/modules/user/resume/components/ResumeTabEducation.vue'
import { useRouter } from 'vue-router'
import { computed, getCurrentInstance } from 'vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isDesktop = computed(() => screenSize.value === 'lg')
const leftColSpan = computed(() => isDesktop.value ? 13 : 24)
const rightColSpan = computed(() => isDesktop.value ? 10 : 24)

const router = useRouter()

type Props = {
  resume: ResumeType
}

const props = withDefaults(defineProps<Props>(), {
  resume: undefined
})

const handleResumeEditionPageOpen = (): void => {
  router.push({
    name: 'ResumeEditionPage',
    params: {
      resumeId: props.resume.id,
    },
  })
}

const handleResumeDownload = (url: string, fileName: string): void => {
  downloadResumePdf(url, fileName)
}
</script>

<style lang="scss" scoped>
.resume {
  font-size: 18px;
}
</style>