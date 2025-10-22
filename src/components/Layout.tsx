import { defineComponent, ref } from 'vue'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar'
import styles from './Layout.module.scss'

// JSX 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export default defineComponent({
  name: 'Layout',
  setup() {
    // 侧边栏折叠状态
    const sidebarCollapsed = ref(false)

    // 切换侧边栏
    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    return () => (
      <div class={styles.layout}>
        {/* 侧边栏 */}
        <div class={`${styles['sidebar-container']} ${sidebarCollapsed.value ? styles['sidebar-collapsed'] : ''}`}>
          <Sidebar collapsed={sidebarCollapsed.value} />
        </div>
        
        {/* 主内容区域 */}
        <div class={`${styles['main-container']} ${sidebarCollapsed.value ? styles['main-expanded'] : ''}`}>
          {/* 顶部导航栏 */}
          <div class={styles['navbar-container']}>
            <Navbar onToggle-sidebar={toggleSidebar} />
          </div>
          
          {/* 页面内容 */}
          <div class={styles['content-container']}>
            <router-view />
          </div>
        </div>
      </div>
    )
  }
})
