import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Container, Heading, Text, Button, Stack, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react'

export async function getServerSideProps(context) {
    try {
        const response = await axios.get(`${process.env.API_URL}/publicacion/${context.params.publicacion}`)
        return {
            props: {
                data: response.data
            }
        }
    } catch (err) {
        return {
            redirect: {
                destination: '/publicaciones',
                permanent: true
            }
        }
    }
}


const publicacion = (data) => {

    const router = useRouter()
    //const { publicacion } = router.query
    const [publicacion] = useState(data)
    console.log(publicacion)

    const [contador, setContador] = useState(1)

    return (
        <Container maxW="container.md">
            <Button onClick={() => setContador(0)}>Contador a 0</Button>
            <Button onClick={() => setContador(1)}>Contador a 1</Button>
            {contador === 1 ? <Text>Soy admin</Text> : <Text>Soy usuario</Text>}
        </Container>

    )
}

export default publicacion