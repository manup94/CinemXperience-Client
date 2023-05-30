import { useState, useEffect, Children } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moviesService from '../../services/movies.services';
import passService from '../../services/pass.services';
import { useNavigate } from "react-router-dom"



const NewPassForm = () => {
    const [passData, setPassData] = useState({
        movieId: '',
        movieDate: ''
    });

    const navigate = useNavigate()

    const [movieTitles, setMovieTitles] = useState([]);

    useEffect(() => {
        moviesFetch();
    }, []);

    const moviesFetch = () => {
        moviesService
            .getMovies()
            .then((res) => {
                const titles = res.data.results.map((movie) => ({ label: movie.title, value: movie.id }));
                setMovieTitles(titles);
            })
            .catch((err) => console.log(err));
    }

    const handleSubmit = e => {
        e.preventDefault();

        passService
            .createPass({
                movieDate: new Date(passData.movieDate),
                movieId: Number(passData.movieId)
            })
            .then(() => {
                console.log('Pase creado exitosamente');
            })
            .catch(err => console.log(err));


    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setPassData({ ...passData, movieId: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassData({ ...passData, [name]: value });
    };
    console.log(passData);
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="movieInfo">
                <Form.Label>Pelicula:</Form.Label>
                <Form.Control
                    as="select"
                    value={passData.movieId}
                    onChange={handleSelectChange}
                    name="movieInfo"
                >
                    <option value="">Select a movie</option>
                    {movieTitles.map((title, index) => (
                        <option key={index} value={title.value}>
                            {title.label}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="movieDate">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                    type="date"
                    value={passData.movieDate}
                    onChange={handleInputChange}
                    name="movieDate"
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Crear
            </Button>
        </Form>
    );
};

export default NewPassForm;
