import React, { memo } from 'react'
import { Spin } from 'antd'

const Loader = () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Spin size='large' />
        </div>
    )
}

export default memo(Loader)