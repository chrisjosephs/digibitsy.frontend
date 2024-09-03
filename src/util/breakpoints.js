const tailwindScreens  = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
};

// Utility function to generate media queries
const media = Object.keys(tailwindScreens).reduce((acc, label) => {
    acc[label] = (...args) => `
    @media (min-width: ${tailwindScreens[label]}) {
      ${args}
    }
  `;
    return acc;
}, {});
export default media