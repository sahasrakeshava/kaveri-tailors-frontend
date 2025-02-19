import React from 'react'

const AddressCard = ({ address }) => {
    return (
        <div>
            <div className='space-x-2 space-y-3 rounded-md'>
                <p className='pl-2 font-semibold'>{address?.firstName + " " + address?.lastName}</p>
                <p>{address?.streetAddress}</p>
                <p>{address?.city}, {address?.state}, {address?.zipCode}</p>
                <div className='space-y-1'>
                    <p className='font-semibold'>PhoneNumber:</p>
                    <p>{address?.mobile}</p>
                </div>
            </div>
        </div>
    )
}

export default AddressCard