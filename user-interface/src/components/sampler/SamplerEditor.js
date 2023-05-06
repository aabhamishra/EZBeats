import { Button, Form, Nav, Row } from "react-bootstrap";
import { slide as Menu } from "react-burger-menu";
import { SamplerUI } from "./sampler_ui/SamplerUI";
import "./SamplerEditor.css"

export default function SamplerEditor() {

    return (
        <div className="mainFrame">
            <SamplerUI/>
        </div>
    )
    /*
    return (
        <>

            <Menu>


            </Menu>
            <Form lg={6}>
                <Row className="sound-lib">
                    <Nav id="soundid1">Sample Sound 1</Nav>
                    <Nav id="soundid2">Sample Sound 2</Nav>
                    <Nav id="soundid3">Sample Sound 3</Nav>
                    <Nav id="...">...</Nav>
                </Row>
                <div className="body-spacer" />
                <Row lg={3} style={{ height: 200 }}>
                    <Button >Track 1</Button>
                    <Button >Track 2</Button>
                    <Button >Track 3</Button>
                    <Button >Track 4</Button>
                    <Button >Track 5</Button>
                    <Button >Track 6</Button>
                    <Button >Track 7</Button>
                    <Button >Track 8</Button>
                    <Button >Track 9</Button>
                </Row>
            </Form>
        </>
    );
    */
}

