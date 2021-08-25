import { ArrayToKeyValuePipe } from './array-to-key-value.pipe';

describe('ArrayToKeyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayToKeyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
