import RcGantt from '@hxzn/rc-gantt'
import dayjs from 'dayjs'
import React, { useState } from 'react'

interface Data {
  id: number
  name: string
  startDate: string
  endDate: string
}

function createData(len: number) {
  const result: Data[] = []
  for (let i = 0; i < len; i++) {
    result.push({
      id: i,
      name: '一个名称一个名称一个名称一个名称',
      startDate: dayjs('2023-7-21 11:12:43').subtract(-i, 'day').format('YYYY-MM-DD'),
      endDate: dayjs('2023-10-21 11:13:04').add(i, 'day').format('YYYY-MM-DD'),
    })
  }
  return result
}

const App = () => {
  const [data, setData] = useState(createData(20))
  console.log('data', data)
  return (
    <div style={{ width: '100%', height: 500 }}>
      <RcGantt<Data>
        data={data}
        columns={[
          {
            name: 'name',
            label: '名称',
            width: 100,
          },
        ]}
        onUpdate={async (row, startDate, endDate) => {
          console.log('update', row, startDate, endDate)
          setData(prev => {
            const newList = [...prev]
            const index = newList.findIndex(val => val.id === row.id)
            newList[index] = {
              ...row,
              startDate: dayjs(startDate).format('YYYY-MM-DD'),
              endDate: dayjs(endDate).format('YYYY-MM-DD'),
            }
            return newList
          })
          return true
        }}
      />
    </div>
  )
}

export default App
