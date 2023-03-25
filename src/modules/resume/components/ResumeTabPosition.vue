<template>
  <div class="resume-position">
    <div class="resume-position__title">
      {{ resume.title }}, {{ resume.salary }} руб.
    </div>
    <div class="resume-position__skills">
      <el-tag
        v-for="(skill, index) of resume.skills"
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

<style lang="scss" scoped>
.resume-position {
  &__title {
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 40px;
  }

  &__skills {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>