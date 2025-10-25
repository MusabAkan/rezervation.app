import {INITIAL_BUSINESSES_DATA, MOCK_AVAILABILITY} from '../data/mockData';

// --- Hilla Endpoint Simülasyonu ---
export const ServerEndpoints = {
    getBusinesses: async () => {
        console.log("SIMULATING: Fetching businesses from backend...");
        return new Promise(resolve => setTimeout(() => resolve(INITIAL_BUSINESSES_DATA), 500));
    },
    submitReview: async (businessId, rating, comment) => {
        console.log(`SIMULATING: Submitting review for ${businessId} with rating ${rating}`);
        return new Promise(resolve => setTimeout(() => resolve({
            success: true,
            newRating: 4.8,
            newReviewCount: 129
        }), 500));
    },
    getCalendarAvailability: async (businessId, year, month) => {
        console.log(`SIMULATING: Fetching calendar availability for ${businessId} for ${year}-${month + 1}`);
        const businessAvailability = MOCK_AVAILABILITY[businessId] || {};
        const monthAvailability = {};
        for (const dateStr in businessAvailability) {
            const date = new Date(dateStr);
            if (date.getFullYear() === year && date.getMonth() === month) {
                monthAvailability[date.getDate()] = businessAvailability[dateStr];
            }
        }
        return new Promise(resolve => setTimeout(() => resolve(monthAvailability), 300));
    },
    getAvailableTimes: async (businessId, date) => {
        console.log(`SIMULATING: Fetching available times for ${businessId} on ${date}`);
        const business = INITIAL_BUSINESSES_DATA.find(b => b.id === businessId);
        return new Promise(resolve => setTimeout(() => resolve(business?.slots || []), 300));
    }
};