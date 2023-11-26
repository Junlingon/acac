import React from 'react';
import { Button, Flex } from 'antd';

import './button.css';

const TabButton: React.FC = () => (
    <>
        <Flex gap="small" wrap="nowrap" justify='center'>
            <Button type="primary">最受欢迎</Button>
            <Button type="primary">粉丝呼声最高</Button>
            <Button type="primary">最具潜力</Button>
        </Flex>
        <Flex gap="small" wrap="nowrap" justify='center'>
            <Button type="primary">单人</Button>
            <Button type="primary">团体</Button>
        </Flex>
    </>
);

export default TabButton;