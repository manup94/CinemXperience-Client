import React from 'react';
import { Col } from 'react-bootstrap';

const Map = () => {
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyCQ0r02Yba37PtZDZ55sV8s962Q1Hdtihw&center=40.4167754,-3.7037902&zoom=17`;

    return (
        <Col>
            <iframe
                title="Madrid"
                src={mapUrl}
                allowFullScreen
                loading="lazy"
            />
        </Col>
    );
};

export default Map;