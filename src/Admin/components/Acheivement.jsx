import { Button, Card, CardContent, styled, Typography } from '@mui/material'
import React from 'react'

const TringleImg = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position: "absolute"
})
const TrophyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    position: 'absolute'
})
const Acheivement = () => {
    return (
        <Card sx={{ position: "relative", bgcolor: "#242B2E", color: "white" }}>
            <CardContent>
                <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                    Kaveri Tailors
                </Typography>
                <Typography variant='body2'>
                    Congratulations 🥳
                </Typography>
                <Typography variant='h5' sx={{ my: 3.1 }}>
                    420.8k
                </Typography>
                <Button size='small' variant='contained'>View Sales</Button>
                <TringleImg src='' />
                <TrophyImg src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRGTMTMuh4_piokZz7kxADv3pAYt2xNEtu0R0jkfT4BcipJ-YgiU-VD7dtEYaMGRh5TOo&usqp=CAU' />
            </CardContent>
        </Card>
    )
}

export default Acheivement