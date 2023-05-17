<template>
  <div
    v-loading="loading"
    class="profile"
  >
    <el-row justify="space-between">
      <el-col
        :span="avatarColSpan"
        class="mb-20"
      >
        <el-upload
          :show-file-list="false"
          action="#"
          :auto-upload="false"
          :on-change="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
          >
            <camera />
          </el-icon>
        </el-upload>
      </el-col>
      <el-col :span="infoColSpan">
        <p class="profile__name">
          {{ profile.lastname }} {{ profile.name }} {{ profile.middlename }}
        </p>

        <el-row class="mb-16">
          <el-col :span="emailColSpan">
            <p>Email:</p>
          </el-col>
          <el-col :span="emailValueColSpan">
            <p>{{ profile.email }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="emailColSpan">
            Телефон:
          </el-col>
          <el-col :span="emailValueColSpan">
            {{ profile.phone }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="horizontal-divider" />
    <div class="d-f jc-fe fw-w">
      <el-button
        class="mb-10"
        type="success"
        :size="buttonSize"
        icon="Histogram"
        @click="handlePageOpen(LKPages.STATISTIC)"
      >
        Статистика
      </el-button>
      <el-button
        class="mb-10"
        type="primary"
        :size="buttonSize"
        icon="Document"
        @click="handlePageOpen(LKPages.RESUME)"
      >
        Резюме
      </el-button>
      <el-button
        type="warning"
        :size="buttonSize"
        icon="Notebook"
        @click="handlePageOpen(LKPages.HISTORY)"
      >
        История
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { LKPages } from '@/utils/enums'
import type { UploadFile } from 'element-plus'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getChatId, getUserId } from '@/utils/cookie'
import type { ProfileType } from '@/modules/user/profile/types/profile.type'
import { getProfileQuery } from '@/modules/user/profile/api/queries/profile.graphql'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isTablet = computed(() => screenSize.value === 'sm')
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')
const avatarColSpan = computed(() => isMobile.value || isTablet.value ? 24 : 5)
const infoColSpan = computed(() => isMobile.value || isTablet.value ? 24 : 18)
const emailColSpan = computed(() => isMobile.value || isTablet.value ? 5 : 3)
const emailValueColSpan = computed(() => isMobile.value || isTablet.value ? 19 : 21)
const buttonSize = computed(() => !isTablet.value && !isMobile.value ? 'large' : 'default')

const router = useRouter()

const variables = reactive({
  chatId: '',
  userId: ''
})

const profile = ref<ProfileType>({ email: '', lastname: '', middlename: '', name: '', phone: '' })
const imageUrl = ref('')

const { loading, onResult: onGetProfile } = useQuery(getProfileQuery(), variables)

onGetProfile((queryResult): void => {
  if (queryResult.loading || !queryResult.data.auth_usersList.items.length) return

  profile.value = Object.assign({}, queryResult.data.auth_usersList.items[0])
})

const handleAvatarSuccess = (file: UploadFile): void => {
  imageUrl.value = URL.createObjectURL(file.raw!)
}

const handlePageOpen = (page: string): void => {
  router.push({ name: page })
}

onMounted((): void => {
  variables.chatId = getChatId()

  variables.userId = getUserId()
})
</script>

<style lang="scss" scoped>
.profile {
  padding: 20px;
  color: var(--color-black);

  &__name {
    font-weight: 700;
    font-size: 30px;
    color: var(--color-primary-light);
    margin-bottom: 30px;

    @media (max-width: $screen--sm) {
      font-size: 25px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: $screen--xs) {
    padding: 10px;
  }
}
</style>