document.addEventListener("DOMContentLoaded", function() {

  let myLeads = [];
  const inputBtn = document.getElementById("input-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const tabBtn = document.getElementById("tab-btn");
  const inputEl = document.getElementById("input-el");
  const ulEl = document.getElementById("ul-el");
  
  const leadsfromLS = JSON.parse(localStorage.getItem("myLeads"));
    if(leadsfromLS) {
      myLeads = leadsfromLS;
      render(myLeads);
 }

inputBtn.addEventListener("click", () => {

  const isLead = inputEl.value;
  if(isLead) {
    myLeads.push(isLead);
    inputEl.value = "";
    ulEl.innerHTML = "";
    saveAndRenderLeads();
  }
});

tabBtn.addEventListener("click", () => {
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    myLeads.push(tabs[0].url);
    saveAndRenderLeads();  
  });
});

deleteBtn.addEventListener("dblclick", () => {
  
  inputEl.value = "";
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function saveAndRenderLeads() {

  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

function render(leads) {

    let listItems = "";  
      for(let i = 0; i < leads.length; i++) {
          listItems +=  `<li>
                          <a href="${leads[i]}">
                              ${leads[i]}
                          </a>
                        </li>`;
      }
      ulEl.innerHTML = listItems;    
     }
  });  


