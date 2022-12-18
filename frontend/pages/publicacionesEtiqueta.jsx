const publicacionesEtiqueta = () => {

    const [publicaciones, setPublicaciones] = useState([])

	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicacionesEtiqueta`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones()
	}, [])


    
}