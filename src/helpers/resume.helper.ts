import type { ResumeType, ExperienceType, EducationType } from '@/modules/resume/types/resumes.type'

export const parseResumeInfo = (response: any): ResumeType => {
    const experience: ExperienceType[] = []

    response.experience.forEach((item: any): void => {
        const experienceItem: ExperienceType = {
            company: item.company,
            end: item.end,
            position: item.position,
            start: item.start,
            company_id: item.company_id,
            description: item.description,
        }

        experience.push(experienceItem)
    })

    const education: EducationType = {
        name: response.education.elementary.length ? response.education.elementary[0].name : '',
        year: response.education.elementary.length ? response.education.elementary[0].year.toString() : '',
        level: response.education.level
    }

    const resume: ResumeType = {
        id: response.id,
        age: response.age,
        birthDate: response.birth_date,
        area: response.area.name,
        areaId: response.area.id,
        download: response.download.pdf.url,
        education,
        experience,
        email: response.contact[1].value,
        phone: {
            country: response.contact[0].value.country,
            city: response.contact[0].value.city,
            number: response.contact[0].value.number,
        },
        firstName: response.first_name,
        lastName: response.last_name,
        middleName: response.middle_name,
        photo: {
            id: response.photo?.id,
            medium: response.photo?.medium,
        },
        salary: response.salary.amount,
        title: response.title,
        skills: response.skill_set,
    }

    return resume
}