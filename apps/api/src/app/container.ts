import { Container } from 'inversify';
import { Foo, Bar, Baz, FooGetter } from './injectables';

const container = new Container();
container.bind<Foo>('Foo').to(Bar);
container.bind<Foo>('Foo').to(Baz);
container.bind<FooGetter>('FooGetter').to(FooGetter);

export default container;
