import { makeAutoObservable } from 'mobx';

export class ModalsHandlerStore {
  openPricingModal = false;
  openLoginModal = false;
  openSignUpModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOpenPricingModal(v: boolean) {
    this.openPricingModal = v;
  }
  setOpenLoginModal(v: boolean) {
    this.openLoginModal = v;
  }
  setOpenSignUpModal(v: boolean) {
    this.openSignUpModal = v;
  }
}

export const modalsHandlerStore = new ModalsHandlerStore();
