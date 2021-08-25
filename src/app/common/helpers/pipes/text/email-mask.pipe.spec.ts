import { EmailMaskPipe } from './email-mask.pipe';

describe('EmailMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new EmailMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
