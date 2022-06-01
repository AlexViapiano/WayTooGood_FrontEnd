import Version from 'views/Version'
import Minimal from 'layouts/Minimal'

const the404page = () => {
  return (
    <div className="container">
      <Minimal>
        <Version />
      </Minimal>
    </div>
  )
}

export default the404page
