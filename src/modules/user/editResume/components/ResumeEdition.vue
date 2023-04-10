<template>
  <div>
    <el-row
      v-loading="loading"
      justify="space-between"
    >
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
            v-if="resumeEditionFormData.photo.medium"
            :src="resumeEditionFormData.photo.medium"
            class="avatar"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
          >
            <Camera />
          </el-icon>
        </el-upload>
      </el-col>
      <el-col :span="contentColSpan">
        <el-form
          ref="resumeEditionForm"
          :model="resumeEditionFormData"
        >
          <el-row justify="space-between">
            <el-col :span="contentItemSpan">
              <div class="mb-10 title">
                Обо мне
              </div>
              <el-form-item prop="lastName">
                <el-input
                  v-model="resumeEditionFormData.lastName"
                  class="w-100"
                >
                  <template #prefix>
                    Фамилия
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="firstName">
                <el-input
                  v-model="resumeEditionFormData.firstName"
                  class="w-100"
                >
                  <template #prefix>
                    Имя
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="middleName">
                <el-input
                  v-model="resumeEditionFormData.middleName"
                  class="w-100"
                >
                  <template #prefix>
                    Отчество
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="age">
                <el-date-picker
                  v-model="resumeEditionFormData.birthDate"
                  class="w-100"
                  type="date"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
              <el-form-item
                class="mb-30"
                prop="area"
              >
                <el-select
                  v-model="resumeEditionFormData.area"
                  class="w-100"
                  filterable
                  remote
                  :remote-method="getAreas"
                  :loading="areasLoading"
                  placeholder="Выберите город"
                  @change="handleAreaChange"
                >
                  <template #prefix>
                    Город
                  </template>
                  <el-option
                    v-for="area in areas"
                    :key="area.id"
                    :label="area.text"
                    :value="area.id"
                  />
                </el-select>
              </el-form-item>
              <div class="mb-10 title">
                Проф. информация
              </div>
              <el-form-item prop="age">
                <el-input
                  v-model="resumeEditionFormData.title"
                  class="w-100"
                >
                  <template #prefix>
                    Должность
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                class="mb-30"
                prop="age"
              >
                <el-input
                  v-model="resumeEditionFormData.salary"
                  class="w-100"
                >
                  <template #prefix>
                    Зарплата
                  </template>
                </el-input>
              </el-form-item>
              <div class="mb-10 title">
                Образование
              </div>
              <el-form-item prop="level">
                <el-select
                  v-model="resumeEditionFormData.education.level.name"
                  class="w-100"
                  @change="handleEducationLevelChange"
                >
                  <template #prefix>
                    Уровень
                  </template>
                  <el-option
                    v-for="level in EDUCATION_LEVELS"
                    :key="level.id"
                    :label="level.name"
                    :value="level"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="education">
                <el-input
                  v-model="resumeEditionFormData.education.name"
                  class="w-100"
                >
                  <template #prefix>
                    Заведение
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                prop="age"
                label="Дата окончания"
              >
                <el-date-picker
                  v-model="resumeEditionFormData.education.year"
                  class="w-100"
                  type="year"
                  format="YYYY"
                  value-format="YYYY"
                  placeholder="Дата окончания"
                />
              </el-form-item>
            </el-col>
            <el-col
              v-if="!isMobile"
              :span="1"
              class="d-f jc-c"
            >
              <div class="vertical-divider" />
            </el-col>
            <el-col :span="contentItemSpan">
              <div class="mb-10 title">
                Ключевые навыки
              </div>
              <el-tag
                v-for="(skill, index) in resumeEditionFormData.skills"
                :key="index"
                class="mr-5 mb-20"
                :type="getSkillType()"
                :size="tagSize"
                effect="dark"
                round
                closable
                @close="handleSkillRemove(skill)"
              >
                {{ skill }}
              </el-tag>
              <div class="mb-40 d-f">
                <el-form-item prop="age">
                  <el-input
                    v-model="skill"
                    class="w-100 mr-10"
                    @keydown.enter="handleSkillAdd"
                  />
                </el-form-item>
                <el-button
                  class="add-button"
                  type="primary"
                  round
                  @click="handleSkillAdd"
                >
                  +
                </el-button>
              </div>
              <div>
                <div class="mb-10 title">
                  Опыт работы
                </div>
                <el-scrollbar height="400">
                  <el-button
                    class="add-button"
                    type="primary"
                    round
                    @click="handleExperienceAdd"
                  >
                    +
                  </el-button>
                  <div
                    v-for="(experienceItem, index) in resumeEditionFormData.experience"
                    :key="index"
                    class="mb-20"
                  >
                    <div class="horizontal-divider" />
                    <el-form-item prop="company">
                      <el-select 
                        v-model="experienceItem.company"
                        class="w-100"
                        filterable
                        remote
                        :remote-method="getCompanies"
                        :loading="companiesLoading"
                        placeholder="Выберите компанию"
                        @change="handleCompanyChange($event, index)"
                      >
                        <template #prefix>
                          Компания
                        </template>
                        <el-option
                          v-for="company in companies"
                          :key="company.id"
                          :label="company.text"
                          :value="company"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="position">
                      <el-input
                        v-model="experienceItem.position"
                        class="w-100"
                      >
                        <template #prefix>
                          Должность
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="description">
                      <el-input
                        v-model="experienceItem.description"
                        class="w-100"
                        type="textarea"
                      >
                        <template #prefix>
                          Описание
                        </template>
                      </el-input>
                    </el-form-item>
                    <div class="d-f jc-sb">
                      <el-form-item prop="start">
                        <el-date-picker
                          v-model="experienceItem.start"
                          class="w-100"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                        />
                      </el-form-item>
                      <div> - </div>
                      <el-form-item prop="end">
                        <el-date-picker 
                          v-model="experienceItem.end"
                          class="w-100"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                        />
                      </el-form-item>
                    </div>
                    <div class="d-f jc-fe">
                      <el-button
                        type="danger"
                        icon="delete"
                        round
                        @click="handleExperienceRemove(index)"
                      />
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <div class="horizontal-divider" />
    <div class="d-f jc-fe">
      <el-button
        type="success"
        :loading="editionLoading"
        @click="handleResumeEdit"
      >
        Сохранить
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showErrorMessage } from '@/utils/message'
import type { ResumeType, EducationLevelType } from '@/modules/user/resume'
import type { FormInstance, UploadFile } from 'element-plus'
import type { AreaType } from '@/types/area.type'
import { EDUCATION_LEVELS } from '@/modules/user/editResume/constants/constants'
import type { CompanyType } from '@/modules/user/editResume/types/company.type'
import { getAllAreas } from '@/helpers/area.helper'
import { getAllCompanies } from '@/modules/user/editResume/helpers/company.helper'
import { getSkillType } from '@/modules/user/editResume/helpers/skills.helper'
import { resumeApi } from '@/api/resume.api'
import { editResume, saveAvatar } from '@/modules/user/editResume/helpers/resumeEdition.hepler'
import { parseResumeInfo } from '@/helpers/resume.helper'

const screenSize = computed(() => getCurrentInstance()?.appContext.config.globalProperties?.$screen?.size)
const isMobile = computed(() => !screenSize.value || screenSize.value === 'xs')
const isTablet = computed(() => screenSize.value === 'sm')
const avatarColSpan = computed(() => !isTablet.value && !isMobile.value ? 3 : 24)
const contentColSpan = computed(() => !isTablet.value && !isMobile.value ? 20 : 24)
const contentItemSpan = computed(() => isMobile.value ? 24 : 11)
const tagSize = computed(() => isMobile.value || isTablet.value ? 'default' : 'large')

const route = useRoute()

const resumeEditionFormData = reactive<ResumeType>({
  age: 0,
  birthDate: '',
  area: '',
  areaId: '',
  download: '',
  education: {
    level: {
      id: '',
      name: '',
    },
    name: '',
    year: '',
  },
  email: '',
  phone: {
    number: '',
    city: '',
    country: '',
  },
  experience: [],
  firstName: '',
  id: '',
  lastName: '',
  middleName: '',
  photo: {
    id: '',
    medium: '',
  },
  salary: 0,
  skills: [],
  title: ''
})

const resumeEditionForm = ref<FormInstance>()
const skill = ref('')
const loading = ref(false)
const editionLoading = ref(false)
const areasLoading = ref(false)
const companiesLoading = ref(false)
const areas = ref<AreaType[]>()
const companies = ref<CompanyType[]>()

const resumeId = computed((): string => route.params.resumeId.toString())

const getResume = async (): Promise<void> => {
  loading.value = true

  const [error, response] = await resumeApi.getResume(resumeId.value)
  
  if (error) {
    showErrorMessage('При получении резюме произошла ошибка!')
    
    return
  }

  const resume: ResumeType = parseResumeInfo(response)

  resumeEditionFormData.lastName = resume.lastName

  resumeEditionFormData.firstName = resume.firstName

  resumeEditionFormData.middleName = resume.middleName

  resumeEditionFormData.age = resume.age

  resumeEditionFormData.birthDate = resume.birthDate

  resumeEditionFormData.area = resume.area

  resumeEditionFormData.areaId = resume.areaId

  resumeEditionFormData.download = resume.download

  resumeEditionFormData.education.level.name = resume.education.level.name

  resumeEditionFormData.education.level.id = resume.education.level.id

  resumeEditionFormData.education.name = resume.education.name

  resumeEditionFormData.education.year = resume.education.year

  resumeEditionFormData.email = resume.email

  resumeEditionFormData.phone.city = resume.phone.city

  resumeEditionFormData.phone.number = resume.phone.number

  resumeEditionFormData.phone.country = resume.phone.country

  resumeEditionFormData.experience = [...resume.experience]

  resumeEditionFormData.photo.id = resume.photo.id

  resumeEditionFormData.photo.medium = resume.photo.medium

  resumeEditionFormData.salary = resume.salary

  resumeEditionFormData.skills = [...resume.skills]

  resumeEditionFormData.title = resume.title

  resumeEditionFormData.id = resume.id

  loading.value = false
}

const getAreas = async (search: string): Promise<void> => {
  if (!search) return

  areasLoading.value = true

  areas.value = await getAllAreas(search)

  areasLoading.value = false
}

const getCompanies = async (search: string): Promise<void> => {
  if (!search) return

  companiesLoading.value = true

  companies.value = await getAllCompanies(search)

  companiesLoading.value = false
}

const handleAvatarSuccess = async (file: UploadFile): Promise<void> => {
  const avatar = await saveAvatar(file.raw as File)

  if (!avatar) return
  
  resumeEditionFormData.photo.id = avatar.id

  resumeEditionFormData.photo.medium = avatar.url
}

const handleAreaChange = (value: string): void => {
  resumeEditionFormData.areaId = value
}

const handleCompanyChange = (value: CompanyType, index: number): void => {
  resumeEditionFormData.experience[index].company_id = value.id

  resumeEditionFormData.experience[index].company = value.text
}

const handleEducationLevelChange = (value: EducationLevelType): void => {
  resumeEditionFormData.education.level = Object.assign({}, value)
}

const handleSkillAdd = (): void => {
  if (!skill.value) return

  resumeEditionFormData.skills.push(skill.value)

  skill.value = ''
}

const handleSkillRemove = (skill: string): void => {
  resumeEditionFormData.skills = resumeEditionFormData.skills.filter((item) => item != skill)
}

const handleExperienceAdd = (): void => {
  resumeEditionFormData.experience.unshift({
    company: '',
    end: '',
    position: '',
    start: '',
    company_id: '',
    description: '',
  })
}

const handleExperienceRemove = (index: number): void => {
  resumeEditionFormData.experience = resumeEditionFormData.experience.filter((_, itemIndex) => itemIndex !== index)
}

const handleResumeEdit = async (): Promise<void> => {
  editionLoading.value = true

  await editResume(resumeEditionFormData)

  editionLoading.value = false
}

onMounted((): void => {
  getResume()
})
</script>

<style lang="scss">
.add-button {
  border: none;
  font-size: 18px;
  background-color: $color--primary-light;
}

.description {
  height: 100px;
}
</style>