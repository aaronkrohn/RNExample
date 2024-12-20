# Aaron Krohn - Notes

### Task 1: Auth Implementation
**Question:**
I think auth-on-redux is okay when combined with redux-persist to persist user data to localStorage.
However, you'd need to make sure sensitive data is stored securely. For example, the token returned should be stored in a secure store like Keychain. AsyncStorage isn't secure.
Also, if using third-party logging libraries like Sentry, you won't want to share sensitive information such as username and password.

In production, you'd check if a token exists. You'd also need a refresh token so that you'd trigger biometrics if the refresh token has expired.

The token returned when logging in would be added to the headers on all requests, so make sure the client is making the call.

### Task 2: Async Account Creation
Used the polling mechanism that comes with TanStack. Exposed startPolling and stopPolling methods to have finer control.
I polled the getAccounts API until the status returned "completed".

To improve this, I’d add a time limit threshold on the polling and handle errors accordingly.

Additionally, I’d potentially create more components representing the different states to make the code more declarative.

There's a transition between creating an account and processing the account where the UI is slightly delayed. If I had more time, I’d want to address that and clean up the logic further.

### Task 3: Account Breakdown

Noticed a few areas where the calculations were wrong, and the number and string treatment wasn't consistent.

I decided to return string values from the calculateBreakdown function, as calculations on the values had already been performed, and the values were for display only.

The internal values derived from the balance remained as numbers to maintain precision and avoid rounding errors.

Changes made
**Interest**: Use the monthly rate instead of the annual rate.
**Taxes**: Deduct fees from the balance first before calculating the tax rate.

Applied consistent decimal places to all values at the end.

Added tests.

**In general**,
- Added RTK to reduce boilerplate.
- Added navigation types.
- Added types to useNavigation, useDispatch, and useAppSelector.
