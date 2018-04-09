import React from 'react';

class Index extends React.Component{
    render(){
        console.log(window.location.pathname)
        return(
            <div>首页</div>
        )
    }
}
export default Index;