import React from 'react';
export function textfieldsArray() {
    return [
        {
            id: 'firstDigit',
            placeholder: 'Old Password',
            returnKeyType: 'done',
            ref: React.createRef(),
        },
        {
            id: 'secondDigit',
            placeholder: 'New Password',
            returnKeyType: 'done',
            ref: React.createRef(),
        },
        {
            id: 'thirdDigit',
            placeholder: 'Confirm Password',
            returnKeyType: 'done',
            ref: React.createRef(),
        },
        {
            id: 'fourthDigit',
            placeholder: 'Confirm Password',
            returnKeyType: 'done',
            ref: React.createRef(),
        },
        {
            id: 'fifthDigit',
            placeholder: 'Confirm Password',
            returnKeyType: 'done',
            ref: React.createRef(),
        }, {
            id: 'sixthDigit',
            placeholder: 'Confirm Password',
            returnKeyType: 'done',
            // ref: React.createRef()
        },
    ];
}

export const shippingItems = [
    {
        subtota: '1212',
        shipping: 'Free',
        tax: '12313',
        discount: '1211',
        grandTotal: '121212'
    }
]
