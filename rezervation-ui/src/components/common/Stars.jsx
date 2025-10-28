import React from 'react';
import { Rating } from '@mui/material';

export default function Stars({ value }) {
    return <Rating value={value} readOnly size="small" />;
}
