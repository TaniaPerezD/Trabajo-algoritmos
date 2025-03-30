// Merge Sort Ascendente
export function getMergeSortAnimationsAsc(array) {
  const animations = [];
  const auxiliaryArray = array.slice();

  function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    let i = start;
    let j = mid + 1;
    let k = start;

    const temp = [];

    while (i <= mid && j <= end) {
      animations.push(["compare", i, j]);
      animations.push(["revert", i, j]);

      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        temp.push(auxiliaryArray[i++]);
      } else {
        temp.push(auxiliaryArray[j++]);
      }
    }

    while (i <= mid) {
      animations.push(["compare", i, i]);
      animations.push(["revert", i, i]);
      temp.push(auxiliaryArray[i++]);
    }

    while (j <= end) {
      animations.push(["compare", j, j]);
      animations.push(["revert", j, j]);
      temp.push(auxiliaryArray[j++]);
    }

    for (let idx = 0; idx < temp.length; idx++) {
      const actualIdx = start + idx;
      animations.push(["overwrite", actualIdx, temp[idx]]);
      auxiliaryArray[actualIdx] = temp[idx];
    }
  }

  mergeSort(0, array.length - 1);
  return animations;
}

// Merge Sort Descendente
export function getMergeSortAnimationsDesc(array) {
  const animations = [];
  const auxiliaryArray = array.slice();

  function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    let i = start;
    let j = mid + 1;
    let k = start;

    const temp = [];

    while (i <= mid && j <= end) {
      animations.push(["compare", i, j]);
      animations.push(["revert", i, j]);

      if (auxiliaryArray[i] >= auxiliaryArray[j]) {
        temp.push(auxiliaryArray[i++]);
      } else {
        temp.push(auxiliaryArray[j++]);
      }
    }

    while (i <= mid) {
      animations.push(["compare", i, i]);
      animations.push(["revert", i, i]);
      temp.push(auxiliaryArray[i++]);
    }

    while (j <= end) {
      animations.push(["compare", j, j]);
      animations.push(["revert", j, j]);
      temp.push(auxiliaryArray[j++]);
    }

    for (let idx = 0; idx < temp.length; idx++) {
      const actualIdx = start + idx;
      animations.push(["overwrite", actualIdx, temp[idx]]);
      auxiliaryArray[actualIdx] = temp[idx];
    }
  }

  mergeSort(0, array.length - 1);
  return animations;
}