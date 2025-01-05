import { useEffect, useRef, useState } from 'react';
import VConsole from 'vconsole';

export function useVconsole() {
  const [isClient, setIsClient] = useState(false); // 클라이언트 여부 확인
  const vc = useRef<VConsole | null>(null);

  // 클라이언트에서만 실행되도록 설정
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);  // 브라우저에서만 실행
    }
  }, []);

  useEffect(() => {
    if (isClient && location.href.includes('#vc') && !vc.current) {
      // VConsole을 클라이언트에서만 초기화
      vc.current = new VConsole({ theme: 'dark', maxLogNumber: 1000 });
    }
  }, [isClient]);

  return [vc.current] as const;
}