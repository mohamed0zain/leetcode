const findStartEnd = (array, front = 0, back = array.length) => {
  if (!array || array.length === 0) return { start: -1, end: -1 }; // Handle empty array

  if (array[front] < array[back - 1]) {
    return { start: front, end: back - 1 }; // Already sorted array
  }

  let mid = Math.floor((front + back) / 2);

  // Check if mid is the point of rotation
  if (array[mid - 1] > array[mid]) {
    return { start: mid, end: mid - 1 };
  }

  // Recursively search for the rotation point
  if (array[front] < array[mid]) {
    return findStartEnd(array, mid, back); // Search right half
  } else {
    return findStartEnd(array, front, mid); // Search left half
  }
};

const searchInRotatedArray = (array, value, start, end) => {
  if (!array || array.length === 0) return -1; // Handle undefined or empty array

  if (start === undefined && end === undefined) {
    const { start: s, end: e } = findStartEnd(array);
    start = s;
    end = e;
  }

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (array[mid] === value) {
      return mid; // Value found
    }

    if (start === mid) {
      // Handle edge case when start equals mid
      return array[end] === value ? end : -1;
    }

    if (array[start] <= array[mid]) {
      // Left side sorted
      if (value >= array[start] && value < array[mid]) {
        end = mid - 1; // Search in the left half
      } else {
        start = mid + 1; // Search in the right half
      }
    } else {
      // Right side sorted
      if (value > array[mid] && value <= array[end]) {
        start = mid + 1; // Search in the right half
      } else {
        end = mid - 1; // Search in the left half
      }
    }
  }

  return -1; // Value not found
};