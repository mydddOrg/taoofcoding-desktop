import { InstanceFactory } from "components/ioc/InstanceFactory";
import { ILogger } from "components/logger/ILogger";
import { ConsoleLogger } from "components/logger/impl/ConsoleLogger";
import React, { useEffect } from "react";
import BlogIndex from "./blog/BlogIndex";
import Layout from "./commons/Layout";

const Main = () => {

  useEffect(()=>{
    const logger = InstanceFactory.getInstance(ConsoleLogger)

    console.error(logger)
  },[])
  return (
    <Layout index={true}>
      <BlogIndex />
    </Layout>
  );
};

export default Main;
