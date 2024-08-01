import { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Popover from "react-bootstrap/Popover"
import { OverlayTrigger } from "react-bootstrap"

export default function SummaryForm({ setOrderPhase }) {
  const [agreedTerms, setAgreedTerms] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("submitting and setting phase to completed")
    setOrderPhase("completed")
  }

  const popover = (
    <Popover id="popover">
      <Popover.Body>No ice cream will actually be delivered.</Popover.Body>
    </Popover>
  )
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={agreedTerms}
          onChange={() => setAgreedTerms(!agreedTerms)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit} disabled={!agreedTerms}>
        Confirm Order
      </Button>
    </Form>
  )
}
