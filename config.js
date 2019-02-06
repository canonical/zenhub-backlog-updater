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
 *   'org/repo': '123',
 *   'org/repo2': '321',
 *   'org/repo3': '213'
 * }
 * ENSURE THE KEY IS lowercase
*/
var REPO_IDS = {};
// Stop editing

var baseUrl = 'https://api.zenhub.io';
var apiToken = '?access_token=' + ACCESS_TOKEN;

var startOfIteration = 1;
var endOfIteration = 2;
