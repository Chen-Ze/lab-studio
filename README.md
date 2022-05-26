# LabStudio

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@lab-studio/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

## Icons

Free SVG icons may be found at [SVG Repo](https://www.svgrepo.com/).

## OpenAPI Generator

```
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i local/api.json \
    -g typescript-axios \
    -o /local/out/
```

## Adding an Instrument

1. Run the following command to generate an instrument controller.

```
nx g @nrwl/workspace:lib keithley-2182 --directory=instruments
```

2. Implement the controller.
3. Add the controller into `libs/instruments/container/src/lib/instruments-container.ts` by inserting the following.

```typescript
container.bind(Keithley2182).to(Keithley2182);
registeredInstruments['Keithley 2182'] = Keithley2182;
```

## Adding an Experiment

### Adding a Recipe

1. Run the following command to generate the lib of the recipe.

```
nx g @nrwl/workspace:lib apply-current-keithley-6221 --directory=shared/experiments
```

2. Implement the recipe.

### Adding a Renderer

1. Run the following command to generate the lib of the renderer.

```
nx g @nrwl/react:lib apply-current-keithley-6221-renderer --directory=front/experiments
```

2. Implement the renderer.
3. Add the renderer into `libs/front/container/src/lib/experiment-renderer-container.ts` by inserting the following.

```typescript
bindExperiment(container, ApplyCurrentKeithley6221Renderer);
```

### Adding a Worker

1. Run the following command to generate the lib of the worker.

```
nx g @nrwl/workspace:lib apply-current-keithley-6221-worker --directory=api/experiments
```

2. Implement the worker.
3. Add the worker into `libs/api/experiments/container/src/lib/experiment-worker-container.ts` by inserting the following.

```typescript
container
  .bind(ExperimentWorkerTypes.ExperimentWorkers)
  .to(ApplyCurrentKeithley6221Worker);
```
