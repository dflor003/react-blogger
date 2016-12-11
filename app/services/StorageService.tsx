export class StorageService {
  private storage: Storage;

  constructor(storage = sessionStorage) {
    this.storage = storage;
  }

  get<TValue>(key: string): TValue {
    const value = this.storage.getItem(key);
    return typeof value === 'string' ? JSON.parse(value) : undefined;
  }

  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  has(key: string): boolean {
    return !!this.get(key);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}

export default function storageService() {
  return new StorageService();
}
