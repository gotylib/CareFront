import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isRegister: false,
    qrCode: '',
    guid: '',
    code2FA: '',
    username: '',
    showQRCode: false,
    showAuth2FA: false,
    isAuthenticated: false,
  }),
  actions: {
    toggleForm() {
      this.isRegister = !this.isRegister;
      localStorage.setItem('isRegister', this.isRegister.toString());
    },
    showQRCodeHandler(url: string) {
      this.qrCode = url;
      this.showQRCode = true;
    },
    showAuth2FAHandler({ guid, username }: { guid: string; username: string }) {
      this.guid = guid;
      this.username = username;
      this.showAuth2FA = true;
    },
    goBack() {
      this.guid = '';
      this.showQRCode = false;
      this.showAuth2FA = false;
    },
  },
});
