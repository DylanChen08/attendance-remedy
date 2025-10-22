import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Calendar, DataAnalysis, Setting } from '@element-plus/icons-vue'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  collapsed: boolean
}

export default defineComponent({
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(props: SidebarProps) {
    // 路由
    const route = useRoute()
    const router = useRouter()

    // 当前激活的菜单
    const activeMenu = computed(() => route.path)

    // 处理菜单点击
    const handleMenuClick = (index: string) => {
      if (index === '/statistics' || index === '/settings') {
        ElMessage.info('该功能正在开发中...')
        return
      }
      
      if (index !== route.path) {
        router.push(index)
      }
    }

    return () => (
      <div class={`${styles.sidebar} ${props.collapsed ? styles['sidebar-collapsed'] : ''}`}>
        <div class={styles['sidebar-content']}>
          <el-menu
            default-active={activeMenu.value}
            collapse={props.collapsed}
            unique-opened={true}
            router
            class={styles['sidebar-menu']}
            style={{
              '--el-menu-text-color': '#bfcbd9',
              '--el-menu-hover-text-color': '#fff',
              '--el-menu-active-color': '#fff',
              '--el-menu-bg-color': '#304156',
              '--el-menu-hover-bg-color': '#263445',
              '--el-menu-active-bg-color': '#409eff'
            } as any}
          >
            <el-menu-item 
              index="/attendance"
              onClick={() => handleMenuClick('/attendance')}
            >
              <el-icon><Calendar /></el-icon>
              <span>考勤查询</span>
            </el-menu-item>
            
            <el-menu-item 
              index="/statistics"
              onClick={() => handleMenuClick('/statistics')}
            >
              <el-icon><DataAnalysis /></el-icon>
              <span>统计分析</span>
            </el-menu-item>
            
            <el-menu-item 
              index="/settings"
              onClick={() => handleMenuClick('/settings')}
            >
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    )
  }
})
