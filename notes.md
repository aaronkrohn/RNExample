# Aaron Krohn - Notes

### Task 1: Auth Implementation
**Question:**
If auth-on-redux is used and combined with redux-persist to persist the user data to localstorage,
we'd need to make sure the data stored. E.g. the token returned is stored in a secure store like keychain.

- Used RTK lib to reduce boilerplate code. 
- Switched stacks based on if the users is logged in or not.

### Task 2: Async Account Creation
Used polling mechanism that codes with tan stack. Exposed startPolling and stopPolling methods to have finer control.
I polled the getAccounts API until the status return "completed".

To improve this I'd add a time limit threshold on the polling and error. 

### Task 3: Account Breakdown

Noticed a few areas where the calculations were wrong and the number and string treatment wasn't consistent.

I decided to return strings values from the calculateBreakdown function, as calculation on the values had been done
and the values were for displayed only.

The internal values based from balance stayed as numbers to keep the precision and not to round any value down.

Changes made
**Interest**: Use monthly instead of annual rate.
**Taxes**: Deduct fees from balance first, before calculated tas rate. 

Applied consistent decimal places to all values at the end

Added tests

**In general**,
- Add RTK to reduce boilerplate
- Add navigation types
- Add types to useNavigation, useDispatch and useAppSelector
