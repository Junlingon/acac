interface IDataSources {
  [key: string]: (axios: any, ...args: any[]) => Promise<any>
}

const dataSources: IDataSources = {
  foo(axios, ...args)  {
    return axios.apply(this, [...args]);
  }
}

export default dataSources;