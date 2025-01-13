import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private inMemoryStorage: { [key: string]: any } = {}; 

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  setItem(key: string, value: any): void {
    console.log("Setting item in storage:", key, value);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      this.inMemoryStorage[key] = value;
    }
  }
  
  getItem(key: string): any {
    const value = isPlatformBrowser(this.platformId)
      ? localStorage.getItem(key)
      : this.inMemoryStorage[key]; 
  
    console.log(
      `StorageService - Getting item: ${key} (${isPlatformBrowser(this.platformId) ? 'browser' : 'non-browser'}):`,
      value
    );
  
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    } else {
      delete this.inMemoryStorage[key];
    }
  }
}

