export type ResumeType = {
    age: number
    area: string
    email: string
    download: string
    education: EducationType
    firstName: string
    lastName: string
    middleName: string
    salary: number
    title: string
    photo: string
    experience: ExperienceType[]
    skills: string[]
}

export type EducationType = {
    level: string
    name: string
    year: string
}

export type ExperienceType = {
    company: string
    position: string
    start: string
    end: string
}