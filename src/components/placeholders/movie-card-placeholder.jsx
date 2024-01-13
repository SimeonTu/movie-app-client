import { Placeholder, Card, Col } from 'react-bootstrap';

export default function MovieCardPlaceholder() {


    return (
        <Col key={"placeholder-1"} md={3} className="mb-5">
            <Card style={{ width: "200px", height: "387px" }} >
                <div style={{ opacity: "0.35", backgroundColor: "SeaGreen", width: "198px", height: "297px" }}>

                </div>
                <Placeholder className="p-3" as={Card.Body} animation='wave'>
                    <Placeholder style={{ opacity: "0.25", backgroundColor: "SeaGreen", width: "166px", height: "24px" }} as={Card.Title} />
                    <Placeholder style={{ opacity: "0.25", backgroundColor: "SeaGreen", width: "145px", height: "24px" }} as={Card.Text} />
                </Placeholder>
            </Card>
        </Col>
    )

}