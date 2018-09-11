const headers = {
  "content-type": "application/x-www-form-urlencoded: charset=UTF-8",
  accept: "application/json"
};

const apiUrl = "https://repetitora.net/api/JS/Tasks";
const corsMode = "cors";

function requestData(url, type, body) {
  return fetch(url, {
    method: type,
    body: body,
    headers: headers,
    mode: corsMode
  })
    .then(result => result.json())
    .catch(error => console.log("error", error));
}

export function createTask(title, widgetId) {
  const data = new URLSearchParams();
  data.append("widgetId", widgetId);
  data.append("title", title);
  return requestData(apiUrl, "POST", data);
}

export function updateTask(widgetId, taskId, title = null, isDone = null) {
  const data = new URLSearchParams();
  data.append("taskId", taskId);
  data.append("widgetId", widgetId);
  if (isDone !== null) {
    data.append("done", isDone);
  } else if (title !== null) {
    data.append("title", title);
  }

  return requestData(apiUrl, "PUT", data);
}

export function deleteTask(widgetId, taskId) {
  const data = new URLSearchParams();
  data.append("taskId", taskId);
  data.append("widgetId", widgetId);

  return requestData(apiUrl, "DELETE", data);
}

export function getTasks(widgetId) {
  return requestData(`${apiUrl}?widgetId=${789789}&count=30`, "GET", null);
}
