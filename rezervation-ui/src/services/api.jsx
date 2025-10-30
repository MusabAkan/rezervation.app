const API_BASE_URL = 'http://localhost:8080'; // /api kaldırıldı

const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };
    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return response.status === 204 ? null : response.json();
    } catch (error) {
        console.error(`API request error to ${endpoint}:`, error);
        throw error;
    }
};

export const api = {
    // --- Auth API'ları ---
    login: (credentials) => {
        return request('/api/auth/login', { // /api eklendi
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },
    register: (userData) => {
        return request('/api/auth/register', { // /api eklendi
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    // --- Business API'ları ---
    getBusinesses: () => {
        return request('/api/businesses'); // /api eklendi
    },

    // --- Operation API'ları ---
    getOperationsByBusinessId: (businessId) => {
        return request(`/api/operations/business/${businessId}`); // /api eklendi
    },

    // --- Booking/Calendar API'ları (Geçici Mock'lar) ---
    getCalendarAvailability: async (businessId, year, month) => {
        console.warn(`getCalendarAvailability API call for business ${businessId} is mocked.`);
        return Promise.resolve({ '1': 'full', '15': 'partial', '25': 'full' });
    },
    getAvailableTimes: async (businessId, date) => {
        console.warn(`getAvailableTimes API call for business ${businessId} on ${date} is mocked.`);
        return Promise.resolve(['09:00', '10:00', '11:30', '14:00', '15:30']);
    },

    // --- Mesajlaşma API'ları (Geçici Mock'lar) ---
    getUsers: async () => {
        console.warn('getUsers API call is mocked.');
        return Promise.resolve([]);
    },
    getConversations: async (userId) => {
        console.warn(`getConversations API call for user ${userId} is mocked.`);
        return Promise.resolve({});
    },
    sendMessage: async (conversationId, senderId, text) => {
        console.warn(`sendMessage API call to conversation ${conversationId} is mocked.`);
        return Promise.resolve({ id: `msg_${Date.now()}`, conversationId, senderId, text, timestamp: new Date().toISOString() });
    },

    // --- Randevu API'ları (Geçici Mock'lar) ---
    getAppointmentsByCustomerId: async (customerId) => {
        console.warn(`getAppointmentsByCustomerId API call for customer ${customerId} is mocked.`);
        return Promise.resolve([]);
    },

    // --- Forum API'ları (Geçici Mock'lar) ---
    getForumPosts: async () => {
        console.warn('getForumPosts API call is mocked.');
        return Promise.resolve([]);
    },
    getForumPostsByBusinessId: async (businessId) => {
        console.warn(`getForumPostsByBusinessId API call for business ${businessId} is mocked.`);
        return Promise.resolve([]);
    },
    createForumPost: async (postData) => {
        console.warn('createForumPost API call is mocked.');
        return Promise.resolve({ id: `post_${Date.now()}`, ...postData, timestamp: new Date().toISOString(), likes: 0, comments: [] });
    },
};
