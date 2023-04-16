import { describe, expect, test, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import router from '../../../../router'
import UsersListTable from '../components/UsersListTable.vue'
import type { GLUserType } from '../types/graphql.type'

const testUsers: GLUserType[] = [
    {
        chat_id: '123',
        user_id: '123',
        name: 'test',
        lastname: 'test',
        middlename: 'test',
        email: 'test@test.test',
        phone: '99999999999',
    }
]

const mountUsersListTable = () => {
    return mount(UsersListTable, {
        global: {
            plugins: [router],
        },
        props: {
            users: testUsers,
        },
    })
}

describe('Testing users list', async () => {
    let usersListTable: VueWrapper<InstanceType<typeof UsersListTable>>
    
    beforeEach(() => {
        usersListTable = mountUsersListTable()
    })
    
    test('Mount users list', async () => {
        expect(mountUsersListTable()).toBeTruthy()
    })
    
    test('Route to statistic', async () => {
        const push = vi.spyOn(router, 'push')
        
        await usersListTable.find('button').trigger('click')

        expect(push).toHaveBeenCalledOnce()

        expect(push).toHaveBeenCalledWith({
            name: 'AdminStatisticPage',
            query: {
                'user-id': testUsers[0].user_id,
            },
        })
    })
})