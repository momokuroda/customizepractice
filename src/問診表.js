import { displayControl } from './displayControl/displayControl';
const EVENT = [
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.create.change.past',
    'app.record.create.change.radio2',
    'app.record.create.change.radio3',
    'app.record.create.change.radio4',
    'app.record.create.change.radio5',
    'app.record.edit.show',
    'app.record.edit.change.past',
    'app.record.edit.change.radio2',
    'app.record.edit.change.radio3',
    'app.record.edit.change.radio4',
    'app.record.edit.change.radio5',
];
kintone.events.on(EVENT, (event) => {
    const record = event.record;
    displayControl(record);
    console.log('issue1');
    console.log('issue2');
    return event;
});
