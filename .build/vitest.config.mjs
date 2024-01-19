
import { defineConfig } from "vitest/config";
import * as path from 'path';

export default defineConfig({
	test: {
		setupFiles: [__dirname + "/vitest.setup"],
		testTimeout: 100000,
	},
	resolve: {
		// on top of the "paths" entry in the project's tsconfig file that aliases the @teamkeel/sdk and @teamkeel/testing
		// imports so that they actually exist in the .build directory underneath the hood, for vitest we need to also add
		// the below alias section which enables vitest to pickup the same paths configuration for the code generated
		// npm modules. This is necessary because vitest isn't aware of the 'paths' configuration in typescript world at all
    alias: {
			// the __dirname below is relative to the .build directory which contains the sdk and testing directories containing
			// the codegenned sdk and testing packages. 
      '@teamkeel/testing': path.resolve(__dirname, './testing'),
			'@teamkeel/sdk': path.resolve(__dirname, './sdk')
    }
  }
});
			