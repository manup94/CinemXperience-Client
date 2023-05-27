import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewPassForm = () => {

    const [passData, setPassData] = useState({
        MovieName: '',
        MovieTime: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setPassData({ ...passData, [name]: value })
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="MovieName">
                <Form.Label>Movie</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter movie name"
                    value={passData.MovieName}
                    onChange={handleInputChange}
                    name='MovieName'
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="MovieTime">
                <Form.Label>Time</Form.Label>
                <Form.Control type="string"
                    value={passData.MovieTime}
                    onChange={handleInputChange}
                    name='MovieTime'
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default NewPassForm