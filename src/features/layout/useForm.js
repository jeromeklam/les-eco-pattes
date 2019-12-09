import { useState } from 'react';

const explodeReduxModel = (obj) => {
  let ret = {...obj};
  return ret;
}

const useForm = (initialState, initialTab, onSubmit, onCancel, onNavTab) => {
  const [values, setValues] = useState({...initialState, currentTab: initialTab});  

  const handleSubmit = event => {
    if (event) event.preventDefault();
    onSubmit(values);
  };

  const handleChange = event => {
    if (event && event.persist) {
      event.persist();
    }
    const tType = event.target.type || "text";    
    const tName = event.target.name;    
    const elems = tName.split('.');
    const first = elems.shift();
    let datas = null;
    if (tType === "checkbox") {
      datas = event.target.checked;
    } else {
      if (elems.length <= 0) {
        datas = event.target.value;
      } else {
        datas = values[first];
        const second = elems.shift();
        datas[second] = event.target.value;
      }
    }
    values[first] = datas;
    setValues(explodeReduxModel(values));
  };

  const handleCancel = event => {
    if (event) event.preventDefault();
    onCancel();
  };

  const handleNavTab = keyTab => {   
     setValues({...values, currentTab: keyTab});
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
  };
};

export default useForm;
