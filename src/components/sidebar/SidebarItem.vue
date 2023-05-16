<template>
  <router-link
    :to="{ name: props.page }"
    class="sidebar-item"
    :class="{ 'sidebar-item--active': currentPage === props.page }"
    @click="handleDrawerClose"
  >
    <el-tooltip
      v-if="!isMobile"
      :content="props.label"
      placement="right"
    >
      <div class="sidebar-item__icon-wrapper">
        <el-icon class="sidebar-item__icon">
          <slot />
        </el-icon>
      </div>
    </el-tooltip>

    <template v-else>
      <div class="sidebar-item__icon-wrapper">
        <el-icon class="sidebar-item__icon">
          <slot />
        </el-icon>
      </div>
      <div
        v-if="isMobile"
        class="ml-10"
      >
        {{ props.label }}
      </div>
    </template>
  </router-link>
</template>

<script lang="ts" setup>
import type { LKPages } from '@/utils/enums'
import { useRoute } from 'vue-router'
import { computed, getCurrentInstance } from 'vue'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

type Props = {
  page: LKPages
  label: string
}

const emit = defineEmits(['close'])
const props = withDefaults(defineProps<Props>(), {
  page: undefined,
  label: '',
})

const route = useRoute()

const currentPage = computed(() => route.name)

const handleDrawerClose = (): void => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  transition: 0.2s linear;
  cursor: pointer;
  margin-bottom: 20px;
  text-decoration: none;

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;

    &:hover,
    &--active {
      box-shadow: 0 0 10px var(--color-primary-light);
    }

    &:active {
      box-shadow: 0 0 5px $color--primary;
    }
  }

  &__icon {
    font-size: 30px;
    color: var(--color-primary);
  }
}
</style>