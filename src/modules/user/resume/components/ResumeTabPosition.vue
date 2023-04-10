<template>
  <div class="title">
    {{ props.resume.title }}, {{ props.resume.salary }} руб.
  </div>
  <div class="d-f fw-w">
    <el-tag
      v-for="(skill, index) in props.resume.skills"
      :key="index"
      class="mr-5 mb-20"
      :type="getSkillType()"
      :size="tagSize"
      effect="dark"
      round
    >
      {{ skill }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeType } from '@/modules/user/resume/types/resumes.type'
import { computed, getCurrentInstance } from 'vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')
const tagSize = computed(() => isMobile.value ? 'default' : 'large')

type Props = {
  resume: ResumeType
}

const props = withDefaults(defineProps<Props>(), {
  resume: undefined
})

const skillTypes = ['danger', 'success', 'warning']
let typeIndex = -1

const getSkillType = (): string => {
  typeIndex++

  if (typeIndex > 2) {
    typeIndex = 0
  }

  return skillTypes[typeIndex]
}
</script>