<template>
  <div class="sidebar">
    <div>
      <sidebar-item
        v-for="(sidebarItem, index) in props.sidebarItems"
        :key="index"
        :page="sidebarItem.page"
        :label="sidebarItem.label"
      >
        <component :is="sidebarItem.icon" />
      </sidebar-item>
    </div>

    <div class="sidebar__footer">
      <el-icon v-if="isDarkMode">
        <sunny />
      </el-icon>
      <el-icon v-else>
        <moon />
      </el-icon>
      <el-switch v-model="isDarkMode" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from '@/components/sidebar/SidebarItem.vue'
import type { SidebarItemType } from '@/types/page.type'
import { ref, watch } from 'vue'
import { useDarkMode } from '@/composables/darkMode'
import { Moon, Sunny } from '@element-plus/icons-vue'

type Props = {
  sidebarItems: SidebarItemType[]
}

const props = withDefaults(defineProps<Props>(), {
  sidebarItems: undefined,
})

const { setDarkMode } = useDarkMode()

const isDarkMode = ref(false)

watch(() => isDarkMode.value, (newValue) => {
  setDarkMode(newValue)
})
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-right: 1px solid var(--color-divider);
  padding: 15px;

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 40px;
    color: var(--color-switch);
  }
}
</style>