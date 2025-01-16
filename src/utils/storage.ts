type StorageType = "local" | "session";

interface StorageItem<T> {
  value: T;
  expires?: number;
}

class StorageUtil {
  private getStorage(type: StorageType): Storage {
    return type === "local" ? localStorage : sessionStorage;
  }

  /**
   * 데이터 저장
   * @param key 저장할 키
   * @param value 저장할 값
   * @param type 스토리지 타입
   * @param expires 만료 시간 (밀리초)
   */
  set<T>(
    key: string,
    value: T,
    type: StorageType = "local",
    expires?: number
  ): void {
    try {
      const item: StorageItem<T> = {
        value,
        expires: expires ? new Date().getTime() + expires : undefined,
      };
      this.getStorage(type).setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error("Storage set error:", error);
    }
  }

  /**
   * 데이터 조회
   * @param key 조회할 키
   * @param type 스토리지 타입
   */
  get<T>(key: string, type: StorageType = "local"): T | null {
    try {
      const item = this.getStorage(type).getItem(key);
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);

      if (parsedItem.expires && parsedItem.expires < new Date().getTime()) {
        this.remove(key, type);
        return null;
      }

      return parsedItem.value;
    } catch (error) {
      console.error("Storage get error:", error);
      return null;
    }
  }

  /**
   * 데이터 삭제
   * @param key 삭제할 키
   * @param type 스토리지 타입
   */
  remove(key: string, type: StorageType = "local"): void {
    try {
      this.getStorage(type).removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  }

  /**
   * 모든 데이터 삭제
   * @param type 스토리지 타입
   */
  clear(type: StorageType = "local"): void {
    try {
      this.getStorage(type).clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  }

  /**
   * 모든 키 조회
   * @param type 스토리지 타입
   */
  getAllKeys(type: StorageType = "local"): string[] {
    try {
      return Object.keys(this.getStorage(type));
    } catch (error) {
      console.error("Storage getAllKeys error:", error);
      return [];
    }
  }
}

export const storage = new StorageUtil();
