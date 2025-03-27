// Insertion Sort Ascendente
export const getInsertionSortAnimationsAsc = (array) => {
  const animations = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push(["compare", j, j + 1]);
      animations.push(["revert", j, j + 1]);
      animations.push(["overwrite", j + 1, array[j]]);
      array[j + 1] = array[j];
      j--;
    }

    animations.push(["overwrite", j + 1, key]);
    array[j + 1] = key;
  }

  return animations;
};

// Insertion Sort Descendente
export const getInsertionSortAnimationsDesc = (array) => {
  const animations = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] < key) {
      animations.push(["compare", j, j + 1]);
      animations.push(["revert", j, j + 1]);
      animations.push(["overwrite", j + 1, array[j]]);
      array[j + 1] = array[j];
      j--;
    }

    animations.push(["overwrite", j + 1, key]);
    array[j + 1] = key;
  }

  return animations;
};