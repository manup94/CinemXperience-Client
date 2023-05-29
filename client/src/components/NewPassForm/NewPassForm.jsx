// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import moviesService from '../../services/movies.services';

// const NewPassForm = () => {

//     const [passData, setPassData] = useState({
//         MovieName: '',
//         MovieTime: ''
//     })

//     const moviesFetch = () => {

//         moviesService
//             .getMovies
//             .then((res) => console.log(res))
//             .catch(err => console.log(err))
//     }

//     const handleInputChange = e => {
//         const { name, value } = e.target
//         setPassData({ ...passData, [name]: value })
//     }

//     return (
//         <Form>
//             <Form.Group className="mb-3" controlId="MovieName">
//                 <Form.Label>Movie</Form.Label>
//                 <Form.Control type="text"
//                     placeholder="Enter movie name"
//                     value={passData.MovieName}
//                     onChange={handleInputChange}
//                     name='MovieName'
//                 />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="MovieTime">
//                 <Form.Label>Time</Form.Label>
//                 <Form.Control type="string"
//                     value={passData.MovieTime}
//                     onChange={handleInputChange}
//                     name='MovieTime'
//                 />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//         </Form>
//     )
// }

// export default NewPassForm

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moviesService from '../../services/movies.services';

const NewPassForm = () => {
    const [passData, setPassData] = useState({
        MovieName: '',
        MovieTime: ''
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassData({ ...passData, [name]: value });
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="movie">
                <Form.Label>Movie</Form.Label>
                <Form.Control
                    as="select"
                    value={passData.movie}
                    onChange={handleInputChange}
                    name="movie"
                >
                    <option value="">Select a movie</option>
                    {movieTitles.map((title, index) => (
                        <option key={index} value={title.value}>
                            {title.label}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="MovieTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                    type="string"
                    value={passData.MovieTime}
                    onChange={handleInputChange}
                    name="MovieTime"
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default NewPassForm;
