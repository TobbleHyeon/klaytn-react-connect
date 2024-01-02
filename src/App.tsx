import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import Caver from 'caver-js';

interface Klaytn {
	on: (eventName: string, callback: () => void) => void;
	enable: () => Promise<Array<string>>;
	selectedAddress: string;
	networkVersion: number;
	publicConfigStore: Store;
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
	klaytn: Klaytn;
}

declare global {
	interface Window {
		klaytn: Klaytn;
	}
}

function App() {
	const [count, setCount] = useState(0);
	const [address, setAddress] = useState('');
	const [provider, setProvider] = useState<any>({});
	const [dataNumber, setDataNumber] = useState<number>(0);
	const caver = new Caver(provider);
	const [input, setInput] = useState<Record<string, any>>({
		post: 0,
		topic: '',
		desc: '',
	});
	const abi: any = [
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			name: 'posts',
			outputs: [
				{
					internalType: 'string',
					name: 'topic',
					type: 'string',
				},
				{
					internalType: 'string',
					name: 'desc',
					type: 'string',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '_postNumber',
					type: 'uint256',
				},
				{
					internalType: 'string',
					name: '_topic',
					type: 'string',
				},
				{
					internalType: 'string',
					name: '_desc',
					type: 'string',
				},
			],
			name: 'setPost',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
	];
	const contractAddress = '0xE3054B56d061c6b99E4b564D91E9481468165eB9';
	useEffect(() => {
		if (typeof window.klaytn !== 'undefined') {
			// Kaikas user detected. You can now use the provider.
			setProvider(window['klaytn']);
		}
	}, []);

	const connectWallet = async (): Promise<void> => {
		await provider.enable();

		console.log('provider', provider);
	};

	const sendTx = async (): Promise<void> => {
		caver.klay
			.sendTransaction({
				type: 'VALUE_TRANSFER',
				from: window.klaytn.selectedAddress,
				to: window.klaytn.selectedAddress,
				value: caver.utils.toPeb('0.5', 'KLAY'),
				gas: 3000000,
			})
			.once('transactionHash', (transactionHash) => {
				console.log('txHash', transactionHash);
			})
			.once('receipt', (receipt) => {
				console.log('receipt', receipt);
			})
			.once('error', (error) => {
				console.log('error', error);
			});
	};

	const testRemix = async (): Promise<void> => {
		const _data = input;
		console.log('_data', _data);

		// const postContract = new caver.klay.Contract(abi, contractAddress);

		const data = caver.klay.abi.encodeFunctionCall(
			{
				inputs: [
					{
						internalType: 'uint256',
						name: '_postNumber',
						type: 'uint256',
					},
					{
						internalType: 'string',
						name: '_topic',
						type: 'string',
					},
					{
						internalType: 'string',
						name: '_desc',
						type: 'string',
					},
				],
				name: 'setPost',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			[_data.post, _data.topic, _data.desc],
		);

		caver.klay.sendTransaction({
			type: 'SMART_CONTRACT_EXECUTION',
			from: window.klaytn.selectedAddress,
			to: contractAddress,
			gas: '8000000',
			data,
		});
	};
	const viewPost = async (_postNumber: Number): Promise<void> => {
		const _data = input;
		console.log('_data', _data);

		const postContract = new caver.klay.Contract(abi, contractAddress);
		postContract.methods
			.posts(_postNumber)
			.call()
			.then((res) => {
				console.log(res);
			});
	};

	return (
		<>
			<div className="flex items-center justify-center">
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<button onClick={() => connectWallet()}>connect{address}</button>
				<button onClick={() => sendTx()}>sendTx</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<div>
				<input
					type="number"
					placeholder="포스트 넘버"
					onChange={(e) => setInput({ ...input, post: e.target.value })}
				/>
				<input
					type="text"
					placeholder="토픽 입력"
					onChange={(e) => setInput({ ...input, topic: e.target.value })}
				/>
				<input
					type="text"
					placeholder="디스크립션 입력"
					onChange={(e) => setInput({ ...input, desc: e.target.value })}
				/>
				<button onClick={() => testRemix()}>리믹스</button>
			</div>
			<div>
				<input
					type="number"
					placeholder="겟 넘버"
					value={dataNumber}
					onChange={(e) => setDataNumber(Number(e.target.value))}
				/>
				<button onClick={() => viewPost(dataNumber)} disabled={!dataNumber}>
					View Post
				</button>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default App;
