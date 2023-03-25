import type { ResumeType, ExperienceType, EducationType } from '@/modules/resume/types/resumes.type'

export const parseResumeInfo = (response: any): ResumeType => {
    const experience: ExperienceType[] = []

    response.experience.forEach((item: any): void => {
        const experienceItem: ExperienceType = {
            company: item.company,
            end: item.end,
            position: item.position,
            start: item.start,
        }

        experience.push(experienceItem)
    })

    const education: EducationType = {
        name: response.education.elementary.length ? response.education.elementary[0].name : '',
        year: response.education.elementary.length ? response.education.elementary[0].year : '',
        level: response.education.level.name
    }

    const resume: ResumeType = {
        age: response.age,
        area: response.area.name,
        download: response.download.pdf.url,
        education,
        experience,
        email: response.contact[1].value,
        firstName: response.first_name,
        lastName: response.last_name,
        middleName: response.middle_name,
        photo: response.photo?.medium,
        salary: response.salary.amount,
        title: response.title,
        skills: response.skill_set,
    }

    return resume
}