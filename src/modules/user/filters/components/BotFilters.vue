<template>
  <div
    v-loading="gettingLoading"
    class="bot-filters"
  >
    <div class="bot-filters__item">
      <div class="title">
        Должность
      </div>
      <el-input
        v-model="name"
        class="bot-filters__field"
        placeholder="Укажите должность"
      />
    </div>
    <div class="bot-filters__item">
      <div class="title">
        Зарплата
      </div>
      <el-input
        v-model="salary"
        class="bot-filters__field"
        placeholder="Укажите зарплату"
      />
    </div>
    <div class="bot-filters__item">
      <div class="title">
        Город
      </div>
      <el-select
        v-model="area"
        class="bot-filters__field"
        filterable
        remote
        :remote-method="getAreas"
        :loading="areasLoading"
        placeholder="Выберите город"
        @change="handleAreaChange"
      >
        <el-option
          v-for="(areaItem, index) in areas"
          :key="index"
          :label="areaItem.text"
          :value="areaItem"
        />
      </el-select>
    </div>
    <div class="bot-filters__item">
      <div class="title">
        График
      </div>
      <el-radio-group v-model="schedule">
        <div
          v-if="isMobile"
          class="d-f fd-c"
        >
          <el-radio label="fullDay">
            Полный день
          </el-radio>
          <el-radio label="shift">
            Сменный график
          </el-radio>
          <el-radio label="flexible">
            Гибкий график
          </el-radio>
          <el-radio label="remote">
            Удаленная работа
          </el-radio>
          <el-radio label="flyInFlyOut">
            Вахтовый метод
          </el-radio>
        </div>
        <template v-else>
          <el-radio-button label="fullDay">
            Полный день
          </el-radio-button>
          <el-radio-button label="shift">
            Сменный график
          </el-radio-button>
          <el-radio-button label="flexible">
            Гибкий график
          </el-radio-button>
          <el-radio-button label="remote">
            Удаленная работа
          </el-radio-button>
          <el-radio-button label="flyInFlyOut">
            Вахтовый метод
          </el-radio-button>
        </template>
      </el-radio-group>
    </div>
    <div>
      <div class="title">
        Опыт работы
      </div>
      <el-radio-group v-model="experience">
        <div
          v-if="isMobile"
          class="d-f fd-c"
        >
          <el-radio label="noExperience">
            Нет опыта
          </el-radio>
          <el-radio label="between1And3">
            От 1 года до 3 лет
          </el-radio>
          <el-radio label="between3And6">
            От 3 лет до 6 лет
          </el-radio>
          <el-radio label="moreThan6">
            Более 6 лет
          </el-radio>
        </div>
        <template v-else>
          <el-radio-button label="noExperience">
            Нет опыта
          </el-radio-button>
          <el-radio-button label="between1And3">
            От 1 года до 3 лет
          </el-radio-button>
          <el-radio-button label="between3And6">
            От 3 лет до 6 лет
          </el-radio-button>
          <el-radio-button label="moreThan6">
            Более 6 лет
          </el-radio-button>
        </template>
      </el-radio-group>
    </div>
    <div class="horizontal-divider" />
    <div class="d-f jc-fe">
      <el-button
        type="success"
        :loading="savingLoading"
        @click="handleFiltersSave"
      >
        Сохранить
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import { getAllAreas } from '@/helpers/area.helper'
import type { AreaType } from '@/types/area.type'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { getFilters, saveFilters } from '@/modules/user/filters/api/mutations/filters.graphql'
import { showErrorMessage, showSuccessMessage } from '@/utils/message'
import { getChatId } from '@/utils/cookie'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')

const name = ref('')
const salary = ref('')
const area = ref('')
const schedule = ref('')
const experience = ref('')

const areasLoading = ref(false)
const areas = ref<AreaType[]>()

let areaId = ''

const { variables, loading: gettingLoading, onResult: onResultGetting } = useQuery(getFilters(), { chatId: '' })
const {
  mutate: saveDefaultFilters,
  loading: savingLoading,
  onError: onErrorSaving,
  onDone: onSuccessSaving
} = useMutation(saveFilters())

onResultGetting((queryResult): void => {
  if (queryResult.loading) return

  name.value = queryResult.data.default_filter.search

  salary.value = queryResult.data.default_filter.salary

  area.value = queryResult.data.default_filter.area

  areaId = queryResult.data.default_filter.area_id

  schedule.value = queryResult.data.default_filter.schedule

  experience.value = queryResult.data.default_filter.experience
})

onErrorSaving((): void => {
  showErrorMessage('При сохранении данных произошла ошибка!')
})

onSuccessSaving((): void => {
  showSuccessMessage('Фильтры сохранены!')
})

const getAreas = async (search: string): Promise<void> => {
  if (!search) return

  areasLoading.value = true

  areas.value = await getAllAreas(search)

  areasLoading.value = false
}

const handleAreaChange = (value: AreaType): void => {
  areaId = value.id

  area.value = value.text
}

const handleFiltersSave = (): void => {
  saveDefaultFilters({
    chatId: getChatId(),
    search: name.value,
    salary: Number(salary.value),
    areaId,
    area: area.value,
    schedule: schedule.value,
    experience: experience.value,
  })
}

onMounted((): void => {
  variables.value = {
    chatId: getChatId(),
  }
})
</script>

<style lang="scss" scoped>
.bot-filters {
  &__item {
    margin-bottom: 40px;

    @media (max-width: $screen--sm) {
      margin-bottom: 30px;
    }
  }

  &__field {
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: $screen--sm) {
    padding: 10px;
  }
}
</style>