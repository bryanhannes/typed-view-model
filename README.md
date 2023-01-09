# Typed view model

This is a small library to help you create typed view models.

## Installation

```shell
npm install --save @bryanhannes/typed-view-model
```

## How to use

```typescript
const name$$ = new Subject<string>();
const number$$ = new Subject<number>();
const stringArray$$ = new Subject<string[]>();

const vm$ = vm<PageViewModel>({
    name: {observable: name$$, initialValue: 'John Snow'},
    number: {observable: number$$, initialValue: 5000},
    stringArray: {observable: stringArray$$, initialValue: ['a', 'b', 'c']},
});
```
