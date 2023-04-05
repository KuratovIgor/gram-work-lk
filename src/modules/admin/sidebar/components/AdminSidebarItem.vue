<template>
  <router-link
    :to="{ name: props.page }"
    class="sidebar-item"
    :class="{ 'sidebar-item--active': currentPage === props.page }"
  >
    <el-tooltip
      :content="props.label"
      placement="right"
    >
      <el-icon class="sidebar-item__icon">
        <slot />
      </el-icon>
    </el-tooltip>
  </router-link>
</template>

<script lang="ts" setup>
import { LKPages } from '@/utils/enums'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

type Props = {
  page: LKPages
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  page: undefined,
  label: '',
})

const route = useRoute()

const currentPage = computed(() => route.name)
</script>

<style lang="scss" scoped>
.sidebar-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid $color--primary;
  border-radius: 50%;
  transition: 0.2s linear;
  cursor: pointer;
  margin-bottom: 20px;

  &__icon {
    font-size: 30px;
    color: $color--primary;
  }

  &:hover,
  &--active {
    box-shadow: 0 0 10px $color--primary-light;
  }

  &:active {
    box-shadow: 0 0 5px $color--primary;
  }
}
</style>