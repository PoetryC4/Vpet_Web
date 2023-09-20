import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/food',
        name: 'addFood',
        component: () => import('@/views/add/FoodAdd.vue')
    },

    {
        path: '/drink',
        name: 'addDrink',
        component: () => import('@/views/add/DrinkAdd.vue')
    },

    {
        path: '/medicine',
        name: 'addMedicine',
        component: () => import('@/views/add/MedicineAdd.vue')
    },

    {
        path: '/present',
        name: 'addPresent',
        component: () => import('@/views/add/PresentAdd.vue')
    },

    {
        path: '/pet',
        name: 'pet',
        component: () => import('@/views/PetDebug.vue')
    },

    {
        path: '/',
        name: 'App',
        redirect: '/pet',
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/components/interaction/AnimationDebug.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => ({left: 0, top: 0}),
})
export default router