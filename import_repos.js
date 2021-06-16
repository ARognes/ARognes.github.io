/**
 * @author Austin Rognes
 * @startdate 2/4/2020
 *
 * Only for my local use. Run this whenever I update/add a new repository
 *
 * Download all repo text info through the Github api to saved_repos.json. Go
 * through repo files to check if should be ignored or an image should be input.
 * Create image template and let user know to input one later. Then gather lang info
 * to saved_repos.json.
*/

var repos = [];
const SHOWCASE_FOLDER_LOC = './showcase';
/* Get saved_repos.json file
let saved_repos = File('saved_repos.json');
repos = data.repos;
*/

function removeRepo(name) {
  let updated_repos = [];
  for (repo of repos) {
    if (repo.name !== name) updated_repos.push(repo);
  }
  return updated_repos;
}

// Retrieved from: https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

// Parse information from all of my repositories, uses 1 github api call for User, n calls for repository languages
(getJSON('https://api.github.com/users/ARognes/repos', function(err, data) {
  if (err !== null) console.error(err);
  else {
    console.log('Add showcase images to ' + SHOWCASE_FOLDER_LOC + 'with names:');
    for (repo of data) {
      let condensed_repo = {name: repo['name'],
                            desc: repo['description'],
                            url: repo['html_url'],
                            created: repo['created_at'],
                            uploaded: repo['created_at'],
                            updated: repo['updated_at'],
                            stars: repo['stargazers_count'],
                            langs_url: repo['languages_url'],
                            langs: {},
                            ignore: false};

      // Repo already exists in saved_repos.json
      found_repo = repos.find(r => r.name === condensed_repo.name);

      // Update repo informationn
      if (found_repo) {
        if (found_repo.ignore || found_repo.updated === condensed_repo.updated) continue;
        repos = removeRepo(found_repo.name);
      }
      else {
        // Query to ignore this repo
        if (false) condensed_repo.ignore = true;
        else {
          // Create empty image in showcase folder

          // Tell user to change these image files
          console.log(condensed_repo.name);
        }

      }

      // Get language information
      getJSON(condensed_repo.langs_url, function(err, data) {
        if (err !== null) console.error(err + ' at langs of ' + condensed_repo.name);
        else for (lang in data) condensed_repo.langs.append(lang);
        repos.push(condensed_repo);
      });


      // getJSON(condensed_repo.content_url, function(err, data) {
      //   if (err !== null) console.error(err + ' at content of ' + condensed_repo.name);
      //   else for (file in data) {
      //     if (file.name.substr(0, 8) === 'showcase') {
      //       condensed_repo.showcase = file.download_url;
      //       // Download image to folder


      //       getJSON(condensed_repo.langs_url, function(err, data) {
      //         if (err !== null) console.error(err + ' at langs of ' + condensed_repo.name);
      //         else for (lang in data) {
      //           condensed_repo.langs.append(lang);
      //           repos.push(condensed_repo);
      //         }
      //       });
      //       break;
      //     }
      //   }
      // });
    }
  }
}))();
