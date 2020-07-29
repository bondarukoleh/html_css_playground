(function addHeadersWithStyles(){
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    const grid = section.querySelector('div');
    const headerInfoToAdd = section.querySelector('h3');
    const gridValues = getComputedStyle(grid).grid;
    headerInfoToAdd.innerText = `Grid here: ${gridValues}`;
  })
})()