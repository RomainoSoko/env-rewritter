const fs = require('fs');
const path = require('path');
const {validate} = require('schema-utils');

const schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string',
        }
    }
}

 export default class EnvRewritterPlugin {
    static defaultOptions = {
        files: ['./env', '.env.local'],
    }

    constructor(files = []) {
        validate(schema, files, {
            name: 'Env Rewritter Plugin',
            baseDataPath: 'files',
        });

        this.files = [
            ...new Set(
                [ ...EnvRewritterPlugin.defaultOptions.files, ...this.files],
            ),
        ];
    }

    apply(compiler) {
        const pluginName = EnvRewritterPlugin.name;

        const { webpack } = compiler;

        const { Compilation } = webpack;

        const { RawSource } = webpack.sources;

        compiler.hooks.environment.tap(pluginName, () => {
           console.log('dddd', process.env);
        });
    }
}
