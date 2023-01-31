function GetUserInput() {
  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
        <div className='flex items-end space-x-7  h-80 text-white p-8'>
        <h1>What Are You Feeling? WHY IS THERE NO TEXT</h1>
        </div>
        <form className='h-20'>
            <input type='text' name='songValues' />
            <input type='submit' value='submit' />
        </form>
        </div>
  )
}

export default GetUserInput