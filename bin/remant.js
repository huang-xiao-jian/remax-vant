#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const symbols = require('log-symbols');
const camelCase = require('camelcase');
const { pascalCase } = require('pascal-case');
const { program } = require('commander');

// render split
const renderIndex = (name) => `
  /**
   * @description - nothing but export component
   */
  export { default } from './${name}';
`;
const renderComponent = (name) => `
// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './${name}.css';

// 默认值填充属性
interface Neutral${name}Props {}

interface Exogenous${name}Props {
  // 容器类名，用以覆盖内部
  className?: string;
}

type ${name}Props = Neutral${name}Props & Exogenous${name}Props;

const ${name}: FunctionComponent<${name}Props> = (props) => {
  const { className, children } = props;
  const classnames = {
    container: clsx(className),
  };

  return <View className={classnames.container}>{children}</View>;
};

export default ${name};
`;

const renderPage = (name) => `
// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import ${name} from '../../../packages/${name}';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
      </View>
    </View>
  );
};
`;

program
  .version('0.1.0')
  .command('create <package>')
  .description('setup package development grass')
  .action((package) => {
    const name = pascalCase(package);
    const files = [
      {
        filename: path.resolve(__dirname, `../packages/${name}/index.ts`),
        content: renderIndex(name),
      },
      {
        filename: path.resolve(__dirname, `../packages/${name}/${name}.tsx`),
        content: renderComponent(name),
      },
      {
        filename: path.resolve(__dirname, `../packages/${name}/${name}.css`),
        content: '',
      },
      {
        filename: path.resolve(
          __dirname,
          `../public/pages/${camelCase(package)}/index.tsx`
        ),
        content: renderPage(name),
      },
    ];

    files.forEach((item) => {
      fs.ensureFile(item.filename).then(() => {
        console.log(
          ' ',
          symbols.success,
          chalk.cyan(path.relative(process.cwd(), item.filename))
        );

        fs.writeFileSync(item.filename, item.content);
      });
    });
  });

program.parse(process.argv);
