export type ResumeType = {
    id: string
    age: number
    birthDate: string
    area: string
    areaId: string
    email: string
    phone: PhoneType
    download: string
    education: EducationType
    firstName: string
    lastName: string
    middleName: string
    salary: number
    title: string
    photo: PhotoType
    experience: ExperienceType[]
    skills: string[]
}

export type EducationType = {
    level: EducationLevelType
    name: string
    year: string
}

export type EducationLevelType = {
    id: string
    name: string
}

export type ExperienceType = {
    company: string
    company_id: string
    position: string
    start: string
    end: string
    description: string
}

export type PhoneType = {
    country: string
    city: string
    number: string
}

export type PhotoType = {
    id: string
    medium: string
}