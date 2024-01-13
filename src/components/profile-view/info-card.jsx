import { useEffect, useState } from 'react'
import { Card, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function InfoCard({ bgColor, headerText, bodyText }) {

    const [open, setOpen] = useState(false);

    useEffect(() => {

        if (bgColor) {
            setOpen(true)
        }

    }, [])

    return (
        <Collapse in={open}>
            <Card
                style={{ width: '25rem', }}
                className='mb-3 mt-3'
            >
                <Card.Header

                    as={'b'}
                    className='p-3'
                    style={{ backgroundColor: bgColor, color: 'white' }}>

                    {headerText.includes("Success") ? (
                        <FontAwesomeIcon className="me-2" icon={icon({ name: 'check', family: 'classic', style: 'solid' })} />
                    ) : (
                        <FontAwesomeIcon className="me-2" icon={icon({ name: 'circle-exclamation', family: 'classic', style: 'solid' })} />
                    )}

                    {headerText}

                </Card.Header>
                <Card.Text className='p-3'>
                    {bodyText}
                    {bodyText.includes("successfully updated your password") ? (
                        <span><br />You'll be logged out shortly..
                        </span>
                    ) : (
                        null
                    )}
                </Card.Text>
            </Card>
        </Collapse>
    )
}