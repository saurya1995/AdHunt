import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'

const tagOptions = [
    {
        key: 'Price: Low to High',
        text: 'Price: Low to High',
        value: 'priceLtoH',
        label: { color: 'orange', empty: true },
    },
    {
        key: 'Price: High to Low',
        text: 'Price: High to Low',
        value: 'priceHtoL',
        label: { color: 'red', empty: true },
    },
    {
        key: 'Date: Newest Deal',
        text: 'Date: Newest Deal',
        value: 'dateNtoO',
        label: { color: 'blue', empty: true },
    },
    {
        key: 'Name (A-Z)',
        text: 'Name (A-Z)',
        value: 'nameA-Z',
        label: { color: 'green', empty: true },
    },
    {
        key: 'Name (Z-A)',
        text: 'Name (Z-A)',
        value: 'nameZ-A',
        label: { color: 'pink', empty: true },
    },
]

export default function Filter(props) {
    return (<Dropdown direction="right" text='Filter Deals' icon='filter' style={{ marginTop: "15px", fontSize:"medium" }}>
        <Dropdown.Menu style={{ left: "90%" }}>
            <Dropdown.Divider />
            <Dropdown.Header icon='tags' content='Sort By' />
            <Dropdown.Menu scrolling>
                {tagOptions.map((option) => (
                    <Dropdown.Item key={option.value} {...option} onClick={(e, value) => { props.sortAction(option.value) }} />
                ))}
            </Dropdown.Menu>
        </Dropdown.Menu>
    </Dropdown>)
}
