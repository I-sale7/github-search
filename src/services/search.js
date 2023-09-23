import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
})

const requestHeader = (controllerSegnal)=> {
  const headers = {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      'accept': 'application/vnd.github+json'
    },
  }
  if(controllerSegnal) headers['signal'] =  controllerSegnal;
  return headers;
}

// Abort API And call the last one if API is called more than once.
// export const controller = new AbortController();
export const callSearchService = async (url, query, signal)=> {
// Call API when the user value is changed.
  if (query == '') return;
  const fetchData = new Promise((resolve)=> {
    resolve(octokit.request(url, requestHeader(signal)))
    }
  );

  return fetchData.then((response)=> response.data);
}

export const callRepository = (url, callback = ()=> {})=> {
  // Call API when the user value is changed.
  if (url == '') return;
  octokit.request(url, requestHeader()).then(response =>{
    console.log(response.data.items);
    callback(response.data);
  }).catch(error => console.log(error));
}