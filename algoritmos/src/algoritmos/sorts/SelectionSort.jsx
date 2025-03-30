// Ordenamiento por selección ascendente
export function getSelectionSortAnimationsAsc(arr) {
  const animations = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let selectedIdx = i;

    for (let j = i + 1; j < n; j++) {
      animations.push(["compare", j, selectedIdx]);
      animations.push(["revert", j, selectedIdx]);

      if (arr[j] < arr[selectedIdx]) {
        selectedIdx = j;
      }
    }

    if (selectedIdx !== i) {
      animations.push(["overwrite", i, arr[selectedIdx]]);
      animations.push(["overwrite", selectedIdx, arr[i]]);
      [arr[i], arr[selectedIdx]] = [arr[selectedIdx], arr[i]];
    }
  }

  return animations;
}

// Ordenamiento por selección descendente
export function getSelectionSortAnimationsDesc(arr) {
  const animations = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let selectedIdx = i;

    for (let j = i + 1; j < n; j++) {
      animations.push(["compare", j, selectedIdx]);
      animations.push(["revert", j, selectedIdx]);

      if (arr[j] > arr[selectedIdx]) {
        selectedIdx = j;
      }
    }

    if (selectedIdx !== i) {
      animations.push(["overwrite", i, arr[selectedIdx]]);
      animations.push(["overwrite", selectedIdx, arr[i]]);
      [arr[i], arr[selectedIdx]] = [arr[selectedIdx], arr[i]];
    }
  }

  return animations;
}