import { Injectable } from '@angular/core';
import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';

const { SecureStoragePlugin } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  constructor() { }

  public async retrieveAsync(key: string) {
    try {
      const storageValue = await SecureStoragePlugin.get({ key });
      if (storageValue) {
        return storageValue.value;
      }

      return null;
    } catch (error) {
      console.log('SecureStorageService:retrieve -> error', key, error);
    }
  }

  public async storeAsync(key: string, value: any) {
    await SecureStoragePlugin.set({ key, value });
  }

  public remove(key: string) {
    return SecureStoragePlugin.remove({ key })
      .then((success: any) => {
        console.log('SecureStorageService:remove -> success', success);
      })
      .catch((error: any) => {
        console.error('SecureStorageService:remove -> error', error);
      });
  }

  async keys() {
    const { keys } = await SecureStoragePlugin.keys();
    console.log('key list:', keys);
  }

  async clear() {
    await SecureStoragePlugin.clear();
  }
}
