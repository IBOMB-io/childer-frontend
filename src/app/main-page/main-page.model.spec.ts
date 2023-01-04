import { MainPage } from './main-page.model';

describe('MainPage', () => {
  it('should create an instance', () => {
    expect(new MainPage(0, '', '', '', '')).toBeTruthy();
  });
});
