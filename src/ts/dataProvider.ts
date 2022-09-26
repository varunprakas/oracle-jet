
/**
 * Returns modifiedObj to build the table data.
 *
 * @param {Array} data from service or other resources .
 */
export function tableObject(data: any = []) {

  let modifiedObj: any = [];
  const sum = function (data: any[]) {
    return data.reduce(function (a, b) {
      return a + b['time'];
    }, 0);
  };
  const totalTime = sum(data);
  for (let i = 0; i < data.length; i++) {
    let parentArr = {
      id: `t${i}`,
      time: data[i].time,
      name: data[i].name,
      status: data[i].status ? data[i].status : 'In progress',
      percentage: ((100 * data[i].time) / totalTime).toFixed(1) + '%',
      children: []
    };
    let j = 0;
    if (data[i].notes && data[i].notes.length > 0) {
      data[i].notes.forEach((child, index) => {
        let obj = {
          author: child.author,
          note: child.note,
          date: child.date,
          id: `t${i}:${j++}`
        };
        parentArr.children.push(obj);
      });
    }
    modifiedObj.push(parentArr);
  }
  return modifiedObj;
}

/**
 * Returns modifiedObj to build the pie chart.
 *
 * @param {Array} data from service or other resources .
 */
export function pieChartObject(data: any = []) {
  let modifiedObj = [];
  const groups = (time) => {
    let groupName: string[] = [];
    if (time <= 2000) {
      groupName = ["Group A"];
    } else if (time > 2000 && time <= 3000) {
      groupName = ["Group B"];
    } else if (time > 3000 && time <= 5000) {
      groupName = ["Group C"];
    } else {
      groupName = ["Group D"];
    }
    return groupName
  }
  data.forEach(function (element, index) {
    let obj = {
      id: +index + 1,
      seriesId: 'Series ' + (+index + 1),
      groupId: groups(element.time),
      value: element.time
    }
    modifiedObj.push(obj);
  });
  return modifiedObj;
}

/**
 * Returns modifiedObj to build the line chart.
 *
 * @param {Array} data from service or other resources .
 */
export function lineChartObject(data: any = []) {
  let modifiedObj: any = [];
  let i = 1, j = 1, k = 1, l = 1;
  const assignGroupId = (time: any) => {
    let grName = groups(time).groupName;
    let groupId: any = '';

    if (grName === 'Q1') {
      groupId = ['Q' + i++];
    } else if (grName === 'Q2') {
      groupId = ['Q' + j++];
    } else if (grName === 'Q3') {
      groupId = ['Q' + k++];
    } else {
      groupId = ['Q' + l++];
    }

    return groupId;
  }
  const groups = (time: any) => {
    let groupName: string = '';
    let seriesName: string = '';
    if (time <= 1000) {
      groupName = "Q1";
      seriesName = 'Series 1';
    } else if (time > 1000 && time <= 2000) {
      groupName = "Q2";
      seriesName = 'Series 2';
    } else if (time > 2000 && time <= 4000) {
      groupName = "Q3";
      seriesName = 'Series 3';
    } else {
      groupName = "Q4";
      seriesName = 'Series 4';
    }
    return {
      groupName,
      seriesName
    }
  }

  data.forEach(function (element: any, index: any) {
    let obj = {
      id: +index + 1,
      seriesId: groups(element.time).seriesName,
      groupId: assignGroupId(element.time),
      value: element.time
    }
    modifiedObj.push(obj);
  });

  return modifiedObj;
}