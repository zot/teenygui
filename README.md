# This is a near-trivial HTML5 presentation framework

See [example-app.ts](example-app.ts) for an example of how to use it

# GETTING STARTED
## 1. INITIALIZE THE FRAMEWORK
1. Import teenygui
1. Make sure you can retrieve each object by its ID (number or string)
1. Call initGui with your function that retrieves an object by ID
```Typescript
type ObId = string | number
type GetObFunc = (id: ObId) => any

function initGui(func: GetObFunc): void
```

## 2. PREPARE A DOM NODE TO SHOW AN OBJECT
1. Retrieve or create the DOM node (if you create it, make sure to put it into the page, somewhere)
1. You can use clone to copy an object in the DOM. It's easy to make a hidden "templates" div that contains elements you can copy
```HTML
<div id='templates'>
    <div id='peep' class='peep'>
        <input type='text' x-field='name'></span> <b>Address:</b> <input type='text' x-field='address'></span> <i class="fas fa-window-close" name='close'></i>
        <br>
        <b>Notes</b>
        <textarea x-field='notes'></textarea>
    </div>
</div>
```
1. Call bind on the dom node to show the object and provide a function that can update it
```Typescript
type UpdateFunc = (id: string, field: string, value: string) => void
type HTMLOrSVG = HTMLElement | SVGElement

function bind(id: string, node: HTMLOrSVG, updater: UpdateFunc)
```

## 3. CALL REFRESH TO UPDATE AN OBJECT IF YOU CHANGE IT
Teenygui will keep the GUI up-to-date with changes the user makes directly, like typing into text fields but if your program changes an object that Teenygui is (or might be) displaying, make sure to call refresh.
```Typescript
function refresh(id: ObId)
```
