import 'dotenv/config';

import type { CodegenConfig } from '@graphql-codegen/cli';

import { getBackendHost } from './src/lib/utils/api.utils';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${getBackendHost()}/graphql`,
  // documents: ["components/**/*.graphql"],
  generates: {
    'src/components/types.generated.ts': { plugins: ['typescript'] },
    'src/components/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'types.generated.ts',
      },
      plugins: ['typescript-operations', 'typed-document-node'],
    },
  },
};

export default config;
