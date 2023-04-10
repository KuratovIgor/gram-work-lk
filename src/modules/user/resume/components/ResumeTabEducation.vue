<template>
  <div class="title">
    Образование
  </div>
  <div
    v-if="education.level"
    class="education-item"
  >
    Уровень: {{ education.level.name }}
  </div>
  <div
    v-if="education.name"
    class="education-item"
  >
    Учебное заведение: {{ education.name }}
  </div>
  <div
    v-if="education.year"
    class="education-item"
  >
    Год окончания: {{ education.year }}
  </div>
</template>

<script lang="ts" setup>
import type { EducationType } from '@/modules/user/resume/types/resumes.type'

type Props = {
  education: EducationType
}

const props = withDefaults(defineProps<Props>(), {
  education: undefined
})
</script>

<style lang="scss" scoped>
.education-item {
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
    font-size: 14px;
  }
}
</style>