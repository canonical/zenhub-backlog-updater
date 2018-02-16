// Edit here
var EPIC_NAME_COLUMN = 'A';
var EPIC_LINK_COLUMN = 'E';
var TOTAL_COLUMN = 'F';
var DONE_COLUMN = 'G';
var STATUS_COLUMN = 'B';
var PROGRESS_COLUMN = 'H';
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
