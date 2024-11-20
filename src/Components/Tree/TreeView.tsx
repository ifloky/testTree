export const TreeView = (childNode: string[]) => {
  return (
    <>
      <div className='parent-node'></div>
      <div className='child-node-wrapper'>
        {
          childNode.map((el: string) => {
            return `<div>${el}</div>`
          })
        }
      </div>
    </>
  )
}
