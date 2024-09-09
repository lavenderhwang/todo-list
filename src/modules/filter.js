function getWeek() {
  const curr = new Date();
  let week = [];

  const firstDayOfWeek = curr.getDate() - curr.getDay() + 1; // If Sunday, adjust to the previous Monday

  for (let i = 0; i < 7; i++) {
    let day = new Date(curr);
    day.setDate(firstDayOfWeek + i);

    // Format as YYYY-MM-DD
    let year = day.getFullYear();
    let month = String(day.getMonth() + 1).padStart(2, "0");
    let dayOfMonth = String(day.getDate()).padStart(2, "0");
    let formattedDay = `${year}-${month}-${dayOfMonth}`;

    week.push(formattedDay);
  }

  return week;
}

function filterToday(todos) {
  const curr = new Date();
  const year = curr.getFullYear();
  const month = String(curr.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(curr.getDate()).padStart(2, "0");

  const todayDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

  return todos.filter((todo) => todo.dueDate === todayDate);
}

function filterWeek(todos) {
  const week = getWeek();
  console.log("week dates:", week);
  return todos.filter((todo) => {
    console.log("todo date:", todo.dueDate);
    return week.includes(todo.dueDate);
  });
}

export { filterToday, filterWeek };
