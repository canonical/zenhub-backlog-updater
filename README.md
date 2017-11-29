# zenhub-backlog-updater
Useful scripts to make life easier.

## How to
1. First open up your backlog and click Tools > Script editor
2. Copy and paste the contents of [`updateCurrentIteration.js`](https://raw.githubusercontent.com/canonical-webteam/zenhub-backlog-updater/master/updateCurrentIteration.js) into the new window.
3. Update the variables at the top of the file to accurately reference the columns in your backlog. *The defaults shown are the Snappy squad columns.*
4. Save the file.
5. Switch back to your backlog and you should see a new 'Squads' menu item at the top of the screen (after Help), if not refresh the page.
6. Click Squads > Update epic estimates and wait. You'll see a notification at the top of the screen letting you know the script is running, when it's finished and if there was an error.

## Debugging
If you see an error when running the tool you can open Tools > Script editor again followed by View > Execution transcript. The error should be displayed at the bottom of the scroll area. 

If the error is unrelated to using the correct columns [file an issue](https://github.com/canonical-webteam/zenhub-backlog-updater/issues) and provide the last few lines of the transcript.
