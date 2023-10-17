import React from 'react'
import { Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const LoadingNewIssuePage = () => {
    return (
        <Box className="">
            <Skeleton />
            <Skeleton height="20rem" />
        </Box>
    )
}

export default LoadingNewIssuePage