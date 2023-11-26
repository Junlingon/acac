import React from 'react';
import { Avatar, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './style/jl.css';

const Jl: React.FC = () => (
    <>
        <div className='warp'>
            <div className='tittle'>最受欢迎单人冠军奖励</div>
            <div className="content">
                <Flex justify='space-between'>
                    <div className="jl">
                        <div className="order">专属奖励x</div>
                        <div className="tx">
                            <Avatar shape="square" size={64} icon={<UserOutlined />} />
                        </div>
                        <div className="name">奖励名称七个字</div>
                    </div>
                    <div className="jl">
                        <div className="order">专属奖励x</div>
                        <div className="tx">
                            <Avatar shape="square" size={64} icon={<UserOutlined />} />
                        </div>
                        <div className="name">奖励名称七个字</div>
                    </div>
                    <div className="jl">
                        <div className="order">专属奖励x</div>
                        <div className="tx">
                            <Avatar shape="square" size={64} icon={<UserOutlined />} />
                        </div>
                        <div className="name">奖励名称七个字</div>
                    </div>
                </Flex>
            </div>
        </div>
    </>
);

export default Jl;