// Web Audio API Sound Controller - Silent (Sound Disabled for HP Laptop Experience)

class SoundController {
  private isMuted: boolean = true;
  private volume: number = 0;

  public setVolume(_vol: number) {
    this.volume = 0;
  }

  public setMuted(_muted: boolean) {
    this.isMuted = true;
  }

  public getVolume(): number {
    return 0;
  }

  public getIsMuted(): boolean {
    return true;
  }

  // All sound methods are completely silent / no-op
  public playClick() {}
  public playWindowOpen() {}
  public playWindowMinimize() {}
  public playWindowMaximize() {}
  public playStartMenu() {}
  public playQuickSettings() {}
  public playPowerSound() {}
  public playNotification() {}
  public playCameraShutter() {}
  public playError() {}
}

export const windowsSound = new SoundController();
