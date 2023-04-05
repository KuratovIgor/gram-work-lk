<template>
  <div class="auth-form-admin">
    <div class="auth-form-admin__header">
      Авторизация
    </div>

    <div class="horizontal-divider" />

    <el-form
      ref="ruleAuthForm"
      :model="authForm"
      :rules="authFormRules"
      class="auth-form-admin__form"
    >
      <el-form-item
        class="mb-30"
        prop="login"
      >
        <el-input v-model="authForm.login">
          <template #prefix>
            Логин
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="authForm.password"
          type="password"
          show-password
        >
          <template #prefix>
            Пароль
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <el-button
      class="auth-form-admin__button"
      type="danger"
      size="large"
      round
      :loading="loading"
      @click="handleUserAuthorize(ruleAuthForm)"
    >
      Авторизироваться
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { AuthType } from '@/modules/authForm/types/auth.type'
import { showErrorMessage, showSuccessMessage } from '@/utils/message'
import { useQuery } from '@vue/apollo-composable'
import { getAdminQuery } from '@/modules/authForm/api/queries/auth.graphql'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { setIsAdmin } from '@/utils/cookie'

const router = useRouter()

const userStore = useUserStore()

const ruleAuthForm = ref<FormInstance>()
const authForm: AuthType = reactive({
  login: '',
  password: '',
})

const authFormRules = reactive<FormRules>({
  login: { required: true, message: 'Введите логин', trigger: 'blur' },
  password: { required: true, message: 'Введите пароль', trigger: 'blur' },
})

const { loading, variables, onResult: onAuthorize, refetch } = useQuery(getAdminQuery(), { login: '', password: '' })

onAuthorize((queryResult): void => {
  if (queryResult.loading) return

  if (!queryResult.data.adminsList.items.length) {
    showErrorMessage('Неверный логин или пароль!')

    return
  }

  userStore.setIsAuthorized(true)

  userStore.setIsAdmin(true)
  
  setIsAdmin(true)

  showSuccessMessage('Вы авторизированы!')

  router.push({ name: 'AdminProfilePage' })
})

const handleUserAuthorize = (form: FormInstance | undefined): void => {
  if (!form) return

  form.validate(async (valid): Promise<boolean> => {
    if (!valid) return false

    if (variables.value?.login === authForm.login && variables.value?.password === authForm.password) {
      refetch()
    } else {
      variables.value = {
        login: authForm.login,
        password: authForm.password,
      }
    }

    form.resetFields()

    return true
  })
}
</script>

<style lang="scss" scoped>
.auth-form-admin {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 30px;
    color: $color--primary;
  }

  &__form {
    margin: 0 auto 40px;
    width: 100%;
    max-width: 400px;
  }

  &__button {
    width: 100%;
    max-width: 300px;
  }
}
</style>