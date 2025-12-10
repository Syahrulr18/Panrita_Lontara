
export const generateSpeech = async (text) => {
    try {
        if (!window.puter) {
            throw new Error('Puter.js not loaded');
        }
        const audio = await window.puter.ai.txt2speech(text);
        return audio;

    } catch (error) {
        console.error('TTS Service Error:', error);
        throw error;
    }
};
