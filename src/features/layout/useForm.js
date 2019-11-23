import { useState } from 'react';

const explodeReduxModel = (obj) => {
  let ret = {...obj};
  return ret;
}

const useForm = (initialState, onSubmit, onCancel) => {
  const [values, setValues] = useState(initialState);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    onSubmit(values);
  };

  const handleChange = event => {
    event.persist();
    const tName = event.target.name;
    const elems = tName.split('.');
    const first = elems.shift();
    let datas = null;
    if (elems.length <= 0) {
      datas = event.target.value;
    } else {
      datas = values[first];
      const second = elems.shift();
      datas[second] = event.target.value;
    }
    values[first] = datas;
    setValues(explodeReduxModel(values));
  };

  const handleCancel = event => {
    if (event) event.preventDefault();
    onCancel();
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useForm;
