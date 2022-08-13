import { MdStore as icon } from 'react-icons/md';


export default {
    // component Name
    name: 'storeSettings',
    // visible title
    title: 'settings',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'storeName',
            type: 'string',
            description: 'name of pizza',
        },
        {
            name: 'slicemaster',
            title: 'slicemasters Currently Slicing',
            type: 'array',
            of: [{type: 'reference',to: [{ type: 'person'}]}]
        },
        {
            name: 'hotSlices',
            title: 'Hot Slices available in the casse',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'pizza'}]}]

        }
    ],
}
