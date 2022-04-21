import CookieManager from '@react-native-cookies/cookies';

// set a cookie
CookieManager.set('http://example.com', {
  name: 'myCookie',
  value: 'myValue',
  domain: 'some domain',
  path: '/',
  version: '1',
  expires: '2015-05-30T12:30:00.00-05:00'
}).then((done) => {
  console.log('CookieManager.set =>', done);
});

//* NB:* When no `domain` is specified, url host will be used instead.
//* NB:* When no `path` is specified, an empty path `/` will be assumed.

  // Set cookies from a response header
  // This allows you to put the full string provided by a server's Set-Cookie
  // response header directly into the cookie store.
  CookieManager.setFromResponse(
    'http://example.com',
    'user_session=abcdefg; path=/; expires=Thu, 1 Jan 2030 00:00:00 -0000; secure; HttpOnly')
  .then((success) => {
    console.log('CookieManager.setFromResponse =>', success);
  });

// Get cookies for a url
CookieManager.get('http://example.com')
  .then((cookies) => {
    console.log('CookieManager.get =>', cookies);
  });

// list cookies (IOS ONLY)
CookieManager.getAll()
  .then((cookies) => {
    console.log('CookieManager.getAll =>', cookies);
  });

// clear cookies
CookieManager.clearAll()
  .then((success) => {
    console.log('CookieManager.clearAll =>', success);
  });

// clear a specific cookie by its name (IOS ONLY)
CookieManager.clearByName('http://example.com', 'cookie_name')
  .then((success) => {
    console.log('CookieManager.clearByName =>', success);
  });

// flush cookies (ANDROID ONLY)
CookieManager.flush()
  .then((success) => {
    console.log('CookieManager.flush =>', success);
  });

// Remove session cookies (ANDROID ONLY)
// Session cookies are cookies with no expires set. Android typically does not
// remove these, it is up to the developer to decide when to remove them.
// The return value is true if any session cookies were removed.
// iOS handles removal of session cookies automatically on app open.
CookieManager.removeSessionCookies()
  .then((sessionCookiesRemoved) => {
    console.log('CookieManager.removeSessionCookies =>', sessionCookiesRemoved);
  });