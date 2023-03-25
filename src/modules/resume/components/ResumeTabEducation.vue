<template>
  <div class="resume-education">
    <div class="resume-education__title">
      Образование
    </div>
    <div
      v-if="education.level"
      class="mb-20"
    >
      Уровень: {{ education.level }}
    </div>
    <div
      v-if="education.name"
      class="mb-20"
    >
      Учебное заведение: {{ education.name }}
    </div>
    <div v-if="education.year">
      Год окончания: {{ education.year }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EducationType } from '@/modules/resume/types/resumes.type'

type Props = {
  education: EducationType
}

const props = withDefaults(defineProps<Props>(), {
  education: undefined
})
</script>

<style lang="scss" scoped>
.resume-education {
  &__title {
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 40px;
  }
}
</style>