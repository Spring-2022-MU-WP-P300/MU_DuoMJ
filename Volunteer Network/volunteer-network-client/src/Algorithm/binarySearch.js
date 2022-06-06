const binarySearch = (arr, searchValue) => {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);

  while (arr[middle] !== searchValue && start <= end) {
    if (searchValue < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  if (arr[middle] === searchValue) {
    return middle;
  }
  return -1;
};
