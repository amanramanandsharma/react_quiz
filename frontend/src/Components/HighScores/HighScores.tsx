import React from 'react'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function HighScores() {
    return (
        <div>
            <Card
                bg='success'
                text='white'
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title>Top Scorer List</Card.Title>
                    <hr></hr>
                            <div><span>Coming Soon</span><br></br></div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default HighScores
