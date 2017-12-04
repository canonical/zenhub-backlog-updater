// Edit here
var EPIC_NAME_COLUMN = 'A';
var EPIC_LINK_COLUMN = 'E';
var TOTAL_COLUMN = 'F';
var DONE_COLUMN = 'G';
var STATUS_COLUMN = 'B';
var START_OF_ITERATION_STRING = 'current';
var END_OF_ITERATION_STRING = 'next';
var ACCESS_TOKEN = ''; // Required, ask someone.
var RATE_LIMIT = 606;

/*
 * Object of repoIds: 
 * {
 *   'ORG/REPO': '123',
 *   'ORG/REPO2': '321',
 *   'ORG/REPO3': '213'
 * }
*/
var REPO_IDS = {};
// Stop editing

var baseUrl = 'https://api.zenhub.io';
var apiToken = '?access_token=' + ACCESS_TOKEN;

var startOfIteration = 1;
var endOfIteration = 2;

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Update epic estimates', functionName: 'updateEpicEstimates'}
  ];
  spreadsheet.addMenu('Squads', menuItems);
}

function findCurrentIteration() {
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var lastActiveRow = activeSheet.getDataRange().getLastRow();
  for (var i = 1; i < lastActiveRow; i++) {
    var iteration = activeSheet.getRange(EPIC_NAME_COLUMN + i).getValue().toLowerCase();
    if (iteration.indexOf(START_OF_ITERATION_STRING) !== -1) {
     startOfIteration = i; 
    }
    if (iteration.indexOf(END_OF_ITERATION_STRING) !== -1) {
     endOfIteration = i;
     break;
    }
  }
}

function updateEpicEstimates() {
  findCurrentIteration();
  SpreadsheetApp
    .getActiveSheet()
    .getRange(TOTAL_COLUMN + startOfIteration)
    .setValue('=SUM(' + TOTAL_COLUMN + (startOfIteration + 1) + ':' + TOTAL_COLUMN + (endOfIteration - 1) + ')');
  SpreadsheetApp
    .getActiveSheet()
    .getRange(DONE_COLUMN + startOfIteration)
    .setValue('=SUM(' + DONE_COLUMN + (startOfIteration + 1) + ':' + DONE_COLUMN + (endOfIteration - 1) + ')');
  for (var i = startOfIteration + 1; i < endOfIteration; i++) {
    if (SpreadsheetApp.getActiveSheet().getRange(EPIC_LINK_COLUMN + i).getValue() === '') {
      continue;
    }
    var cellFormula = SpreadsheetApp.getActiveSheet().getRange(EPIC_LINK_COLUMN + i).getFormula();
    var link = cellFormula.match(/=hyperlink\("([^"]+)"/i)[1];
    var link = link.replace('https://github.com/', '');
    var link = link.replace('https://app.zenhub.com/workspace/o/','');
    var linkFragments = link.split('/issues/');
    var repo = REPO_IDS[linkFragments[0]]
    var id = linkFragments[1]
    if(repo) {
      getEpicData(repo, id, i);
    }
  }
}

function getEpicData(repoId, epicId, index) {
  var url = baseUrl + '/p1/repositories/' + repoId + '/epics/' + epicId + apiToken;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  response = JSON.parse(response);
  var total = response.total_epic_estimates.value;
  var complete = sum(getIssues([], response.issues));
  SpreadsheetApp.getActiveSheet().getRange(TOTAL_COLUMN + index).setValue(total);
  SpreadsheetApp.getActiveSheet().getRange(DONE_COLUMN + index).setValue(complete);
  if (complete === total) {
    SpreadsheetApp.getActiveSheet().getRange(STATUS_COLUMN + index).setValue('Complete');
  }
}

function getIssues(epicIssues, issues) {
  var issue = issues.shift();
  
  epicIssues.push(getIssueData(issue.repo_id, issue.issue_number));
  
  if (issues.length > 0) {
    Utilities.sleep(RATE_LIMIT);
    return getIssues(epicIssues, issues);
  } else {
    return epicIssues; 
  }
}

function getIssueData(repoId, issueId) {
  var url = baseUrl + '/p1/repositories/' + repoId + '/issues/' + issueId + apiToken;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  response = JSON.parse(response);
  return response;
}

function sum(obj) {
  return Object.keys(obj).reduce(function(sum, key) {
    if ((!obj[key].pipeline || obj[key].pipeline.name === 'Closed') && obj[key].estimate) {
      return sum + parseFloat(obj[key].estimate.value);
    }else{
      return sum;
    }
  }, 0);
}
