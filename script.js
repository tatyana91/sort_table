function Table(data) {
  let dataTable = data || [];
  this.table = document.createElement('table');

  //Отрисовываем таблицу
  this.render = function() {
    this.table.classList.add('table');
    this.table.insertAdjacentHTML('beforeend', renderItemsHead());
    this.table.insertAdjacentHTML('beforeend', renderItems());

    document.querySelector('body').appendChild(this.table);
  };

  //Генерируем шапку таблицы
  function renderItemsHead() {
    return `<tr>
              <th class="table__head" data-sort_direction="" data-sort_type="string">Имя</th>
              <th class="table__head" data-sort_direction="" data-sort_type="numeric">Возраст</th>
              <th class="table__head" data-sort_direction="" data-sort_type="numeric">З/п</th>
              <th class="table__head" data-sort_direction="" data-sort_type="string">Город</th>
            </tr>`;
  }

  //Генерируем тело таблицы
  function renderItems() {
    let itemsHTML = '';
    dataTable.forEach(function(item) {
      itemsHTML += `<tr>
                      <td class="table__data">${item.name}</td>
                      <td class="table__data">${item.age}</td>
                      <td class="table__data">${item.salary}</td>
                      <td class="table__data">${item.city}</td>
                    </tr>`;
    });
    return itemsHTML;
  }

  //Вешаем обработчик клика по таблице
  this.table.onclick = function(event) {
    if (event.target.closest('.table__head')) {
      sort.apply(this, event);
    }
  };
  
  //Отменяем выделение элемента при нажатии на него
  this.table.onmousedown = function() {
    return false;
  };

  //Общая функция сортировки
  function sort() {
    let sortDirection = event.target.getAttribute('data-sort_direction') || 'asc';
    let sortType = event.target.getAttribute('data-sort_type');
    let cellIndex = event.target.cellIndex;

    let table = this;
    let th = this.tBodies[0].firstChild.cells[cellIndex];

    let ths = this.querySelectorAll('.table__head');
    for (let i = 0; i < ths.length; i++) {
      ths[i].setAttribute('data-sort_direction', '');
    }

    let trs = this.tBodies[1].getElementsByTagName('tr');

    if (sortDirection == 'asc') {
      sortAsc(table, trs, cellIndex, sortType);
      th.setAttribute('data-sort_direction', 'desc');
    } else if (sortDirection == 'desc') {
      sortDesc(table, trs, cellIndex, sortType);
      th.setAttribute('data-sort_direction', 'asc');
    }
  }

  //Сортировка по возрастанию
  function sortAsc(table, trs, cellIndex, sortType) {
    for (let i = trs.length - 1; i > 0; i--) {
      let counter = 0;

      for (let j = 0; j < i; j++) {
        let elemCurrent = trs[j].cells[cellIndex].innerHTML;
        let elemCurrentSibling = trs[j + 1].cells[cellIndex].innerHTML;

        if (sortType == 'numeric') {
          elemCurrent = +elemCurrent;
          elemCurrentSibling = +elemCurrentSibling;
        }

        if (elemCurrent > elemCurrentSibling) {
          table.tBodies[1].insertBefore(trs[j + 1], trs[j]);
          counter++;
        }
      }

      if (counter === 0) {
        break;
      }
    }
  }

  //Сортировка по убыванию
  function sortDesc(table, trs, cellIndex, sortType) {
    for (let i = trs.length - 1; i > 0; i--) {
      let counter = 0;
      for (let j = 0; j < i; j++) {
        let elemCurrent = trs[j].cells[cellIndex].innerHTML;
        let elemCurrentSibling = trs[j + 1].cells[cellIndex].innerHTML;

        if (sortType == 'numeric') {
          elemCurrent = +elemCurrent;
          elemCurrentSibling = +elemCurrentSibling;
        }

        if (elemCurrent < elemCurrentSibling) {
          table.tBodies[1].insertBefore(trs[j + 1], trs[j]);
          counter++;
        }

      }
      if (counter === 0) {
        break;
      }
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  let data = [{
    name: 'Ilia',
    age: 25,
    salary: '1000',
    city: 'Petrozavods'
  }, {
    name: 'Vasya',
    age: 14,
    salary: 1500,
    city: 'Moscow'
  }, {
    name: 'Ivan',
    age: 22,
    salary: 100,
    city: 'Bryansk'
  }, {
    name: 'Sasha',
    age: 45,
    salary: 990,
    city: 'Chita'
  }, {
    name: 'Masha',
    age: 15,
    salary: 600,
    city: 'SPb'
  }, {
    name: 'Oleg',
    age: 30,
    salary: 1200,
    city: 'Moscow'
  }, {
    name: 'Vlad',
    age: 22,
    salary: '1600',
    city: 'Kostroma'
  }, {
    name: 'Ivanka',
    age: 19,
    salary: 700,
    city: 'Moscow'
  }, {
    name: 'Ivan',
    age: 20,
    salary: 1000,
    city: 'Volgograd'
  }, {
    name: 'Petya',
    age: 45,
    salary: 990,
    city: 'Chita'
  }, {
    name: 'Evgeniya',
    age: 32,
    salary: 1800,
    city: 'Moskow'
  }, {
    name: 'Evgeniy',
    age: 32,
    salary: 1200,
    city: 'SPb'
  }];

  let table = new Table(data);
  table.render();
});