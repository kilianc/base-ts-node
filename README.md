# TypeScript Node Base Project

## Install and first run

    $ npm ci                   # install dependencies
    $ npm run lefthook-install # install git hooks
    $ npm run codegen          # generate gRPC types
    $ npm test                 # run test suite

Create a local `.env` file

```sh
FOO=foo
BAR=bar
```

Now you are ready to go

    $ npm run start:watch      # starts the app in watch mode

You can also test the docker build

    $ npm run docker:build
    $ npm run docker:run

Or simply

    $ npm run docker

## VSCode Settings

The following extensions are recommended:

- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [cspell](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

This should enable the auto format on save, according to the `prettier` and `eslint` project's rules.
