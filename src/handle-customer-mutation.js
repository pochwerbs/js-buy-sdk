export default function handleCustomerMutation(mutationRootKey) {
  return function({data = {}, errors, model = {}}) {
    const rootData = data[mutationRootKey];
    const rootModel = model[mutationRootKey];

    if (rootData && rootData.userErrors && !rootData.userErrors.length) {
      rootModel.customer = {...rootData};

      return rootModel.customer;
    }

    if (rootData && rootData.customerUserErrors && !rootData.customerUserErrors.length) {
      rootModel.customer = {...rootData};

      return rootModel.customer;
    }

    if (errors && errors.length) {
      return Promise.reject(new Error(JSON.stringify(errors)));
    }

    if (rootData && rootData.userErrors && rootData.userErrors.length) {
      return Promise.reject(new Error(JSON.stringify(rootData.userErrors)));
    }

    if (rootData && rootData.customerUserErrors && rootData.customerUserErrors.length) {
      return Promise.reject(new Error(JSON.stringify(rootData.customerUserErrors)));
    }

    return Promise.reject(new Error(`The ${mutationRootKey} mutation failed due to an unknown error.`));
  };
}
