import { Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Cards from './Card/index';
import SelectHead from './SelectHead/index';
import ContentTabale from './Tables/index';
import { Context } from './type';
type Props = {};


const CardList = [
  '温馨提示',
  '请您仔细检查数据是否，存在问题',
  '是否存在合同问题或者未转正人员问题',
]

let list = [
  {
    name: 'chenyanan',
    age: 20,
    address: '河北省',
    section:"测试部门1",
    post:"测试"
  },
  {
    name: 'chenyanan123',
    age: 10,
    address: '北京',
    section:"测试部门2",
    post:"研发"
  },
];

const index = (props: Props) => {

  const [SelectData,setSelectData] = useState<any>({})
  const [SelectList,setSelectList]=useState(list)
  const [Loding,setLoding]=useState(false)

  const onSelect = (val:any)=>{
    setSelectData(val)
  } 

  useEffect(()=>{
    setLoding(true)
    if(SelectData.name){
      let data = list.filter((item:any)=>item.name === SelectData.name)
      setSelectList(data)
      setLoding(false)
    }else{
      setSelectList(list)
      setLoding(false)
    }
  },[SelectData])

  const context = {
    CardList,
    SelectList
  }

  return (
    <Context.Provider value={context}>
      <Card>
        <Cards />
        <SelectHead onSelect={onSelect}/>
        <ContentTabale />
      </Card>
    </Context.Provider>
  );
};

export default index;
