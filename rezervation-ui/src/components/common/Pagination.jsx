import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const [pageInput, setPageInput] = useState(currentPage.toString());

    useEffect(() => {
        setPageInput(currentPage.toString());
    }, [currentPage]);

    const handleInputChange = (e) => {
        setPageInput(e.target.value);
    };

    const handlePageSubmit = () => {
        let newPage = parseInt(pageInput, 10);
        if (isNaN(newPage) || newPage < 1) {
            newPage = 1;
        } else if (newPage > totalPages) {
            newPage = totalPages;
        }
        onPageChange(newPage);
        setPageInput(newPage.toString());
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlePageSubmit();
            e.target.blur();
        }
    };

    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            <Button variant="outline" size="icon" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
                <Input
                    type="text"
                    value={pageInput}
                    onChange={handleInputChange}
                    onBlur={handlePageSubmit}
                    onKeyPress={handleKeyPress}
                    className="w-12 h-9 text-center"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400">/ {totalPages}</span>
            </div>
            <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
            </Button>
             <Button variant="outline" size="icon" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                <ChevronsRight className="h-4 w-4" />
            </Button>
        </div>
    );
}