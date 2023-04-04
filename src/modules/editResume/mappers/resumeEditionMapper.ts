import type { ResumeType } from '@/modules/resume'

interface IResumeEdition {
    birth_date: string
    area: {
        id: string
    }
    contact: [
        {
            type: {
                id: string
            }
            value: string
        },
        {
            type: {
                id: string
            }
            value: {
                country: string
                city: string
                number: string
            }
            preferred: boolean
        }
    ]
    education: {
        elementary: Array<{
            name: string
            year: number
        }>
        additional: Array<{
            organization: string
            name: string
            result: string
            year: number
        }>
        attestation: Array<{
            organization: string
            name: string
            result: string
            year: number
        }>
        primary: Array<{
            organization: string
            organization_id: string
            name: string
            name_id: string
            result: string
            result_id: string
            year: number
        }>
        level: {
            id: string,
        },
    }
    first_name: string
    middle_name: string
    last_name: string
    salary: {
        amount: number
        currency: string
    }
    title: string
    photo: {
        id: string
    }
    experience: Array<{
        company: string
        company_id: string
        description: string
        start: string
        end: string
        position: string
    }>
    skill_set: Array<string>
}

class ResumeEditionMapper {
    resumeEditionData: IResumeEdition = {
        contact: [
            {
                type: {
                    id: 'email',
                },
                value: '',
            },
            {
                type: {
                    id: 'cell',
                },
                value: {
                    country: '',
                    city: '',
                    number: '',
                },
                preferred: true,
            },
        ],
        birth_date: '',
        area: {
            id: '',
        },
        education: {
            elementary: [],
            additional: [],
            attestation: [],
            primary: [],
            level: {
                id: '',
            },
        },
        experience: [],
        first_name: '',
        last_name: '',
        middle_name: '',
        photo: {
            id: '',
        },
        salary: {
            amount: 0,
            currency: '',
        },
        skill_set: [],
        title: '',
    }
    
    public getResumeEditionData (resume: ResumeType): IResumeEdition {
        this.resumeEditionData.birth_date = resume.birthDate

        this.resumeEditionData.area.id = resume.areaId

        this.resumeEditionData.education.elementary = [{
            name: resume.education.name,
            year: Number(resume.education.year)
        }]

        this.resumeEditionData.education.level.id = resume.education.level.id

        this.resumeEditionData.contact[0].value = resume.email

        this.resumeEditionData.contact[1].value.number = resume.phone.number

        this.resumeEditionData.contact[1].value.city = resume.phone.city

        this.resumeEditionData.contact[1].value.country= resume.phone.country


        this.resumeEditionData.experience = [...resume.experience]

        this.resumeEditionData.first_name = resume.firstName

        this.resumeEditionData.middle_name = resume.middleName

        this.resumeEditionData.last_name = resume.lastName

        this.resumeEditionData.photo.id = resume.photo.id


        this.resumeEditionData.salary.amount = resume.salary

        this.resumeEditionData.salary.currency = 'RUR'

        this.resumeEditionData.skill_set = [...resume.skills]

        this.resumeEditionData.title = resume.title

        return this.resumeEditionData
    }
}

export const resumeEditionMapper = new ResumeEditionMapper()