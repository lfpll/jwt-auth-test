import { LoginjwtPage } from './app.po';

describe('loginjwt App', () => {
  let page: LoginjwtPage;

  beforeEach(() => {
    page = new LoginjwtPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
