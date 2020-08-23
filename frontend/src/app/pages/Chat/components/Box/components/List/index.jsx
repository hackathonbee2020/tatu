import React from 'react'

import Filter from '@components/Filter'
import Header from './components/Header'
import CardUser from './components/CardUser'

import './styles.scss'

const List = ({ data = [], setItem, object }) => {
  return (
    <div className="List">
      <Header />
      <Filter />
      <div className="list-content">
        {data.map((item, index) => (
          <CardUser
            key={index}
            item={item}
            setItem={setItem}
            active={object?.id === item?.id}
          />
        ))}
      </div>
    </div>
  )
}

export default List
