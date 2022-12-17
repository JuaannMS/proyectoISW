import React from 'react'
import { Input, Stack } from '@chakra-ui/react'

const InputText = ({texto}) => {
    
    const handleInput = (e) => {
        console.log(e.target.value)
    }
    return (
        <Stack spacing={3}>
            <Input placeholder={texto} onChange={handleInput}/>
        </Stack>
    )
}

export default InputText