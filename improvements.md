# Improvements

## DX

### Start

- no out of the box solution. Ideally install and run
- getting setup is ambiguous, only dev is currently explained in some detail
- yells at me to set NODE_ENV on build, should assume `production` and give a warning instead

### Development

- ~~updating modules in local development requires building and re-serving, all the time?~~
`npm run watch:build` or `bundle-module --watch`

## Lifecycle

- on exit from local dev, SIGINT signal triggers shutdown, however hangs in interactive terminal

## Routing

- nesting/mixing `Route` in `ModuleRoute` fails, unless explicitly passing the store as a prop,
also does not render on client-side

## SSR

- on failure, server hangs
- on 404, error is not clear which route was hit
- hydrate has limitations when rendering dynamic content (canvas)

## Generator

- use the latest `one-app-bundler` version rather than fix to version
<!-- https://github.com/testing-library/react-testing-library -->
- possibly replace enzyme with `@testing-library/react`

## Workpsaces

- every package added to a workspace triggers one-app to trigger `postinstall`
Possibe solution, don't treat the submodule as a workspace package

## Debbugging

- bundled modules need better stack traces, unable to identify which dependency is failing from improper use
- `iguazu@latest` resolves to 2.6.3

## Limitations

- the ability to pass things like `Context.Consumer` is difficult between modules
