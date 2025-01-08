const getScrollPercentage = () => {
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const scrollableHeight = documentHeight - windowHeight;

  // Return a number between 0 and 100, rounded to 2 decimal places
  return Math.min(
    100,
    Math.max(0, Number(((scrollTop / scrollableHeight) * 100).toFixed(2)))
  );
};

export default getScrollPercentage;
