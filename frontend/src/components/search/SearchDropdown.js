import React, { useEffect, useState } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import SearchBar from "./SearchBar";

const dealOptions = [
    { key: 1, text: 'User', value: 'User' },
    { key: 2, text: 'Title', value: 'Title' },
]
const userOptions = [
    { key: 1, text: 'User', value: 'User' },
]

const allOptions = [
    { key: 1, text: 'Business', value: 'Business' },
    { key: 2, text: 'Creator', value: 'Creator' },

]

export default function SearchDropdown({ path }) {
    const [searchTab, setSearchTab] = useState("User");
    let options = (path == "BothProfiles") ? allOptions : ((path == "Business" || path == "Creator") ? userOptions : dealOptions);
    const handleClick = (e, { value }) => { setSearchTab(value) }
    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <Grid.Column>
                    <SearchBar searchTab={searchTab} path={path} />
                </Grid.Column>
                <Grid.Column floated="right">
                    <Dropdown text=" " compact options={options} simple item style={{ backgroundColor: 'transparent', paddingLeft: '0px', paddingRight: '0px' }} onChange={handleClick} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


