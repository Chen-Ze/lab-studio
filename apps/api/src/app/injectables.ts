import { inject, injectable, multiInject } from 'inversify';

export interface Foo {
  name: string;
  say(): string;
}

export interface Fool {
  greet(): string;
}

@injectable()
export class Bar implements Foo {
  public name = 'Katana';

  constructor(@inject('Fool') private fool: Fool) {
    /* Do nothing */
  }

  say() {
    return this.fool.greet() + ' ' + this.name;
  }
}

@injectable()
export class Baz implements Foo {
  public name = 'Shuriken';

  constructor(@inject('Fool') private fool: Fool) {
    /* Do nothing */
  }

  say() {
    return this.fool.greet() + ' ' + this.name;
  }
}

@injectable()
export class FooGetter {
  constructor(@multiInject('Foo') private fooList: Foo[]) {
    /* Do nothing */
  }

  get() {
    return this.fooList.map((foo) => foo.say());
  }
}
