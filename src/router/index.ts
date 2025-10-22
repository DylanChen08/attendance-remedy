import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AttendanceView from '@/views/attendance'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/attendance'
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: AttendanceView,
    meta: {
      title: '考勤查询',
      icon: 'Calendar'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
