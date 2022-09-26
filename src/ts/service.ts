import * as jsonDataStr from "text!../../js/projectData.json";
export function serviceApi() {
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.parse(jsonDataStr));
    }, 2000);
  });
  return myPromise;
} 
