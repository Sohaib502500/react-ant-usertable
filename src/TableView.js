import {Table} from 'antd';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


export default class TableView extends React.Component{

  constructor(){
    super();
    this.state ={
      isLoading:true,
      data:[],
    };
  }


  

  

  render(){
    
    if(this.state.isLoading==true){
      this.fetchData();
      return(<div>Loading Data</div>);
    }
    return(
      <Table dataSource={this.getDataSource()} columns={this.getColumns()}/>
    );
  }

  async fetchData(){
      const response = await fetch('https://randomuser.me/api/?results=5');
      const result =await response.json();
      console.log('fetchData='+JSON.stringify(result));
      this.setState({isLoading:false,data:result.results});
      
  }

  getDataSource(){
    
    console.log('ds='+this.state.data.length);
    let dataSource=[];
    for(var i=0;i<this.state.data.length;i++){
      console.log("i="+i);
      let tempData=this.state.data[i];
      let user =  {
        key: tempData.login.uuid,
        name: tempData.name.title+tempData.name.first+tempData.name.last,
        imageUrl: tempData.picture.medium,
        gender: tempData.gender,
        address: tempData.address,
        email: tempData.email,
        isChecked:"",
        divider: tempData.gender==='female' ? '#93E088':'#77D1F3',
        phone: tempData.phone,
        user: tempData, 
      };
      dataSource.push(user);
    }
   
    console.log("dataSource="+JSON.stringify(dataSource));
    return dataSource;
  }

  

  getColumns(){
    const badgeClass = 'badge m-2 badge-primary';
    const columns = [
      {
        title: '',
        dataIndex: 'isChecked',
        render: checked => <div style={{display:'flex',width:'20px'}}><input type='checkbox' style={{width:'10px',height:'10px',display:'flex'}}/></div>
      
      },
      {
        title: '',
        dataIndex: 'divider',
        render: divColor => <img src='' alt='' style={{height:'68px',width:'7px',borderRadius:'25px',backgroundColor:divColor}}/>
       
      },
      {
        dataIndex: 'imageUrl',
        render:  theImageURL => <img alt='' src={theImageURL} style={{height:'65px', width:'65px',marginLeft:'3px'}} />
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: name =><span style={{fontSize:'16px',marginLeft:'10px',width:'500px'}}>{name}</span>,
        key: 'name',
      },
      {
        render: x=> <img src='' alt='' style={{height:'70px',width:'1px',backgroundColor:'#CCCCCC'}}/>,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        render: gender => <span className={gender==='female' ?'badge m-2 badge-primary':'badge m-2 badge-warning'} style={{ fontSize: '15px', fontWeight: 'bold',borderRadius:'25px' }}>{gender}</span>,
        key: 'gender',
      },
      {
        render: x=> <img src='' alt='' style={{height:'70px',width:'1px',backgroundColor:'#CCCCCC'}}/>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        render: email => <span style={{fontSize:'16px',marginLeft:'10px',width:'200px'}} >{email}</span>,
        key: 'email',
      },
      {
        render: x=> <img src='' alt='' style={{height:'70px',width:'1px',backgroundColor:'#CCCCCC'}}/>,
      },
      {
        title: 'Phone',
        dataIndex: 'user',
        render: tempData => <span className={tempData.gender==='male' ?'badge m-2 badge-primary':'badge m-2 badge-warning'} style={{ fontSize: '15px', fontWeight: 'bold',borderRadius:'25px' }}>{tempData.phone}</span>,
        key: 'address',
      },
      {
        render: x=> <img src='' alt='' style={{height:'70px',width:'1px',backgroundColor:'#CCCCCC'}}/>,
      },
      {
        render: x=> <img src='' alt='' style={{height:'1px',width:'100%',backgroundColor:'#CCCCCC'}}/>,
      },
    ];
    return columns;
  }
} 