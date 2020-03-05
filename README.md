#IWS hello


## IWS Form Component
The goal behind creating this form component was to normalize and simplify the process of creating complex forms. Hopefully, the process for creating forms is flexible enough for desired customization, but also consistent enough to work across all projects and platforms. If you have any questions, comments, or desired enhancements, please create an issue here: [https://github.com/ideawork/iws-form-component/issues](https://github.com/ideawork/iws-form-component/issues). Thanks.

## Getting Started

If the `iws-form-component` is not already located within your `package.json` file and `node_modules` folder:
```
npm install --save github:ideawork/iws-form-component
```

This is the minimum amount of configuration and code needed for the form component to work properly. Note: your id properties located on each field should correspond to the key you are attempting to send to the server.
```jsx
import { 
  Checkbox, 
  Datepicker, 
  Email,
  Fieldset,
  File
  Form, 
  Hidden, 
  Radio, 
  Select, 
  Text,
  Textarea, 
} from 'iws-form-component';

import Page from './../Page/Page.js';

class Home extends React.Component {
  ... PropTypes, DefaultProps, State, Lifecycle & Class Methods
  render() {
    return (
      <div className={ this.props.className }>
        <Form action="post-path">
          <Checkbox id="checkbox" />
          <Datepicker id="datepicker" />
          <Email id="email" />
          <File id="file" />
          <Hidden id="hidden" />
          <Radio id="radio" />
          <Select id="select" />
          <Text id="text" />
          <Textarea id="textarea" />
        </Form>
      </div>
    ); 
  }
}

export default Page(Home);
```

## Things to Know
1. All fields need to be nested within the `<Form />` component. They can also be nested under the `<Fieldset />` component, which also must be nested under the `<Form />` component.
2. Only required prop for `<Form />` is action, which determines your post url.
3. Only required prop for any `<Field />` component is id. This corresponds to the name of the field being sent to the server. Also, if a custom label prop is not passed, then a titleized version of the id used.
4. `<Radio />` and `<Select />` fields can be passed either children or an options prop. See below for more information.
5. You can only pass custom validation into `<Email />`, `<Text />`, and `<Textarea />`. Simply, anything that is a text field.

## Components
#### Containers

1. [\<Form /\>](#1-form-)
2. [\<Fieldset /\>](#2-fieldset-)

#### Fields

1. [\<Checkbox /\>](#1-checkbox-)
2. [\<Datepicker /\>](#2-datepicker-)
3. [\<Email /\>](#3-email-)
4. [\<File /\>](#4-file-)
5. [\<Hidden /\>](#5-hidden-)
6. [\<Radio /\>](#6-radio-)
7. [\<Select /\>](#7-select-)
8. [\<Text /\>](#8-text-)
9. [\<Textarea /\>](#9-textarea-)

## Containers
\* Denotes a required prop.

#### 1. \<Form /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| action | string* | undefined | This corresponds to the url you will be posting your data to. |
| className | string | '' | Custom className you may want to add for styling purposes. |
| errorMessages | bool | true | By default when validation occurs, error messages will pop up. You can choose to shut these off globally using this property. |
| eventAction | string | 'Completion' | The event action you want to send for form event tracking. |
| eventCategory | string | 'Form' | The event category you want to send for form event tracking. |
| eventLabel | string | '' | The event label you want to send for form event tracking. |
| eventTracking | bool | false | Turns on/off form event tracking. |
| eventValue | bool \| number \| string | 0 | The event value you want to send for form event tracking. |
| id | string | 'form' | Custom id you may want to add to the form component for styling purposes. |
| onFail | func | (error) => {} | Callback for when the form fails to post on submit. |
| onSuccess | func | () => {} | Callback for when the form successfully posts on submit. |
| placeholders | bool | false | Toggles between labels and placeholders. Labels are turned on by default. |
| submitText | string | 'Submit' | Text to be displayed on the submit button. |
| successMessage | string | 'Thank You for Your Submission!' | Text to be displayed within the success message. You can also pass in html: '\<div\>Thanks!\</div\>'. |
| successModal | bool | false | Option to display success message inside of a modal. |

#### 2. \<Fieldset /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| title | string | '' | Optional title to be displayed. You can also pass in html: '\<h2\>Title\</h2\>'. |

## Fields
\* Denotes a required prop.

#### 1. \<Checkbox /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| value | bool | false | Initial value to be passed. |

#### 2. \<Datepicker /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| dateFormat | string | 'MM/DD/YYYY' | Format the date should be displayed in. |
| errorMessage | bool \| string | true | By default an error message is displayed when validation is failed. You can either set this to false to turn off the error message individually or you can pass in a custom error message, which also takes html: 'Error\<br\>Message.'; otherwise, the default error message will be displayed. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| maxDate | string | undefined | Maximum date the calendar should display. |
| minDate | string | undefined | Minimum date the calendar should display. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| validate | bool | false | If this is set to true, then validation will fail if a date is not picked. |
| value | string | '' | Initial value to be passed. |
| weekStart | string | '0' | Day of the week the calendar should start on. Default is Sunday. |


#### 3. \<Email /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| errorMessage | bool \| string | true | By default an error message is displayed when validation is failed. You can either set this to false to turn off the error message individually or you can pass in a custom error message, which also takes html: 'Error\<br\>Message.'; otherwise, the default error message will be displayed. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| validate | bool \| func(value) | false | If this is set to true, then validation will fail if a valid email is not provided. You can also pass in a callback function that takes passes the current value of the field. This callback must return a boolean value. |
| value | string | '' | Initial value to be passed. |

#### 4. \<File /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| accepts | arrayOf(string) | ['doc', 'docx', 'gif', 'jpg', 'jpeg', 'pdf', 'png'] | Accepted file types that may be uploaded. |
| className | string | '' | Custom className you may want to add for styling purposes. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| maxSize | number | 2 | The maximum file size in Megabytes. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| validate | bool | false | If this is set to true, then validation will fail if a file is not uploaded. Also, regardless of whether or not this is set, if a file is uploaded, then it will check to see if a valid file type was passed and the file size does not exceed the maxSize prop. |
| value | object | {} | Initial value to be passed. |

#### 5. \<Hidden /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add. |
| id | string* | undefined | Property that determines the key that will be sent to the server. |
| value | string | '' | Initial value to be passed. |

#### 6. \<Radio /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| options | arrayOf(shape(label: string, value: string) \| string) | undefined | Options to be passed to \<Radio /\>. You can also pass children instead in the form of '\<option value="option"\>Option\</option\>' or simply '\<option\>Option\</option\>' |
| value | string | '' | Initial value to be passed. |

#### 7. \<Select /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| errorMessage | bool \| string | true | By default an error message is displayed when validation is failed. You can either set this to false to turn off the error message individually or you can pass in a custom error message, which also takes html: 'Error\<br\>Message.'; otherwise, the default error message will be displayed. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| options | arrayOf(shape(label: string, value: string) \| string) | undefined | Options to be passed to \<Select /\>. You can also pass children instead in the form of '\<option value="option"\>Option\</option\>' or simply '\<option\>Option\</option\>' |
| validate | bool | false | If this is set to true, then validation will fail if something is not selected. |
| value | string | '' | Initial value to be passed. |

#### 8. \<Text /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| errorMessage | bool \| string | true | By default an error message is displayed when validation is failed. You can either set this to false to turn off the error message individually or you can pass in a custom error message, which also takes html: 'Error\<br\>Message.'; otherwise, the default error message will be displayed. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| validate | bool \| func(value) | false | If this is set to true, then validation will fail if a nothing is provided. You can also pass in a callback function that takes passes the current value of the field. This callback must return a boolean value. |
| value | string | '' | Initial value to be passed. |

#### 9. \<Textarea /\>
| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| className | string | '' | Custom className you may want to add for styling purposes. |
| errorMessage | bool \| string | true | By default an error message is displayed when validation is failed. You can either set this to false to turn off the error message individually or you can pass in a custom error message, which also takes html: 'Error\<br\>Message.'; otherwise, the default error message will be displayed. |
| id | string* | undefined | Property that determines the key that will be sent to the server. Also, if label is not provided, then the label will be titleized according to this id. |
| label | bool \| string | true | Labels are created intelligently by default according to the id you provide; however, you can also pass a string to this prop to display a custom label. You can also pass in html: 'This is a \<br\> label'. |
| onChange | func | ({ value }) => {} | Callback that is fired when the value of your input changes. An object containing the value is currently the only thing passed. |
| validate | bool \| func(value) | false | If this is set to true, then validation will fail if a nothing is provided. You can also pass in a callback function that takes passes the current value of the field. This callback must return a boolean value. |
| value | string | '' | Initial value to be passed. |
