import Caver from 'caver-js';

interface Klaytn {
	on: (eventName: string, callback: () => void) => void;
	enable: () => Promise<Array<string>>;
	selectedAddress: string;
	networkVersion: number;
	publicConfigStore: Store;
}
interface Caver {
	caver: any;
}
interface State {
	isEnabled: boolean;
	isUnlocked: boolean;
	networkVersion: number;
	onboardingcomplete: boolean;
}

interface Store {
	subscribe: (callback: () => void) => void;
	getState: () => State;
}

declare interface Window {
	klaytn?: Klaytn;
	caver?: Caver;
}
