import React from 'react';
import { Wrench, Car, User, Sparkles, Award, Package, Search, Gift, Home, DollarSign } from "lucide-react";

export const serviceIcons = { Wrench, Car, User, Sparkles, Award, Package, Search, Gift, Home, DollarSign };

export default function ServiceIcon({ name, className }) {
    const IconComponent = serviceIcons[name];
    return IconComponent ? <IconComponent className={`h-4 w-4 ${className}`} /> : <Package className={`h-4 w-4 ${className}`} />;
};