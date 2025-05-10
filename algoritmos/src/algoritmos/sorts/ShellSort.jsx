// Ascendente
export function getShellSortAnimationsAsc(array, gaps = []) {
  const animations = [];
  const n = array.length;

  if (gaps.length === 0) {
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      gaps.push(gap);
    }
  }

  for (let gap of gaps) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] > temp) {
        animations.push(["compare", j, j - gap]);
        animations.push(["revert", j, j - gap]);
        animations.push(["overwrite", j, array[j - gap]]);
        array[j] = array[j - gap];
        j -= gap;
      }

      animations.push(["overwrite", j, temp]);
      array[j] = temp;
    }
  }

  return animations;
}

// Descendente
export function getShellSortAnimationsDesc(array, gaps = []) {
  const animations = [];
  const n = array.length;

  if (gaps.length === 0) {
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      gaps.push(gap);
    }
  }

  for (let gap of gaps) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] < temp) {
        animations.push(["compare", j, j - gap]);
        animations.push(["revert", j, j - gap]);
        animations.push(["overwrite", j, array[j - gap]]);
        array[j] = array[j - gap];
        j -= gap;
      }

      animations.push(["overwrite", j, temp]);
      array[j] = temp;
    }
  }

  return animations;
}