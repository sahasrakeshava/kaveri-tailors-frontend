import React from 'react';
import { CurrencyRupeeOutlined, MoreVert, Phonelink, TrendingUp } from '@mui/icons-material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';

const salesData = [
    {
        stats: '254k',
        title: 'Sales',
        color: 'primary.main',
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />,
    },
    {
        stats: '12.5k',
        title: 'Customers',
        color: 'success.main',
        icon: <PermIdentityOutlinedIcon sx={{ fontSize: '1.75rem' }} />,
    },
    {
        stats: '1.4k',
        title: 'Products',
        color: 'warning.main',
        icon: <Phonelink sx={{ fontSize: '1.75rem' }} />,
    },
    {
        stats: '88k',
        title: 'Revenue',
        color: 'info.main',
        icon: <CurrencyRupeeOutlined sx={{ fontSize: '1.75rem' }} />,
    },
];

const renderStats = () => {
    return salesData.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        mr: 3,
                        width: 44,
                        height: 44,
                        boxShadow: 3,
                        color: 'white',
                        bgcolor: item.color,
                    }}
                >
                    {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" sx={{ lineHeight: 1 }}>
                        {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mt: 0.5 }}>
                        {item.stats}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    ));
};

const MonthlyOverview = () => {
    return (
        <Card sx={{ bgcolor: "#242B2E", color: "white" }}>
            <CardHeader
                title="Monthly Overview"
                action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                }
                subheader={
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600 }}>
                            Total 48.5% Growth
                        </Box>{' '}
                        this Month
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '.15px !important',
                    },
                }}
            />
            <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
                <Grid container spacing={[5, 0]}>{renderStats()}</Grid>
            </CardContent>
        </Card>
    );
};

export default MonthlyOverview;