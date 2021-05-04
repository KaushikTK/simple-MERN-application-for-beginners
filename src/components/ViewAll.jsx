import { useEffect, useState } from 'react'
import $ from 'jquery'

const ViewAll = props =>{
    let [setViewAll,setView,setAdd] = props.active;
    setView('');
    setAdd('');
    setViewAll('active');

    let [data,setData] = useState([]);

    useEffect(()=>{
        $.ajax({
            type:'get',
            url:'http://localhost:4444/view_all',
            success: res=>{
                res = JSON.parse(res);
                let arr = []
                for(let i=0;i<res.length;i++) arr.push([res[i].name, res[i].age])
                setData(arr)
            }
        })
    },[])

    return(<>
        <div className='container'>
            <div className='row' style={{height:'80vh'}}>
                <div className='col-md-6 mx-auto my-auto'>
                    <div className='card-body shadow'>
                    <div id='retireved'>
                    <center>
                    <p className='display-4'>Data Retrieved</p>
                    <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(function(val){
                        return(
                            <tr>
                            <td>{val[0]}</td>
                            <td>{val[1]}</td>
                            </tr>
                            );
                    })}
                    </tbody>
                </table>

                    </center>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default ViewAll;