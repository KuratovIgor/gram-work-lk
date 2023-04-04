<template>
  <div class="title">
    {{ resume.title }}, {{ resume.salary }} руб.
  </div>
  <div class="d-f fw-w">
    <el-tag
      v-for="(skill, index) in resume.skills"
      :key="index"
      class="mr-5 mb-20"
      :type="getSkillType()"
      size="large"
      effect="dark"
      round
    >
      {{ skill }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import { ResumeType } from '@/modules/resume/types/resumes.type'

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