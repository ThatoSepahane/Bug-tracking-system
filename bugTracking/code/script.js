function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const summary = getInputValue('issueSummary');
  const description = getInputValue('issueDescription');
  const identifier = getInputValue('issueIdentifier');
  const when = getInputValue('firstSeen')
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const targetDate = getInputValue('target-resolution-date')
  const id = Math.floor(Math.random() * 1000) + '';
  const status = 'Open';

  if ((description.length == 0) || (summary.length == 0)) {
    alert("Please fill all fields with required data.");
    document.getElementById('add-issue').setAttribute("data-toggle", "modal");
    document.getElementById('add-issue').setAttribute("data-target", "#emptyField")
  }
  else {
    document.getElementById('add-issue').removeAttribute("data-toggle", "modal");
    document.getElementById('add-issue').removeAttribute("data-target", "#emptyField")
    const issue = { id, summary, description, identifier, when, severity, assignedTo, targetDate, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));


    fetchIssues();
  }
}

const startIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'In-Progress';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Resolved';
  currentIssue.summary = `<strike>${currentIssue.summary}</strike>`
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
    const { id, summary, description, identifier, when, severity, assignedTo, targetDate, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Ticket: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${summary} </h3>
                              <p>${description}<p>
                              <p>Identified by: ${identifier} on ${when}<p>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <p>Due: ${targetDate}<p>
                              <button onclick="startIssue(${id})" class="btn btn-warning">start</button>
                              <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                              <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                              </div>`;
  }
}
fetchIssues();



