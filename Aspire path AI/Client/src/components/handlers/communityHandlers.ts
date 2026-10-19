import axiosInstance from '../../api/axiosinstance';

// User functions to interact with the community API

export const getQuestions = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/community/questions');
        return response.data;
    } catch (error: any) {
        console.error('Error fetching questions:', error.message);
        throw error;
    }
}

export const postQuestion = async (title: string, description: string, tags: string[]) => {
    try {
        const response = await axiosInstance.post('/api/v1/community/questions', { title, description, tags });
        return response.data;
    } catch (error: any) {
        console.error('Error posting question:', error.message);
        throw error;
    }
}

export const getAnswers = async (questionId: string) => {
    try {
        const response = await axiosInstance.get(`/api/v1/community/questions/${questionId}/answers`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching answers:', error.message);
        throw error;
    }
}

export const postAnswer = async (questionId: string, content: string) => {
    try {
        if (!questionId || !content) {
            throw new Error('Question ID and content are required');
        }
        const response = await axiosInstance.post(`/api/v1/community/questions/${questionId}/answers`, { content });
        return response.data;
    } catch (error: any) {
        console.error('Error posting answer:', error.message);
        throw error;
    }
}

// Admin functions to manage the community API

export const deleteQuestion = async (questionId: string) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/community/questions/${questionId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error deleting question:', error.message);
        throw error;
    }
}

export const markAsResolved = async (questionId: string) => {
    try {
        const response = await axiosInstance.patch(`/api/v1/community/questions/${questionId}/mark-as-resolved`);
        return response.data;
    } catch (error: any) {
        console.error('Error resolving question:', error.message);
        throw error;
    }
}

export const acceptAnswer = async (answerId: string) => {
    try {
        const response = await axiosInstance.patch(`/api/v1/community/questions/answers/${answerId}/accept`);
        return response.data;
    } catch (error: any) {
        console.error('Error accepting answer:', error.message);
        throw error;
    }
}