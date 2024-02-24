export function parseNestedObjects(obj) {
    let newObj = JSON.parse(JSON.stringify(obj));
  
    while (true) {
      let oldObjStr = JSON.stringify(newObj); 
      newObj = parseObj(newObj);

      if (oldObjStr === JSON.stringify(newObj)) {
        break;
      }
    }
  
    return newObj;
  }
  
  function parseObj(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        try {
          obj[key] = JSON.parse(obj[key]);
        } catch (error) {
        }
      } else if (typeof obj[key] === 'object') {
        obj[key] = parseObj(obj[key]);
      }
    }
    return obj;
  }