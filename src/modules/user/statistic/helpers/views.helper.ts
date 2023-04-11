import { uniq } from 'lodash'
import type { ResumeViewsType, ResumeViewType } from '@/modules/user/statistic/types/view.type'
import { resumeViewsApi } from '@/modules/user/statistic/api/views.api'
import { getDateFormat } from '@/utils/date'

export const getResumeViews = async (resumeId: string): Promise<ResumeViewsType[]> => {
    const resumeViews: ResumeViewsType[] = []
    const allViews = await getAllViews(resumeId)

    const datesCounts = allViews.map((view) => view.date).reduce((acc: any, el: string) => {
        acc[el] = (acc[el] || 0) + 1

        return acc
    }, {})

    Object.keys(datesCounts).forEach((key) => {
        resumeViews.push({
            date: key,
            views: datesCounts[key],
            companies: [],
        })
    })

    resumeViews.map((view) => {
        allViews.forEach((item) => {
            if (view.date === item.date) {
                view.companies.push(item.company)
            }
        })

        view.companies = uniq(view.companies)

        return view
    })

    return resumeViews
}

const getAllViews = async (resumeId: string): Promise<ResumeViewType[]> => {
    const views: ResumeViewType[] = []
    let pageCounter = 0

    while(1) {
        const [_, response] = await resumeViewsApi.getResumeViews(resumeId, pageCounter)

        response.items.forEach((view: any) => {
            views.push({
                date: getDateFormat(new Date(view.created_at), 'dd MMMM yyyy'),
                company: view.employer.name,
            })
        })

        pageCounter++

        if (!response.items.length) break
    }

    return views
}