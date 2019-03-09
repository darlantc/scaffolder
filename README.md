# ctf - Create Template Folder

**ctf** lets you create dynamic templates to increase your project velocity. :shipit: :shipit:

## API

### Commands

- create _\<commandName>_  
  _\<commandName>_: One of the commands defined in the **ctf** folder.

### Options

- --folder, -f _\<folderName>_  
  _\<folderName>_: The name of the folder you want the template to be generated into. If none is supplied the template will be generated to the current working directory.

- _\<key>=\<value>_
  _\<key>_: One of the keys for a specific template  
  _\<value>_: The value you want the key to be replaced with.  
  **Must come after the create \<commandName>**

## Getting started

### install ctf globaly

```npm
npm i -g ctf
```

### Create a commands folder in your project root directory

The commands folder should be named **ctf** and it should contains folder with each folder representing a different command and inside of that folder there is the template you wish to create.  
**For example:**

```bash
ctf
├── component
│   ├── index.js
│   ├── {{componentName}}.js
│   └── {{componentName}}.spec.js
└── index
    └── index.js
```

From the above structure we will have two commands **component** and **index**.  
Lets look at the content of **{{componentName}}.js** and **{{componentName}}.spec.js**.
**{{componentName}}.js**

```javascript
import React from 'react'

export const {{componentName}} = (props) => {
  return (
    <div>
      Such a cool component
    </div>
  )
}
```

**{{componentName}}.spec.js**

```javascript
import React from 'react';
import { mount } from 'enzyme';
import { {{componentName}} } from './{{componentName}}';

describe('{{componentName}}', () => {
  it('should have a div', () => {
    const wrapper = mount(
      <{{componentName}} />
    );
   expect(wrapper.find('div').exists()).toBeTruthy()
  });
});
```

Now lets run the following command somewhere in our project

```bash
ctf create component componentName=CoolAFComponent --folder MyCoolComp
```

A new folder will be created under our currently working folder, lets look at what we got.

```bash
MyCoolComp
├── CoolAFComponent.js
├── CoolAFComponent.spec.js
└── index.js
```

**CoolAFComponent.js**

```javascript
import React from 'react';

export const CoolAFComponent = props => {
  return <div>Such a cool component</div>;
};
```

**CoolAFComponent.spec.js**

```javascript
import React from 'react';
import { mount } from 'enzyme';
import { CoolAFComponent } from './CoolAFComponent';

describe('CoolAFComponent', () => {
  it('should have a div', () => {
    const wrapper = mount(<CoolAFComponent />);
    expect(wrapper.find('div').exists()).toBeTruthy();
  });
});
```

How cool is this, right?  
As you can see our params got injected to the right places and we created our template with little effort.  
Horray!! :sparkles: :fireworks: :sparkler: :sparkles:

## TODO

1. Support global settings i.e --global flag.
2. Consider default templates.
