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
      <img
        class="logo"
        src="/src/assets/images/logo.jpg"
      />
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import SidebarItem from '@/components/sidebar/SidebarItem.vue'
import type { SidebarItemType } from '@/types/page.type'

type Props = {
  isDrawerVisible: boolean,
  sidebarItems: SidebarItemType[]
}

const emit = defineEmits(['close'])
const props = withDefaults(defineProps<Props>(), {
  isDrawerVisible: false,
  sidebarItems: undefined,
})

watch(() => props.isDrawerVisible, (value) => {
  drawer.value = value
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
</style>