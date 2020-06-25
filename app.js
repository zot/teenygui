/*
   Copyright (C) 2020, Bill Burdick

   The MIT License (MIT)

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
*/
import * as gui from './teenygui.js';
import { $, $nodes, $find } from './teenygui.js';
const objects = {};
var nextOid = 0;
const names = [
    'Bubba', 'Chortle', 'Gruntudley', 'Quibsome',
    'Malubador', 'Frangwila', 'Smeep', 'Schmondle',
];
const streets = [
    'Elm', 'Pine', 'Brick', 'Toad',
];
var nameCount = 0;
class Person {
    constructor(obj) {
        Object.assign(this, obj);
    }
}
function update(id, field, value) {
    const person = objects[id];
    person[field] = value;
    console.log(`PERSON CHANGED[${field}]: ${id}: ${JSON.stringify(person)}`);
}
function addObject(obj) {
    obj.id = nextOid++;
    objects[obj.id] = obj;
    return obj;
}
const deleteObject = (id) => delete objects[id];
function randomPerson() {
    const name = names[Math.floor(Math.random() * names.length)];
    const addr = Math.ceil(Math.random() * 1000);
    const street = streets[Math.floor(Math.random() * streets.length)];
    return addObject(new Person({
        name: `${name} ${++nameCount}`,
        address: `${addr} ${street}`
    }));
}
function deletePerson(id) {
    for (let node of $nodes(id)) {
        node.remove();
    }
    deleteObject(id);
}
function makePeep() {
    const person = randomPerson();
    const id = person.id;
    // dispay object and bind fields
    const node = gui.bind(id, gui.clone('#peep'), update);
    // bind delete icon for this person
    $find(node, '[name=close]').onclick = () => deletePerson(id);
    // add node to page
    $('#peeps').append(node);
}
function init() {
    gui.initGui((id) => objects[id]);
    $('#button-new-peep').onclick = () => makePeep();
}
window.onload = init;
//# sourceMappingURL=app.js.map