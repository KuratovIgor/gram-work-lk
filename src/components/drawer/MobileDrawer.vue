<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    size="70%"
    @close="handleDrawerClose"
  >
    <template #title>
      <h1 class="mb-0">
        GramWork
      </h1>
    </template>
    <sidebar-item
      v-for="(sidebarItem, index) in props.sidebarItems"
      :key="index"
      :page="sidebarItem.page"
      :label="sidebarItem.label"
      @close="handleDrawerClose"
    >
      <component :is="sidebarItem.icon" />
    </sidebar-item>
    <template #footer>
      <div class="d-f jc-sb ai-fe">
        <div class="switch">
          <el-icon v-if="isDarkMode">
            <sunny />
          </el-icon>
          <el-icon v-else>
            <moon />
          </el-icon>

          <el-switch v-model="isDarkMode" />
        </div>

        <img
          v-if="!isDarkMode"
          class="logo"
          src="/src/assets/images/logo.jpg"
        />
        <img
          v-else
          class="logo"
          src="/src/assets/icons/logo.svg"
        />
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import SidebarItem from '@/components/sidebar/SidebarItem.vue'
import type { SidebarItemType } from '@/types/page.type'
import { useDarkMode } from '@/composables/darkMode'
import { Sunny, Moon } from '@element-plus/icons-vue'

type Props = {
  isDrawerVisible: boolean,
  sidebarItems: SidebarItemType[]
}

const emit = defineEmits(['close'])
const props = withDefaults(defineProps<Props>(), {
  isDrawerVisible: false,
  sidebarItems: undefined,
})

const { setDarkMode } = useDarkMode()

watch(() => props.isDrawerVisible, (value) => {
  drawer.value = value
})

const isDarkMode = ref(false)

watch(() => isDarkMode.value, (newValue) => {
  setDarkMode(newValue)
})

const handleDrawerClose = (): void => {
  emit('close')
}

const drawer = ref(false)
</script>

<style lang="scss" scoped>
.logo {
  max-width: 115px;
}

.switch {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  color: var(--color-switch);
}
</style>