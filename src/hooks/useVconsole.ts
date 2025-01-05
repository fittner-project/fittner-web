import { useState, useEffect, useRef } from 'react';
import VConsole from 'vconsole';

export function useVconsole() {
  const [isClient, setIsClient] = useState(false);  // 클라이언트 여부 확인
  const vc = useRef<VConsole | null>(null);

  // 클라이언트에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true);  // 클라이언트에서만 실행
  }, []);

  useEffect(() => {
    // 클라이언트에서만 VConsole을 초기화
    if (isClient && location.href.includes('#vc') && !vc.current) {
      vc.current = new VConsole({ theme: 'dark', maxLogNumber: 1000 });
    }
  }, [isClient]);

  return [vc.current] as const;
}