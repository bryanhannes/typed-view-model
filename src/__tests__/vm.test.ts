import { vm } from '../index';
import { Subject } from 'rxjs';

interface PageViewModel {
  name: string;
  number: number;
  stringArray: string[];
}

describe('View model', () => {
  it('vm2 should initialize all values with the given values in different formats', (done) => {
    const name = 'John';
    const number = 4561265;
    const stringArray = ['a', 'b', 'c'];

    const name$$ = new Subject<string>();
    const number$$ = new Subject<number>();
    const stringArray$$ = new Subject<string[]>();

    const vm$ = vm<PageViewModel>({
      name: { observable: name$$, initialValue: name },
      number: { observable: number$$, initialValue: number },
      stringArray: { observable: stringArray$$, initialValue: stringArray },
    });

    vm$.subscribe((vm) => {
      expect(vm.name).toEqual(name);
      expect(vm.number).toEqual(number);
      expect(vm.stringArray).toEqual(stringArray);
      done();
    });
  });
});
