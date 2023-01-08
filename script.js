const formElem = document.querySelector("form");
const theadElem = document.querySelector(".thead_row");
const tbodyElem = document.querySelector("tbody");
const tableElem = document.querySelector("table");
const rowAddBtn = document.querySelector("add_row_btn");
const editBtn = document.getElementById("eBtn");

function addRow() {
  const tableHeaderRowElem = document.getElementById("table_header_row");
  const totalTableHeaderElements =
    tableHeaderRowElem.getElementsByTagName("th").length;

  const totalTableRowsUnderTBody = tbodyElem.getElementsByTagName("tr").length;

  // tableElem.insertRow(tableElem.rows.length);

  const rowElement = document.createElement("tr");

  // rowElement.classList.add(`rowElement_${tableElem.rows.length}`);

  for (let i = 0; i < totalTableHeaderElements; i++) {
    if (i === 0) {
      rowElement.innerHTML += `<td><button class="editBtn row${totalTableRowsUnderTBody} col${i} btn btn-primary" id="editBtn_${totalTableRowsUnderTBody}">Save</button><button class="deleteBtn btn btn-danger ms-1">Delete</button>
            </td>`;
      tbodyElem.appendChild(rowElement);
      continue;
    }
    rowElement.innerHTML += `<td id="td_${totalTableRowsUnderTBody}${i}" class="colN_${i}" >
              <input type="text"  />
            </td>`;
    tbodyElem.appendChild(rowElement);
  }
}

function addColumn(e) {
  e.preventDefault();

  const columnName = document.getElementById("columnName").value;

  const numberOfColumnHeaders = theadElem.getElementsByTagName("th").length;

  console.log("numberOfColumnHeaders =", numberOfColumnHeaders);

  theadElem.innerHTML += `<th scope="col" class="colN_${numberOfColumnHeaders} " onclick='delCol(${numberOfColumnHeaders})'><span>${columnName}</span> <a href="#" class="cross_sign_area">☓</a></th>`;

  document.getElementById("columnName").value = "";

  const totalRows = tbodyElem.rows.length;

  // should be -1
  console.log("totalRows", totalRows);

  // for (i = 0; i < totalRows; i++){
  //   document
  // }

  console.log("tbodyElem", tbodyElem);

  tbodyElem.querySelectorAll("tr").forEach((element, index) => {
    console.log("element", element, "index", index);
    const newCell = element.insertCell(-1);

    newCell.setAttribute("id", `td_${index}${numberOfColumnHeaders}`);

    newCell.classList.add(`colN_${numberOfColumnHeaders}`);

    newCell.innerHTML = `<input type="text" />`;

    // newCell.appendChild;
  });
}

function onDeleteRow(e) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }

  const btn = e.target;
  btn.closest("tr").remove();
}

const saveOrUpdate = (e) => {
  if (!e.target.classList.contains("editBtn")) {
    return;
  }

  const rowNumber = e.target.classList[1];

  const editBtnId = "editBtn_" + rowNumber.replace(/\D/g, "");

  if (document.getElementById(editBtnId).textContent === "Save") {
    const cellCount = tableElem.rows[0].cells.length;

    for (let i = 1; i < cellCount; i++) {
      const dataCell = document.getElementById(
        "td_" + rowNumber.replace(/\D/g, "") + i
      );

      const innerTextValue = dataCell.getElementsByTagName("input")[0].value;

      dataCell.innerHTML = `<span> ${innerTextValue} </span>`;
    }

    document.getElementById(editBtnId).textContent = "Update";
  } else if (document.getElementById(editBtnId).textContent === "Update") {
    const cellCount = tableElem.rows[0].cells.length;

    for (let i = 1; i < cellCount; i++) {
      const dataCell = document.getElementById(
        "td_" + rowNumber.replace(/\D/g, "") + i
      );

      const innerTextValue = dataCell.getElementsByTagName("span")[0].innerText;
      console.log("innerTextValue =", innerTextValue);

      dataCell.innerHTML = `<input  value='${innerTextValue}' />`;
    }

    document.getElementById(editBtnId).textContent = "Save";
  }
};

const delCol = (p) => {
  const colNum = p;

  const colElems = document.getElementsByClassName("colN_" + colNum);
  for (let i = colElems.length - 1; i >= 0; i--) {
    colElems[i].remove();
  }
};

formElem.addEventListener("submit", addColumn);
tableElem.addEventListener("click", onDeleteRow);
tableElem.addEventListener("click", saveOrUpdate);
