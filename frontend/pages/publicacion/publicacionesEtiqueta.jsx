import { useRouter } from "next/router"
import { useState } from "react"

const publicacionesEtiqueta = () => {

    const [publicaciones, setPublicaciones] = useState({})

	const router = useRouter()
	const {publicacion} = router.query

	const getPublicaciones = async () => {

		const response = await axios.get(`${process.env.API_URL}/publicacionesx/${publicacion}`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones()
	}, [publicacion])


	
	return (publicaciones.map(publicaciones => {
			return (
      <Box  borderWidth='2px' borderRadius='lg' my={8}>
		<Button size='xs' colorScheme='blackAlpha' left="85%" >Reportar</Button>
        <Image src= 'https://bit.ly/dan-abramov' />
				<Box p='2' key={publicaciones._id}>
          <Box 
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='200'>
                {publicaciones.createdAt}</Box>
					<Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              noOfLines='1'>
                {publicaciones.titulo}</Box>
				<Box>#{publicaciones.etiqueta}</Box>
					<Box >{publicaciones.descripcion}</Box>
					<Box 
              as='span' 
              color='gray.600' 
              fontSize='sm'>
                {publicaciones.cantLikes} likes</Box>
				</Box>
      </Box>
			)
		})

	)


    
} 

export default publicacionesEtiqueta