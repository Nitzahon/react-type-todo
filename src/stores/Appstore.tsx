import httpApi from "../common/http";
import { ITask } from "../interfaces";

// var for_dev_tests = require("../common/getbymobile_sample_result.json");

function App() {
  var database = false;
  var appData = {
    parent: null,

    url: {
      // url params

      strQry: "", // query string (string)
      qry: {}, // query string params as object

      strPath: "", // pathname (string)
      path: [], // pathname params as object

      strHash: "", // current route
      hash: [],
    },
  };
  function getTasks() {
    console.log(1);

    if (database) {
      httpGet("/getTasks", {}, (rslt: string) => {
        return JSON.parse(rslt).tasks;
      });
    } else {
      try {
        let res = JSON.parse(localStorage.getItem("tasks") || "[]");
        return res;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }
  function addTasks(task: ITask) {
    console.log(2);
    if (database) {
      httpPost("/addTasks", { task }, (rslt: string) => {
        return JSON.parse(rslt || "[]").tasks;
      });
    } else {
      let tasks: ITask[] = [
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        task,
      ];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    }
  }

  function setTasks(task: ITask) {
    console.log(3);
    if (database) {
      httpPost("/setTasks", { task }, (rslt: string) => {
        return JSON.parse(rslt || "[]").tasks;
      });
    } else {
      let tasks: ITask[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      let index = tasks.findIndex((objtask) => objtask.id == task.id);
      tasks[index] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    }
  }
  function deleteTasks(taskIdToDelete: number) {
    if (database) {
      httpPost("/deleteTasks", { taskIdToDelete }, (rslt: string) => {
        return JSON.parse(rslt || "[]").tasks;
      });
    } else {
      let tasks: ITask[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      let index = tasks.findIndex((objtask) => objtask.id == taskIdToDelete);
      tasks.splice(index,1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    }
  }
  function httpGet(url: string, params: any, callback: Function) {
    let query = "";
    // { a:45, b: 'asa}
    if (params && params.query && typeof params.query === "object") {
      query = Object.keys(params.query).reduce((qry, currentKey) => {
        return qry + (currentKey + "=" + params.query[currentKey]) + "&";
      }, "?");
    }
    var authUrl = "/prsnl" + url + "/" + query;
    httpApi.get(authUrl, params, (rslt: object) => {
      callback(rslt);
      //}
    });
  }
  function httpPost(url: string, params: any, callback: Function) {
    var authUrl = "/prsnl" + url + "/";
    httpApi.post(authUrl, params, (rslt: object) => {
      callback(rslt);
      //}
    });
  }

  return {
    httpGet: httpGet,
    httpPost: httpPost,
    getTasks: getTasks,
    addTasks: addTasks,
    setTasks: setTasks,
    deleteTasks: deleteTasks,
  };
}

export default App();
