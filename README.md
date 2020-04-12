# Usage

[Live demo page.](https://release-please.github.io/miro-test/dist/)

In the `dist/` directory you will found `emails-input.js` as UMD build.

UMD build can be used directly in the browser via a `<script>` tag.
```js
<script src="../dist/emails-input.js"></script>
```

After you will be available `EmailsInput` constructor.

```js
var inputContainerNode = document.querySelector('#emails-input');
var emailsInput = EmailsInput(inputContainerNode[, {...options}]);
```

Where `options` is optional parameter, which have `emails` field with array of string, which will be converted to emails.

`emailsInput` instance have following methods:

## API
## `on`
The `on` method allow subscribe on one of available _event_ (see Available events table).

#### Syntax
```js
emailsInput.on(event, callback)
```

#### Parameters
1. `event` - one of available event
1. `callback` - function, which will be invoked, when event emitted

#### Available events
| event                | payload type | payload        | description                               |
| -------------------- | ------------ | -------------- | ----------------------------------------- |
| EMAIL_ADDED_EVENT    | string       | Added email    | Emitted, when email successfully added.   |
| EMAIL_REMOVED_EVENT  | string       | Removed email  | Emitted, when email successfully removed. |
| EMAIL_ALREADY_EXISTS | string       | Existing email | Emitted, when email is already exists.    |

Quick access is also available.

```js
EmailsInput.EMAIL_ADDED_EVENT
EmailsInput.EMAIL_REMOVED_EVENT
EmailsInput.EMAIL_ALREADY_EXISTS
```

Accordingly.

#### Example
```js
emailsInput.on(EmailsInput.EMAIL_ADDED_EVENT, (email) => {
  console.log('Email with value:', email, 'successfully added.')
})
```

## `getAllItems`
The `getAllItems` method returns array with all added _email object_ (see Email object explanation).

#### Syntax
```js
emailsInput.getAllItems()
```

#### Email object explanation
The object have following fields:

1. `$el` - The Element object describing the DOM element object.
1. `value` - String object representing the entered before value.
1. `isValid` - Boolean object representing the entered before value is valid email.

#### Example
```js
const allEmails = emailsInput.getAllItems() // Array with email objects or empty.
```

## `replaceAllItems`
The `replaceAllItems` method remove all earlier added _email objects_ and and add new passed as array.

#### Syntax
```js
emailsInput.replaceAllItems([value1[, value2[, ...[, valueN]]]])
```

#### Parameters
`valueN` - Email string, which need add.

#### Example
```js
emailsInput.replaceAllItems(['invalid.email', 'valid@email.com']) // Remove all earlier added and add invalid email as 'invalid.email' and valid as 'valid@email.com'
```

## `addEmail`
The `addEmail` method add single email.
If email was success added, will be emitted **EmailsInput.EMAIL_ADDED_EVENT** event.
If passed email address is already exists, will be emitted **EmailsInput.EMAIL_ALREADY_EXISTS** event.

#### Syntax
```js
emailsInput.addEmail(value)
```

#### Parameters
`value` - Email string, which need add.

#### Example
```js
emailsInput.addEmail('valid@email.com') // Will add valid email
emailsInput.addEmail('invalid.email') // Will add invalid email
```

## `delEmail`
The `delEmail` method to remove single email.
If email was success removed, will be emitted **EmailsInput.EMAIL_REMOVED_EVENT** event.

#### Syntax
```js
emailsInput.delEmail(value)
```

#### Parameters
`value` - Email string, which need to remove.

#### Example
```js
emailsInput.delEmail('valid@email.com') // Will remove 'valid@email.com' if exists.
```

## Example
```html
<div class='container'>
 <div class='form'>
   <div id="board-parent" class='form__body'>
     <h1 class='form__title'>
       Shared <span class='form__title form__title_bold'>Board name</span> with others
     </h1>
   </div>
   <div class='form__footer'>
     <button class='btn btn_primary' onclick="addRandomEmail(emailsInput)">Add email</button>
     <button class='btn btn_primary' onclick="getEmailsCount(emailsInput)">Get emails count</button>
   </div>
 </div>
</div>
<script>
 function addRandomEmail (emailsInputInstance) {
   const name =  Math.random().toString(36).substring(7).slice(0, 7)
   const host =  Math.random().toString(36).substring(7).slice(0, 7)
   const domain =  Math.random().toString(36).substring(7).slice(0, 3)
   const email = `${name}@${host}.${domain}`

   emailsInputInstance.addEmail(email)
 }

 function getEmailsCount (emailsInputInstance) {
   const count = emailsInputInstance.getAllItems()
     .filter(email => email.isValid).length

   alert(`contain ${count} valid emails`)
 }

 document.body.onload = function () {
   window.emailsInput = EmailsInput(document.getElementById('board-parent'))

   emailsInput.on(EmailsInput.EMAIL_ADDED_EVENT, (email) => {
     console.log('add:', email)
   })
   emailsInput.on(EmailsInput.EMAIL_REMOVED_EVENT, (email) => {
     console.log('removed:', email)
   })
   emailsInput.on(EmailsInput.EMAIL_ALREADY_EXISTS, (email) => {
     console.log('exists:', email)
   })
 }
</script>
<script src="emails-input.js"></script>
```

## Scripts
- `build` - create build in dist directory.
- `serve` - run dev live server.
- `test` - run all test suites.
- `test:core` - run test suites for core only.
- `test:utils` - run test suites for utils only.
- `test:dom` - run test suites for DOM only.
- `lint` - lint and fix all auto-fixable ts(x) problems
- `lint:sass` - fix all auto-fixable sass problems

## Used technology
1. Angular commit convention
1. Bootstrap css naming
1. BEM
1. Webpack
1. TypeScript
1. TSX
1. Sass
1. TDD
1. Jest
1. ESLint
1. CSSComb
