import AuthForm from '../components/AuthForm.vue'
import AuthFormAdmin from '../components/AuthFormAdmin.vue'
import AuthFormUser from '../components/AuthFormUser.vue'
import { describe, expect, test, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import router from '../../../router'
import { setActivePinia, createPinia } from 'pinia'
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '../../../utils/apollo'

const mountForm = (form: any) => {
    return mount(form, {
        global: {
            plugins: [router],
        },
    })
}

const mountMainForm = () => mountForm(AuthForm)
const mountUserForm = () => mountForm(AuthFormUser)
const mountAdminForm = () => mountForm(AuthFormAdmin)

describe('Testing auth form', async () => {
    let adminForm: VueWrapper
    let userForm: VueWrapper

    beforeEach(() => {
        setActivePinia(createPinia())

        provideApolloClient(apolloClient)

        adminForm = mountAdminForm()

        userForm = mountUserForm()
    })
    
    test('Mount form', async () => {
        expect(mountMainForm()).toBeTruthy()
    })

    test('Renders user form inputs', async () => {
        const input = userForm.find('#input')

        expect(input.exists()).toBeTruthy()
    })

    test('Renders admin form inputs', async () => {
        const loginInput = adminForm.find('#login-input')
        const passwordInput = adminForm.find('#password-input')

        expect(loginInput.exists()).toBeTruthy()

        expect(passwordInput.exists()).toBeTruthy()
    })

    test('Renders the user form input value', async () => {
        const input = userForm.find('#input')

        expect(input.text()).toContain('')

        await input.setValue('test')

        expect(input.element.value).toEqual('test')
    })

    test('Renders the admin form inputs values', async () => {
        const loginInput = adminForm.find('#login-input')
        const passwordInput = adminForm.find('#password-input')

        expect(loginInput.text()).toContain('')

        expect(passwordInput.text()).toContain('')
        
        await loginInput.setValue('test')
        
        await passwordInput.setValue('test')
        
        expect(loginInput.element.value).toEqual('test')

        expect(passwordInput.element.value).toEqual('test')
    })
})