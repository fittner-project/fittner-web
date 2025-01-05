import { Outlet } from 'react-router-dom'

import { useVcosole } from '@/hooks/useVconsole'
// 这个是全局的页面 还可以做一些其他的操作

//파이프라인 배포테스트
export default function RootLayout() {
  const [vc] = useVcosole()
  useEffect(() => {
    console.log('VConsole ?', vc)
    if (vc) {
      vc.show()
    }
  }, [])
  return <Outlet />
}
