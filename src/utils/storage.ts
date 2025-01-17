type StorageType = "local" | "session";

interface StorageItem<T> {
  value: T;
  expires?: number;
}

interface SetStorageOptions<T> {
  key: string;
  value: T;
  type?: StorageType;
  expires?: number;
}

interface GetStorageOptions {
  key: string;
  type?: StorageType;
}

class StorageUtil {
  private getStorage(type: StorageType): Storage {
    return type === "local" ? localStorage : sessionStorage;
  }

  /**
   * 데이터 저장
   * @param options 저장 옵션 객체
   */
  set<T>({ key, value, type = "local", expires }: SetStorageOptions<T>): void {
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
   * @param options 조회 옵션 객체
   */
  get<T>({ key, type = "local" }: GetStorageOptions): T | null {
    try {
      const item = this.getStorage(type).getItem(key);
      if (!item) return;

      const parsedItem: StorageItem<T> = JSON.parse(item);

      if (parsedItem.expires && parsedItem.expires < new Date().getTime()) {
        this.remove({ key, type });
        return;
      }

      return parsedItem.value;
    } catch (error) {
      console.error("Storage get error:", error);
      return;
    }
  }

  /**
   * 데이터 삭제
   * @param options 삭제 옵션 객체
   */
  remove({ key, type = "local" }: GetStorageOptions): void {
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
