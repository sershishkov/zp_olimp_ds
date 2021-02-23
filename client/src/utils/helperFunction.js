export const handleSearchInArray = (origArray, searchData) => {
  const newRows = [...origArray];

  // Вернули массив с преобразованными объектами в массив только значений по которым будем искать
  const set_Array_Of_Arrays = newRows.map(
    (row) => Object.values(row)
    // .filter((option) => option !== true && option !== false)
  );

  // создали массивы со значением true or false
  //те находим ячейки где есть совпадения
  //будет массив массивов только с true или false
  const matches = set_Array_Of_Arrays.map((row) =>
    row.map((option) =>
      option
        .toString()
        .toLowerCase()
        .includes(searchData.toString().toLowerCase())
    )
  );

  //Если есть совпадения в строке то поле search=true
  matches.map((row, index) =>
    row.includes(true)
      ? (newRows[index].search = true)
      : (newRows[index].search = false)
  );

  let filteredArray = newRows.filter((row) => row.search === true);
  // console.log(origArray);
  // console.log(set_Array_Of_Arrays);
  // console.log(matches);
  // console.log(filteredArray);

  return filteredArray;
};

export const generateDocNumber = () => {
  const newDate = new Date();
  const fullYear = newDate.getFullYear();
  const month =
    newDate.getMonth() < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const hours =
    newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
  const minutes =
    newDate.getMinutes() < 10
      ? `0${newDate.getMinutes()}`
      : newDate.getMinutes();

  const doc__Number = `${fullYear - 2000}.${month}.${day}.${hours}.${minutes}`;

  return doc__Number;
};
