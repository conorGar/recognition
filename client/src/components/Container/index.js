import React from 'react'

export default function Container({ classname, children }) {
  return <div className={classname}>{children}</div>
}
