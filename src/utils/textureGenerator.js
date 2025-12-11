export const createTextTexture = (text, options = {}) => {
    const {
        fontSize = 200,
        fontFamily = 'Noto Sans Buginese',
        color = '#78350f', 
        width = 512,
        height = 512,
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    // Clear background (transparent)
    context.clearRect(0, 0, width, height);

    // Configure text
    context.font = `bold ${fontSize}px "${fontFamily}"`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;

    // Draw text center
    context.fillText(text, width / 2, height / 2);

    return canvas;
};
