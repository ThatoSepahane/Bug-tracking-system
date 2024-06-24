function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const name = getInputValue('projectName');
  const id = Math.floor(Math.random() * 100) + '';
  const status = 'Open';

  if ((name.length == 0)) {
    alert("Please fill all fields with required data.");
    document.getElementById('add-issue').setAttribute("data-toggle", "modal");
    document.getElementById('add-issue').setAttribute("data-target", "#emptyField")
  }
  else {
    document.getElementById('add-issue').removeAttribute("data-toggle", "modal");
    document.getElementById('add-issue').removeAttribute("data-target", "#emptyField")
    const issue = { id, name, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));


    fetchIssues();
  }
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.name = `<strike>${currentIssue.name}</strike>`
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => ((issue.id) != id))
  localStorage.removeItem('issues');
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}
const fetchIssues = () => {

  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, name, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Project ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${name} </h3>
                              <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                              <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                              </div>`;
  }
}
fetchIssues();