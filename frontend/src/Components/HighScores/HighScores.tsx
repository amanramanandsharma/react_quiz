import React from 'react'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function HighScores() {
    return (
        <div>
            <Card border="secondary">
                <Card.Header className="text-center"><strong>Weekly High Scores</strong></Card.Header>
                <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default HighScores
