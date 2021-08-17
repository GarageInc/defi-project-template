import Polling from '../Polling'

const Footer = () => {
  return (
    // <footer className="absolute bottom-0 flex items-center justify-between w-screen h-20 p-4 mx-auto text-center text-low-emphesis">
    <footer className="flex-shrink-0 w-full">
      <div className="flex items-center justify-between h-20 px-4">
        <Polling />
      </div>
    </footer>
  )
}

export default Footer
