function factorial(n) {
  if (n === 0 || n === 1) {
      return 1;
  }
  return n * factorial(n - 1);
}

onmessage = function(event) {
  const number = event.data;
  let result = "<table border='1'><tr><th>Number</th><th>Factorial</th></tr>";
  for (let i = 1; i <= number; i++) {
      result += "<tr><td>" + i + "</td><td>" + factorial(i) + "</td></tr>";
  }
  result += "</table>";
  postMessage(result);
};
