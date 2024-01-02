import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// NodeGlobalsPolyfillPlugin({
		// 	buffer: true,
		// 	process: true,
		// }),
	],

	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis',
			},
			// Enable esbuild polyfill plugins
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
					process: true,
				}),
				NodeModulesPolyfillPlugin(),
			],
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	resolve: {
		alias: {
			fs: 'browserify-fs',
			crypto: 'crypto-browserify',
			stream: 'stream-browserify',
			assert: 'assert',
			http: 'stream-http',
			https: 'https-browserify',
			os: 'os-browserify',
			url: 'url',
			buffer: 'buffer',
			// util: 'util',
			// zlib: 'browserify-zlib',
		},
	},
	define: {
		global: {},
	},
});
