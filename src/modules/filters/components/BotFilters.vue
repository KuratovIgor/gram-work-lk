<template>
  <div v-loading="gettingLoading">
    <el-row>
      <el-col
        class="mb-40"
        :span="6"
      >
        <div class="title">
          Должность
        </div>
        <el-input
          v-model="name"
          placeholder="Укажите должность"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        class="mb-40"
        :span="6"
      >
        <div class="title">
          Зарплата
        </div>
        <el-input
          v-model="salary"
          placeholder="Укажите зарплату"
        />
      </el-col>
    </el-row>
    <el-row class="mb-40">
      <el-col :span="6">
        <div class="title">
          Город
        </div>
        <el-select
          v-model="area"
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
      </el-col>
    </el-row>
    <el-row class="mb-40">
      <el-col :span="10">
        <div class="title">
          График
        </div>
        <el-radio-group v-model="schedule">
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
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div class="title">
          Опыт работы
        </div>
        <el-radio-group v-model="experience">
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
        </el-radio-group>
      </el-col>
    </el-row>
    <div class="horizontal-divider" />
    <el-row>
      <el-col
        :span="2"
        :offset="22"
      >
        <el-button
          type="success"
          :loading="savingLoading"
          @click="handleFiltersSave"
        >
          Сохранить
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { getAllAreas } from '@/helpers/area.helper'
import { AreaType } from '@/types/area.type'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { getFilters, saveFilters } from '@/modules/filters/api/mutations/filters.graphql'
import { getChatId } from '@/modules/authForm'
import { showErrorMessage, showSuccessMessage } from '@/utils/message'

const name = ref('')
const salary = ref('')
const area = ref('')
const schedule = ref('')
const experience = ref('')

const areasLoading = ref(false)
const areas = ref<AreaType[]>()

let areaId = ''

const { result, variables, loading: gettingLoading } = useQuery(getFilters(), { chatId: '' })
const {
  mutate: saveDefaultFilters,
  loading: savingLoading,
  error: handleError,
  onDone: onSuccessSaving
} = useMutation(saveFilters())

watch(() => result.value, () => {
  name.value = result.value.default_filter.search

  salary.value = result.value.default_filter.salary

  area.value = result.value.default_filter.area

  areaId = result.value.default_filter.area_id

  schedule.value = result.value.default_filter.schedule

  experience.value = result.value.default_filter.experience
})

watch(() => handleError.value, () => {
  showErrorMessage('При сохранении данных произошла ошибка!')
})

onSuccessSaving(() => {
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