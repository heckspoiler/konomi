const getScrollPercentage = () => {
  const scrollTop = window.scrollY;

  return scrollTop * 0.05;
};

export default getScrollPercentage;
